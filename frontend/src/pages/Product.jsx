import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const CHOCOLATE_LIST = {
    id: 1,
    name: "Dark Chocolate Delight",
    price: "LKR 1,800",
    offerPrice: "LKR 1,500",
    rating: 4.8,
    image: [
      "/src/img/Pack1.png",
      "/src/img/Pack2.png",
      "/src/img/Pack3.png",
      "/src/img/Pack4.png",
    ],
    description: [
      "High-quality material",
      "Comfortable for everyday use",
      "Available in different sizes",
    ],
  };

  const [thumbnail, setThumbnail] = useState(CHOCOLATE_LIST.image[0]);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    setQuantity(1);
    setInCart(true);
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(0);
      setInCart(false);
    }
  };

  return (
    <div className="pt-3 px-4 md:px-20">
      <p className="text-sm mb-4">
        <Link to="/" className="text-indigo-600">Home</Link> / <span>Products</span> /{" "}
        <span className="text-indigo-500">{CHOCOLATE_LIST.name}</span>
      </p>

      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        {/* Left and Center Section */}
        <div className="flex flex-col md:flex-row w-full lg:w-4/5 border-b lg:border-b-0 lg:border-r border-gray-300">
          {/* Left Thumbnails */}
          <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="border border-gray-300 rounded overflow-hidden">
                <img
                  src={thumbnail}
                  alt="Selected product"
                  className="w-96 h-96 md:h-auto object-contain"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto md:flex-wrap">
                {CHOCOLATE_LIST.image.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className="border border-gray-300 rounded cursor-pointer w-21 h-21 flex-shrink-0"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Product Details */}
          <div className="w-full md:w-2/3 p-4 overflow-y-scroll">
            <h1 className="text-3xl font-medium text-amber-900 mb-2">
              {CHOCOLATE_LIST.name}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) =>
                CHOCOLATE_LIST.rating > i ? (
                  <span key={i}>⭐</span>
                ) : (
                  <span key={i} className="text-gray-300">⭐</span>
                )
              )}
              <span className="ml-2">({CHOCOLATE_LIST.rating})</span>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 line-through">MRP: {CHOCOLATE_LIST.price}</p>
              <p className="text-2xl font-semibold">Offer: {CHOCOLATE_LIST.offerPrice}</p>
              <span className="text-sm text-gray-400">(inclusive of all taxes)</span>
            </div>

            <p className="font-medium mt-6 mb-2">About Product</p>
            <ul className="list-disc ml-5 text-gray-600">
              {CHOCOLATE_LIST.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex gap-4 mt-8 flex-wrap">
              {!inCart ? (
                <button
                  className="w-40 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex gap-3 items-center">
                  <button
                    className="w-8 h-8 border border-gray-500 bg-gray-50 hover:bg-gray-200 cursor-pointer rounded-full"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className="w-8 h-8 border border-gray-500 bg-gray-50 hover:bg-gray-200 cursor-pointer rounded-full"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Reviews</h2>
              <p className="text-gray-600">⭐️⭐️⭐️⭐️⭐️ Very delicious chocolate. Will buy again!</p>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              <div className="bg-gray-100 p-4 rounded h-40 overflow-y-auto">
                <p className="text-sm text-gray-700 mb-2">User1: Tastes great!</p>
                <p className="text-sm text-gray-700">User2: Loved the packaging.</p>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CHOCOLATE_LIST.image.slice(1).map((img, i) => (
                  <div key={i} className="border p-2 rounded">
                    <img src={img} alt="related" className="rounded w-full h-auto" />
                    <p className="text-sm mt-1">Chocolate {i + 2}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/5 p-4 border-t lg:border-t-0 lg:border-l border-gray-300 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Shipping & Payment</h2>
          <div className="mb-4 flex justify-between">
            <p className="font-medium">Ship To:</p>
            <p className="text-gray-600">Colombo, Sri Lanka</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Delivery:</p>
            <p className="text-green-600">Free shipping</p>
            <div className="flex justify-between text-sm text-gray-700 pt-1">
              <p>Days:</p>
              <div className="flex gap-3">
                <p>May-1</p>
                <p>To</p>
                <p>May-10</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">Payment Methods:</p>
            <ul className="text-gray-600 list-disc ml-5">
              <li>Credit/Debit Card</li>
              <li>Cash on Delivery</li>
              <li>Online Banking</li>
            </ul>
            <div className="mt-10 space-y-5">
              <div className="flex gap-3">Quantity: <p>{quantity}</p></div>
              <div className="flex justify-start">
                <button className="w-30 py-2 rounded bg-amber-900 text-white hover:bg-amber-800">
                  Buy Now
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
