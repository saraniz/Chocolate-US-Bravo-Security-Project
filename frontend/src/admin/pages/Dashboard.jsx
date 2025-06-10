import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/adminService';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Package,
  Clock
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <p className="text-green-500 text-sm mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="font-medium">Order #{activity._id}</p>
            <p className="text-sm text-gray-500">
              by {activity.user.name} - ${activity.totalPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LowStockProducts = ({ products }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Low Stock Products</h3>
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <span className="text-red-500 font-medium">{product.stock} left</span>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
    salesByCategory: {}
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching dashboard data...');
        const data = await getDashboardStats();
        console.log('Dashboard data received:', data);
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={dashboardData.totalOrders.toLocaleString()}
          trend="+12.5% this month"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatCurrency(dashboardData.totalRevenue)}
          trend="+23.2% this month"
        />
        <StatCard
          icon={Package}
          label="Total Products"
          value={dashboardData.totalProducts.toLocaleString()}
          trend="+5.3% this month"
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value={dashboardData.totalUsers.toLocaleString()}
          trend="+18.7% this month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={dashboardData.recentOrders} />
        <LowStockProducts products={dashboardData.lowStockProducts} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(dashboardData.salesByCategory).map(([category, count]) => (
            <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{category}</p>
              <p className="text-2xl font-bold mt-2">{count}</p>
              <p className="text-sm text-gray-500 mt-1">products</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 