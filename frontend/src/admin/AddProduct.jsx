import React, { useState } from 'react';
import { adminApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('product-', '')]: value
    }));
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset error state
    setUploadError(null);

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImages(prev => {
        const newPreviews = [...prev];
        newPreviews[index] = e.target.result;
        return newPreviews;
      });
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      console.log('Uploading image:', file.name);
      const response = await adminApi.uploadImage(formData);
      console.log('Upload response:', response.data);

      if (response.data.imageUrl) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, response.data.imageUrl]
        }));
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(`Failed to upload image: ${error.message}`);
      // Remove the preview if upload failed
      setPreviewImages(prev => {
        const newPreviews = [...prev];
        newPreviews[index] = null;
        return newPreviews;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }

    try {
      setLoading(true);
      await adminApi.addProduct(formData);
      alert('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 md:px-10 bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl p-6 md:p-10 shadow space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

        {/* Image Upload */}
        <div>
          <p className="text-base font-semibold text-gray-700">Product Images</p>
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="relative">
                <input
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <div className="border-2 border-dashed border-gray-300 rounded-md p-2 w-34 h-34 flex items-center justify-center bg-gray-50 hover:shadow cursor-pointer">
                  {previewImages[index] ? (
                    <img
                      src={previewImages[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-32 h-32 object-cover"
                    />
                  ) : (
                    <img
                      src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                      alt="uploadArea"
                      className="w-15 h-15 object-contain"
                    />
                  )}
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
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-base font-medium">
              Category
            </label>
            <select
              id="category"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {[
                { name: 'Dark Chocolate' },
                { name: 'Milk Chocolate' },
                { name: 'White Chocolate' },
                { name: 'Assorted' },
              ].map((item) => (
                <option key={item.name} value={item.name}>
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
              value={formData.description}
              onChange={handleInputChange}
              required
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
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="product-offerPrice" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="product-offerPrice"
              type="number"
              placeholder="0"
              className="border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.offerPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 bg-indigo-600 text-white font-medium rounded-md transition duration-200 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
