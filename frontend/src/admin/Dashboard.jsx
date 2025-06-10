import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { adminApi } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, salesResponse] = await Promise.all([
          adminApi.getDashboardStats(),
          adminApi.getSalesData()
        ]);
        
        setStats(statsResponse.data);
        setSalesData(salesResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: stats.totalUsers },
          { title: "Total Products", value: stats.totalProducts },
          { title: "Total Sales", value: stats.totalSales },
          { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}` },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-violet-100 border border-violet-400 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow border border-gray-300 w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h2>
        
        {/* Horizontal scroll container for small screens */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] md:min-w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={{ fill: '#7c3aed', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
