import { CHOCOLATE_LIST } from '@/constants/HeroCard';
import React from 'react';

const Overview = () => {
  const products = CHOCOLATE_LIST;

  return (
    <div className="flex flex-col w-full py-6 px-4 md:px-6 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900 text-left">
            <tr>
              <th className="px-5 py-4 font-semibold">Product</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold hidden md:table-cell">Selling Price</th>
              <th className="px-5 py-4 font-semibold">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="px-5 py-4 flex items-center gap-4">
                  <div className="border border-gray-300 rounded-md p-1.5 w-16 h-16 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <span className="truncate max-w-[200px] font-medium text-gray-800">{product.name}</span>
                </td>
                <td className="px-5 py-4">{product.category || 'N/A'}</td>
                <td className="px-5 py-4 hidden md:table-cell">₹ {product.price}</td>
                <td className="px-5 py-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={product.inStock ?? true}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-500 transition-all duration-300"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
