import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faPlus, 
  faMinus, 
  faArrowLeft,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity,
    clearCart
  } = useCart();

  const handleQuantityChange = (productId, change) => {
    const item = cart.find(item => item._id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 font-poppins">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faShoppingBag} className="text-4xl text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any chocolates to your cart yet. Browse our collection and find something sweet!
          </p>
          <Link to="/shop">
            <Button className="">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col justify-start gap-4 mb-8">
        <Link to="/shop" className="text-chocolate-500 hover:text-chocolate-600 transition duration-300">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-bold text-amber-900">Your Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {cart.map((item) => (
              <div 
                key={item._id} 
                className="flex items-center gap-4 p-4 border-b border-neutral-200 last:border-b-0"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.images[0]?.url || '/placeholder-image.jpg'}
                    alt={item.images[0]?.alt || item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-sm" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-amber-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-neutral-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-amber-800">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-chocolate-500 hover:bg-chocolate-600">
              Proceed to Checkout
            </Button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Free shipping on all orders within Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;