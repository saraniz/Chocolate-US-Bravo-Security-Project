import Product from '../models/Product.js';

const productMiddleware = {
  async checkProductOwnership(req, res, next) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product || product.owner !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update or delete this product' });
    }
    next();
  },

  async checkProductExists(req, res, next) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    next();
  },
};

export default productMiddleware;