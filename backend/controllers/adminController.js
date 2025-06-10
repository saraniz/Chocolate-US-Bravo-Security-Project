import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments({ isAdmin: false });
  
  // Get total revenue
  const orders = await Order.find({ isPaid: true });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Get recent orders
  const recentOrders = await Order.find()
    .populate('user', 'name email')
    .sort('-createdAt')
    .limit(5);

  // Get low stock products
  const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
    .select('name stock category')
    .limit(5);

  // Get sales by category
  const products = await Product.find();
  const salesByCategory = {};
  products.forEach(product => {
    if (salesByCategory[product.category]) {
      salesByCategory[product.category]++;
    } else {
      salesByCategory[product.category] = 1;
    }
  });

  res.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    recentOrders,
    lowStockProducts,
    salesByCategory
  });
});

// @desc    Get all orders with pagination
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const count = await Order.countDocuments();
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort('-createdAt')
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    orders,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get order details
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
const getOrderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name images');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = req.body.isDelivered || order.isDelivered;
    order.deliveredAt = req.body.isDelivered ? Date.now() : order.deliveredAt;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all products with pagination
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .sort('-createdAt')
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
    images: req.body.images
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    stock,
    images
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.images = images || product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get all users with pagination
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const count = await User.countDocuments();
  const users = await User.find()
    .select('-password')
    .sort('-createdAt')
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Register a new user
// @route   POST /api/admin/users
// @access  Private/Admin
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: isAdmin || false
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.equals(req.user._id)) {
      res.status(400);
      throw new Error('Cannot delete your own account');
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
  // Get revenue data for the last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const revenueData = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        isPaid: true
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Get top selling products
  const topProducts = await Order.aggregate([
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: { $sum: '$orderItems.qty' },
        revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $project: {
        name: '$product.name',
        totalSold: 1,
        revenue: 1
      }
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 }
  ]);

  res.json({
    revenueData,
    topProducts
  });
});

export {
  getDashboardStats,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getAnalytics
}; 