import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  MoreVertical,
  Calendar,
  Package,
  DollarSign,
  Truck
} from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const statusStyles = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

const OrderRow = ({ order, onViewDetails }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <td className="py-4 px-6">
      <p className="font-medium">#{order.id}</p>
      <p className="text-sm text-gray-500">{order.date}</p>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <img
          src={order.customer.avatar || 'https://via.placeholder.com/40'}
          alt={order.customer.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-sm text-gray-500">{order.customer.email}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <OrderStatusBadge status={order.status} />
    </td>
    <td className="py-4 px-6 font-medium">${order.total}</td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(order)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

const OrderDetails = ({ order, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Order #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Customer Details</h3>
            <div className="space-y-1 text-sm">
              <p>{order.customer.name}</p>
              <p>{order.customer.email}</p>
              <p>{order.customer.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <div className="space-y-1 text-sm">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>{order.shippingAddress.zipCode}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="border rounded-lg divide-y">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 flex items-center gap-4">
                <img
                  src={item.image || 'https://via.placeholder.com/60'}
                  alt={item.name}
                  className="w-15 h-15 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Order Status</h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <div>
            <h3 className="font-medium mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm">
              <p>Subtotal: ${order.subtotal}</p>
              <p>Shipping: ${order.shipping}</p>
              <p>Tax: ${order.tax}</p>
              <p className="font-bold">Total: ${order.total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Update Status
        </button>
      </div>
    </div>
  </div>
);

const OrderStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { icon: Package, label: 'Total Orders', value: '1,234', trend: '+12.5%' },
      { icon: DollarSign, label: 'Total Revenue', value: '$45,678', trend: '+23.2%' },
      { icon: Truck, label: 'Pending Delivery', value: '45', trend: '-5.1%' },
      { icon: Calendar, label: 'Avg. Processing Time', value: '2.3 days', trend: '-12.5%' }
    ].map((stat, index) => (
      <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            <p className={`text-sm mt-1 ${
              stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {stat.trend} this month
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <stat.icon className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - replace with actual API call
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-02-20',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        avatar: null
      },
      status: 'Processing',
      total: 125.99,
      subtotal: 109.99,
      shipping: 10.00,
      tax: 6.00,
      items: [
        {
          name: 'Dark Chocolate Bar',
          quantity: 2,
          price: 11.98,
          image: null
        },
        {
          name: 'Milk Chocolate Truffles',
          quantity: 1,
          price: 12.99,
          image: null
        }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    // Add more mock orders...
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      <OrderStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing 1 to {orders.length} of {orders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders; 