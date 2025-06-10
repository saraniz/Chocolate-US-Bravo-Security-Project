import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/adminService';
import AddProductForm from '../components/AddProductForm';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchProducts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const data = await getProducts(page, search);
      setProducts(data.products);
      setTotalPages(data.pages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchQuery);
  }, [currentPage]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounce search
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1, query);
    }, 500));
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted successfully');
        fetchProducts(currentPage, searchQuery);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchProducts(1, '');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : (
            <>
              <Plus className="w-5 h-5" />
              Add Product
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-6">
          <AddProductForm onSuccess={handleAddSuccess} />
        </div>
      )}

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products..."
          className="flex-1 border-none focus:ring-0 text-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      product.stock > 10 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock} in stock
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products; 