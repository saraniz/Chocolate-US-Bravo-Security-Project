import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import asyncHandlerMiddleware from '../middleware/asyncHandler.js';

export default function adminController({ redisClient, sessionStore, invalidateCache }) {
// @desc    Get dashboard statistics
  // @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
  const getDashboardStats = asyncHandlerMiddleware(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

  res.json({
    totalOrders,
    totalProducts,
    totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0
  });
});

  // @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
  const getOrders = asyncHandlerMiddleware(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

  // @desc    Get order by ID
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
  const getOrderDetails = asyncHandlerMiddleware(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
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
  const updateOrderStatus = asyncHandlerMiddleware(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
      order.isDelivered = req.body.isDelivered;
      order.deliveredAt = req.body.isDelivered ? Date.now() : null;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

  // @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
  const getProducts = asyncHandlerMiddleware(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
  const createProduct = asyncHandlerMiddleware(async (req, res) => {
  const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
  });

  const createdProduct = await product.save();
    await invalidateCache('products*');
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
  const updateProduct = asyncHandlerMiddleware(async (req, res) => {
  const {
    name,
    price,
    description,
      image,
      brand,
    category,
      countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

    const updatedProduct = await product.save();
      await invalidateCache('products*');
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
  const deleteProduct = asyncHandlerMiddleware(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
      await invalidateCache('products*');
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

  // @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
  const getUsers = asyncHandlerMiddleware(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Register a new user
// @route   POST /api/admin/users
// @access  Private/Admin
  const registerUser = asyncHandlerMiddleware(async (req, res) => {
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

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
  const updateUser = asyncHandlerMiddleware(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
  const deleteUser = asyncHandlerMiddleware(async (req, res) => {
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

  // @desc    Get sales analytics
  // @route   GET /api/admin/dashboard/sales
// @access  Private/Admin
  const getAnalytics = asyncHandlerMiddleware(async (req, res) => {
    const sales = await Order.aggregate([
    {
      $match: {
          isPaid: true,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
      }
    },
    {
      $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$totalPrice" },
          count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

    res.json(sales);
  });

  return {
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
} 