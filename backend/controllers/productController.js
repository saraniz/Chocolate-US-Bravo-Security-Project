import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

export default function productController({ invalidateCache }) {
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
  const getProducts = asyncHandler(async (req, res) => {
    console.log('🔍 Fetching all products...');
    const pageSize = Number(req.query.pageSize) || 12; // Increased default page size
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    console.log('📝 Query parameters:', { page, pageSize, keyword });

    try {
      const count = await Product.countDocuments({ ...keyword });
      console.log('📊 Total products found:', count);

      if (count === 0) {
        console.log('⚠️ No products found in database');
        return res.json({ products: [], page, pages: 0 });
      }

      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 }) // Sort by newest first
        .lean();

      console.log('📦 Products retrieved:', products.length);

      // Transform products to match frontend expectations
      const transformedProducts = products.map(product => ({
        _id: product._id,
        name: product.name,
        image: product.images[0] || '/images/default.jpg',
        images: product.images || [],
        brand: 'Chocolate Bravo',
        category: product.category,
        description: product.description,
        price: product.price,
        countInStock: product.stock,
        rating: product.rating || 0,
        numReviews: product.numReviews || 0,
        reviews: product.reviews || []
      }));

      const response = { 
        products: transformedProducts, 
        page, 
        pages: Math.ceil(count / pageSize),
        totalProducts: count
      };
      
      console.log('📤 Sending response:', JSON.stringify(response, null, 2));
      res.json(response);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      res.status(500).json({ 
        message: 'Error fetching products',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
  const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
  const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  res.json(products);
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
  const searchProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const products = await Product.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ]
  });
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
  const createProduct = asyncHandler(async (req, res) => {
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
// @route   PUT /api/products/:id
// @access  Private/Admin
  const updateProduct = asyncHandler(async (req, res) => {
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
// @route   DELETE /api/products/:id
// @access  Private/Admin
  const deleteProduct = asyncHandler(async (req, res) => {
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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
  const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
      await invalidateCache('products*');
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
  const getTopProducts = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 6; // Increased default limit
    const products = await Product.find({})
      .sort({ rating: -1, numReviews: -1 })
      .limit(limit)
      .lean();

    const transformedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      image: product.images[0] || '/images/default.jpg',
      images: product.images || [],
      brand: 'Chocolate Bravo',
      category: product.category,
      description: product.description,
      price: product.price,
      countInStock: product.stock,
      rating: product.rating || 0,
      numReviews: product.numReviews || 0,
      reviews: product.reviews || []
    }));

    res.json(transformedProducts);
  });

  return {
    getProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
  };
}