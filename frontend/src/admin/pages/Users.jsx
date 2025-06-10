import { useState, useEffect } from 'react';
import { getUsers } from '../../services/adminService';
import { UserPlus, Mail, Phone, Edit2, Trash2, Search } from 'lucide-react';
import AddUserForm from '../components/AddUserForm';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getUsers(page);
      setUsers(data.users);
      setTotalPages(data.pages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchUsers(1);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500 mt-1">Manage your users and their roles</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : (
            <>
              <UserPlus className="w-5 h-5" />
              Add User
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-6">
          <AddUserForm onSuccess={handleAddSuccess} />
        </div>
      )}

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
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
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xl font-medium text-gray-600">
                                {user.name[0].toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.isAdmin
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(user._id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDelete(user._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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

export default Users; 