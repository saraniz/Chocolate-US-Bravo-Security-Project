import { useState } from 'react';
import {
  Line,
  Bar,
  Doughnut
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Calendar } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DateRangePicker = ({ range, onRangeChange }) => (
  <div className="flex items-center gap-2">
    <select
      value={range}
      onChange={(e) => onRangeChange(e.target.value)}
      className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="7d">Last 7 days</option>
      <option value="30d">Last 30 days</option>
      <option value="90d">Last 90 days</option>
      <option value="12m">Last 12 months</option>
    </select>
    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
      <Calendar className="w-5 h-5" />
    </button>
  </div>
);

const StatCard = ({ label, value, trend }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <p className="text-gray-500 text-sm">{label}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
    <p className={`text-sm mt-1 ${
      trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
    }`}>
      {trend} vs. last period
    </p>
  </div>
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock data - replace with actual API data
  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [2100, 1800, 2400, 2800, 3200, 3800, 4000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [45, 38, 52, 58, 65, 78, 82],
        backgroundColor: 'rgb(59, 130, 246)'
      }
    ]
  };

  const productCategoriesData = {
    labels: ['Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Truffles', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(99, 102, 241)',
          'rgb(139, 92, 246)',
          'rgb(168, 85, 247)',
          'rgb(217, 70, 239)'
        ]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your business performance</p>
        </div>
        <DateRangePicker
          range={dateRange}
          onRangeChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value="$45,678"
          trend="+23.2%"
        />
        <StatCard
          label="Total Orders"
          value="1,234"
          trend="+12.5%"
        />
        <StatCard
          label="Average Order Value"
          value="$37.50"
          trend="+8.4%"
        />
        <StatCard
          label="Conversion Rate"
          value="3.2%"
          trend="-1.5%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
          <div className="h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Orders Over Time</h3>
          <div className="h-80">
            <Bar data={ordersData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
          <div className="h-80">
            <Doughnut data={productCategoriesData} options={doughnutOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Dark Chocolate Bar', sales: 450, revenue: '$2,695.50' },
              { name: 'Milk Chocolate Truffles', sales: 380, revenue: '$4,935.20' },
              { name: 'White Chocolate Bar', sales: 320, revenue: '$1,597.80' },
              { name: 'Assorted Chocolate Box', sales: 290, revenue: '$5,220.00' },
              { name: 'Dark Chocolate Truffles', sales: 250, revenue: '$3,247.50' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <p className="font-medium">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 