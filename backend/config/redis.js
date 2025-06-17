import Redis from 'ioredis';
import session from 'express-session';
import { createClient } from 'redis';
import { EventEmitter } from 'events';

// Create Redis client
const createRedisClient = () => {
  const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => Math.min(times * 50, 2000),
    // Add persistence options
    enableOfflineQueue: true,
    maxRetriesPerRequest: 3,
    // Add connection options
    connectTimeout: 10000,
    disconnectTimeout: 2000,
    // Add key prefix
    keyPrefix: 'chocolate_bravo:'
  });

  // Add event listeners for connection status
  client.on('connect', () => {
    console.log('✅ Redis client connected successfully');
    console.log(`📡 Redis connection details:
    - Host: ${process.env.REDIS_HOST || 'localhost'}
    - Port: ${process.env.REDIS_PORT || 6379}
    - Status: Connected`);
  });

  client.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
  });

  client.on('ready', () => {
    console.log('🚀 Redis client ready to accept commands');
  });

  client.on('end', () => {
    console.log('🔌 Redis connection closed');
  });

  return client;
};

// Create session store
const createSessionStore = (client) => {
  class RedisStore extends EventEmitter {
    constructor() {
      super();
      this.client = client;
      console.log('📦 Redis session store initialized');
    }

    async set(sessionId, session) {
      try {
        await this.client.set(
          `sess:${sessionId}`,
          JSON.stringify(session),
          'EX',
          86400 // 24 hours
        );
        console.log(`💾 Session stored: ${sessionId}`);
      } catch (error) {
        console.error('❌ Error storing session:', error);
        throw error;
      }
    }

    async get(sessionId) {
      try {
        const session = await this.client.get(`sess:${sessionId}`);
        if (session) {
          console.log(`📖 Session retrieved: ${sessionId}`);
        }
        return session ? JSON.parse(session) : null;
      } catch (error) {
        console.error('❌ Error retrieving session:', error);
        return null;
      }
    }

    async destroy(sessionId) {
      try {
        await this.client.del(`sess:${sessionId}`);
        console.log(`🗑️ Session destroyed: ${sessionId}`);
      } catch (error) {
        console.error('❌ Error destroying session:', error);
        throw error;
      }
    }

    async all() {
      try {
        const keys = await this.client.keys('sess:*');
        if (keys.length === 0) return [];
        
        const sessions = await Promise.all(
          keys.map(async (key) => {
            const session = await this.client.get(key);
            return session ? JSON.parse(session) : null;
          })
        );
        
        console.log(`📊 Total active sessions: ${sessions.filter(Boolean).length}`);
        return sessions.filter(Boolean);
      } catch (error) {
        console.error('❌ Error getting all sessions:', error);
        return [];
      }
    }

    async clear() {
      try {
        const keys = await this.client.keys('sess:*');
        if (keys.length > 0) {
          await this.client.del(keys);
          console.log(`🧹 Cleared ${keys.length} sessions`);
        }
      } catch (error) {
        console.error('❌ Error clearing sessions:', error);
        throw error;
      }
    }

    async length() {
      try {
        const keys = await this.client.keys('sess:*');
        console.log(`📊 Current session count: ${keys.length}`);
        return keys.length;
      } catch (error) {
        console.error('❌ Error getting session count:', error);
        return 0;
      }
    }
  }

  return new RedisStore();
};

// Simple cache middleware
const createCacheMiddleware = (client) => {
  return (duration = 300) => {
    return async (req, res, next) => {
      if (req.method !== 'GET') {
        return next();
      }

      // Create a cache key that ignores query parameters for product listings
      const baseUrl = req.originalUrl.split('?')[0];
      const key = `cache:${baseUrl}`;
      
      try {
        const cachedResponse = await client.get(key);
        if (cachedResponse) {
          console.log(`📦 Cache hit: ${key}`);
          return res.json(JSON.parse(cachedResponse));
        }

        console.log(`🔄 Cache miss: ${key}`);

        // Store original res.json
        const originalJson = res.json;
        res.json = function(body) {
          // Only cache successful responses
          if (res.statusCode === 200) {
            client.setex(key, duration, JSON.stringify(body))
              .then(() => console.log(`💾 Cached response: ${key}`))
              .catch(err => console.error('❌ Cache storage error:', err));
          }
          return originalJson.call(this, body);
        };

        next();
      } catch (error) {
        console.error('❌ Cache error:', error);
        next();
      }
    };
  };
};

// Simple cache invalidation
const createCacheInvalidator = (client) => {
  return async (pattern) => {
    try {
      const keys = await client.keys(`cache:${pattern}`);
      if (keys.length > 0) {
        await client.del(keys);
        console.log(`🗑️ Invalidated ${keys.length} cache entries matching: ${pattern}`);
      }
    } catch (error) {
      console.error('❌ Cache invalidation error:', error);
    }
  };
};

// Initialize Redis
export const initRedis = async () => {
  try {
    console.log('🔄 Initializing Redis connection...');
    const client = createRedisClient();
    
    // Test connection
    await client.ping();
    console.log('✅ Redis ping successful');
    
    // Test basic operations
    await client.set('test:connection', 'ok');
    const testValue = await client.get('test:connection');
    console.log('✅ Redis basic operations test:', testValue === 'ok' ? 'passed' : 'failed');
    
    return {
      client,
      sessionStore: createSessionStore(client),
      cacheMiddleware: createCacheMiddleware(client),
      invalidateCache: createCacheInvalidator(client)
    };
  } catch (error) {
    console.error('❌ Redis initialization failed:', error);
    return {
      client: null,
      sessionStore: null,
      cacheMiddleware: () => (req, res, next) => next(),
      invalidateCache: async () => {}
    };
  }
};

// Queue system using Redis
export const queue = {
  async add(job) {
    try {
      await client.lPush('queue:jobs', JSON.stringify(job));
    } catch (error) {
      console.error('Redis Queue Add Error:', error);
    }
  },

  async process(handler) {
    try {
      while (true) {
        const job = await client.rPop('queue:jobs');
        if (job) {
          await handler(JSON.parse(job));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Redis Queue Process Error:', error);
    }
  }
};

// Pub/Sub system using Redis
export const pubsub = {
  async publish(channel, message) {
    try {
      await client.publish(channel, JSON.stringify(message));
    } catch (error) {
      console.error('Redis Publish Error:', error);
    }
  },

  async subscribe(channel, handler) {
    try {
      const subscriber = client.duplicate();
      await subscriber.subscribe(channel, (message) => {
        handler(JSON.parse(message));
      });
    } catch (error) {
      console.error('Redis Subscribe Error:', error);
    }
  }
}; 