import React from "react";
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

const Dashboard = () => {
  const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 800 },
    { name: "Mar", sales: 600 },
    { name: "Apr", sales: 700 },
    { name: "May", sales: 500 },
    { name: "Jun", sales: 900 },
    { name: "Jul", sales: 750 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: 0 },
          { title: "Total Products", value: 0 },
          { title: "Total Sales", value: 0 },
          { title: "Total Revenue", value: 0 },
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
              <LineChart data={data}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
