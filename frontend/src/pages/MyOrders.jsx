import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  // Dummy data (You can replace this with real data fetched from your API)
  const orders = [
    {
      orderId: 'ORD123456',
      orderItems: [
        {
          name: 'Belgian Dark Chocolate (70% Cocoa)',
          qty: 2,
          image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          price: 12.99,
        },
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'Colombo',
        postalCode: '10280',
        country: 'Sri Lanka',
      },
      paymentMethod: 'Credit Card',
      itemsPrice: 25.98,
      totalPrice: 25.98,
      isPaid: false,
      isDelivered: false,
      createdAt: new Date('2023-05-15T12:00:00'),
    },
    {
      orderId: 'ORD123457',
      orderItems: [
        {
          name: 'Milk Chocolate with Almonds',
          qty: 1,
          image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          price: 8.99,
        },
        {
          name: 'Dark Chocolate Hazelnut Truffles',
          qty: 1,
          image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          price: 14.99,
        },
      ],
      shippingAddress: {
        address: '456 Elm St',
        city: 'Kandy',
        postalCode: '20000',
        country: 'Sri Lanka',
      },
      paymentMethod: 'PayPal',
      itemsPrice: 23.98,
      totalPrice: 23.98,
      isPaid: true,
      isDelivered: true,
      createdAt: new Date('2023-06-01T10:30:00'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Link to="/shop" className="text-[#8B4513] hover:text-[#A0522D] flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Shop
        </Link>
        <h1 className="text-3xl font-bold text-[#8B4513] mt-4">My Orders</h1>
      </div>

      {/* Order List Section */}
      {orders.map((order) => (
        <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#8B4513] mb-6">Order ID: {order.orderId}</h2>

          {/* Order Items */}
          <div className="grid gap-6">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#8B4513]">Shipping Address</h3>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#8B4513]">Payment Method</h3>
            <p className="text-gray-600">{order.paymentMethod}</p>
          </div>

          {/* Order Summary */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-800">Total: ${order.totalPrice.toFixed(2)}</p>
            <div className="flex items-center gap-4">
              {!order.isPaid && (
                <button className="bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#A0522D]">
                  Pay Now
                </button>
              )}
              {order.isDelivered && (
                <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-md">
                  Delivered
                </button>
              )}
              {!order.isDelivered && !order.isPaid && (
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-not-allowed">
                  Awaiting Delivery
                </button>
              )}
            </div>
          </div>

          {/* Order Date */}
          <div className="mt-6 text-sm text-gray-600">
            <p>Order placed on {order.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings;
