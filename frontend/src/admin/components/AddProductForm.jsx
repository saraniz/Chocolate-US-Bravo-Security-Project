import { useState } from 'react';
import { createProduct } from '../../services/adminService';
import { toast } from 'react-hot-toast';

const AddProductForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Dark Chocolate',
    stock: '',
    images: []
  });

  const categories = [
    'Dark Chocolate',
    'Milk Chocolate',
    'White Chocolate',
    'Nut Chocolate',
    'Gift Box'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      toast.success('Product added successfully');
      onSuccess?.();
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'Dark Chocolate',
        stock: '',
        images: []
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter stock quantity"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {formData.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm; 