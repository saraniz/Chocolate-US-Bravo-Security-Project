import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Settings,
  BarChart,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <button
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => {/* Add logout logic */}}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 