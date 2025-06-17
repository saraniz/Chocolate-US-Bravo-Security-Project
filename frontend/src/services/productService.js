import api from './api';

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Get all products
export const getProducts = async (params = {}) => {
  try {
    console.log('🔍 Fetching products from:', `${api.defaults.baseURL}/products`);
    const response = await api.get('/products', { params });
    console.log('📥 API Response:', response.data);
    
    // Ensure we always return a properly structured response
    return {
      products: response.data.products || [],
      totalProducts: response.data.totalProducts || 0,
      currentPage: response.data.currentPage || 1,
      totalPages: response.data.totalPages || 1
    };
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    // Return a default structure even in case of error
    return {
      products: [],
      totalProducts: 0,
      currentPage: 1,
      totalPages: 1
    };
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    if (response.data && response.data.products) {
      return response.data.products;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (keyword) => {
  try {
    const response = await api.get(`/products/search?keyword=${keyword}`);
    if (response.data && response.data.products) {
      return response.data.products;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getPopularProducts = async () => {
  try {
    const response = await api.get('/products/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
};

export const getTopProducts = async () => {
  try {
    const response = await api.get('/products/top');
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};