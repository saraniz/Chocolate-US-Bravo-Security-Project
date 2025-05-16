import React from 'react';

const AddProduct = () => {
  return (
    <div className="py-10 px-4 md:px-10 bg-white min-h-screen">
      <form className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl p-6 md:p-10 shadow space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

        {/* Image Upload */}
        <div>
          <p className="text-base font-semibold text-gray-700">Product Images</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4)
              .fill('')
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-2 w-34 h-34 flex items-center justify-center bg-gray-50 hover:shadow cursor-pointer">
                    <img
                      src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                      alt="uploadArea"
                      className="w-15 h-15 object-contain"
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="product-name" className="text-base font-medium">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Type product name"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-base font-medium">
              Category
            </label>
            <select
              id="category"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {[
                { name: 'Electronics' },
                { name: 'Clothing' },
                { name: 'Accessories' },
              ].map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            <label htmlFor="product-description" className="text-base font-medium">
              Product Description
            </label>
            <textarea
              id="product-description"
              rows={4}
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type description..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="offer-price" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
