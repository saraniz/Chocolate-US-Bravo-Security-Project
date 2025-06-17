import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export default function authController({ redisClient, sessionStore }) {
  // @desc    Auth user & get token
  // @route   POST /api/auth/login
  // @access  Public
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Apply rate limiting for login attempts
    const loginKey = `login:${req.ip}`;
    const loginAttempts = await redisClient.incr(loginKey);
    if (loginAttempts === 1) {
      await redisClient.expire(loginKey, 3600); // 1 hour
    }
    if (loginAttempts > 5) {
      res.status(429);
      throw new Error('Too many login attempts. Please try again later.');
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Reset login attempts on successful login
      await redisClient.del(loginKey);

      // Generate token
      generateToken(res, user._id);

      // Store session in Redis
      const sessionId = req.cookies.jwt;
      await sessionStore.set(sessionId, {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        lastActivity: Date.now()
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
      generateToken(res, user._id);

      // Store session in Redis
      const sessionId = req.cookies.jwt;
      await sessionStore.set(sessionId, {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        lastActivity: Date.now()
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    // Clear session from Redis
    const sessionId = req.cookies.jwt;
    if (sessionId) {
      await sessionStore.destroy(sessionId);
    }

  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

  // @desc    Get user profile
  // @route   GET /api/auth/profile
// @access  Private
  const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
      // Update last activity in session
      const sessionId = req.cookies.jwt;
      if (sessionId) {
        const session = await sessionStore.get(sessionId);
        if (session) {
          session.lastActivity = Date.now();
          await sessionStore.set(sessionId, session);
        }
      }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

  // @desc    Update user profile
  // @route   PUT /api/auth/profile
  // @access  Private
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // Update session in Redis
      const sessionId = req.cookies.jwt;
      if (sessionId) {
        const session = await sessionStore.get(sessionId);
        if (session) {
          session.email = updatedUser.email;
          session.lastActivity = Date.now();
          await sessionStore.set(sessionId, session);
        }
      }

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  // @desc    Get all users
  // @route   GET /api/auth/users
  // @access  Private/Admin
  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });

  // @desc    Delete user
  // @route   DELETE /api/auth/users/:id
  // @access  Private/Admin
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error('Can not delete admin user');
      }
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  return {
    loginUser,
  registerUser,
  logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser
};
}
