import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { user, logout } = useAuth();

  // Fetch the current username when the component mounts
  useEffect(() => {
    // You can replace this URL with your API endpoint to fetch user data
    axios.get('/api/user/profile') // Example: Get user data
      .then(response => {
        setUsername(response.data.username); // Assuming the response has a 'username' field
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  // Handle updating the username and password
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('/api/user/profile', { username: newUsername, password: newPassword });
      alert('Profile updated successfully');
      setUsername(response.data.username); // Update the username after successful change
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <Link to="/" className="text-[#8B4513] hover:text-[#A0522D] flex items-center gap-2 text-lg font-medium">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-[#8B4513] mt-6">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column: Account Settings */}
        <section className="bg-white rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#8B4513] mb-4">👤 Account Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">Current Username</label>
              <input 
                type="text" 
                id="username" 
                value={user.name} 
                disabled 
                className="w-full border border-gray-300 p-2 rounded-md bg-gray-100" 
              />
            </div>
            <div>
              <label htmlFor="newUsername" className="block text-gray-700">New Username</label>
              <input 
                type="text" 
                id="newUsername" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                placeholder="Enter new username" 
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" 
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter new password" 
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" 
              />
            </div>
          </div>
          <button 
            onClick={handleUpdateProfile} 
            className="bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#A0522D] mt-4 cursor-pointer"
          >
            Update Profile
          </button>
          
        </section>
        

        {/* Right Column: Shipping Address and Payment Methods */}
        <div className="grid gap-8">
          {/* Shipping Address */}
          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-4">📦 Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Address Line 1" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
              <input type="text" placeholder="City" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
              <input type="text" placeholder="Postal Code" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
            </div>
            <button className="bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#A0522D] mt-4 cursor-pointer">Save Address</button>
          </section>

          <hr className="border-t border-gray-300" />

          {/* Payment Methods */}
          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[#8B4513] mb-4">💳 Payment Methods</h2>
            <p className="text-gray-600">No saved payment methods yet.</p>
            <button className="bg-[#8B4513] text-white px-4 py-2 rounded-md hover:bg-[#A0522D] mt-4 cursor-pointer">Add Card</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
