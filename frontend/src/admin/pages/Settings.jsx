import { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Mail,
  CreditCard,
  Globe,
  Shield,
  Truck
} from 'lucide-react';

const SettingsSection = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const FormGroup = ({ label, children, helper }) => (
  <div className="space-y-2">
    <label className="block font-medium text-gray-700">{label}</label>
    {children}
    {helper && <p className="text-sm text-gray-500">{helper}</p>}
  </div>
);

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Implement save functionality
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store settings and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsSection icon={User} title="Profile Settings">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Change Photo
                </button>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>

            <FormGroup label="Display Name">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your display name"
              />
            </FormGroup>

            <FormGroup label="Email Address">
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </FormGroup>
          </div>
        </SettingsSection>

        <SettingsSection icon={Lock} title="Security Settings">
          <div className="space-y-6">
            <FormGroup label="Current Password">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            <FormGroup label="New Password">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            <FormGroup label="Confirm New Password">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            <FormGroup label="Two-Factor Authentication">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="2fa" className="rounded text-blue-600" />
                <label htmlFor="2fa">Enable two-factor authentication</label>
              </div>
            </FormGroup>
          </div>
        </SettingsSection>

        <SettingsSection icon={Bell} title="Notification Settings">
          <div className="space-y-6">
            <FormGroup label="Email Notifications">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="orderNotif" className="rounded text-blue-600" />
                  <label htmlFor="orderNotif">New order notifications</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="stockNotif" className="rounded text-blue-600" />
                  <label htmlFor="stockNotif">Low stock alerts</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="reviewNotif" className="rounded text-blue-600" />
                  <label htmlFor="reviewNotif">Customer review notifications</label>
                </div>
              </div>
            </FormGroup>

            <FormGroup label="Push Notifications">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pushOrder" className="rounded text-blue-600" />
                  <label htmlFor="pushOrder">Enable push notifications</label>
                </div>
              </div>
            </FormGroup>
          </div>
        </SettingsSection>

        <SettingsSection icon={CreditCard} title="Payment Settings">
          <div className="space-y-6">
            <FormGroup label="Payment Methods">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="stripe" className="rounded text-blue-600" />
                  <label htmlFor="stripe">Stripe</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="paypal" className="rounded text-blue-600" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
            </FormGroup>

            <FormGroup label="Currency">
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
              </select>
            </FormGroup>
          </div>
        </SettingsSection>

        <SettingsSection icon={Globe} title="Store Settings">
          <div className="space-y-6">
            <FormGroup label="Store Name">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your store name"
              />
            </FormGroup>

            <FormGroup label="Store Description">
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Brief description of your store"
              />
            </FormGroup>

            <FormGroup label="Store Logo">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Store Logo"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload Logo
                </button>
              </div>
            </FormGroup>
          </div>
        </SettingsSection>

        <SettingsSection icon={Truck} title="Shipping Settings">
          <div className="space-y-6">
            <FormGroup label="Shipping Methods">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="standard" className="rounded text-blue-600" />
                  <label htmlFor="standard">Standard Shipping</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="express" className="rounded text-blue-600" />
                  <label htmlFor="express">Express Shipping</label>
                </div>
              </div>
            </FormGroup>

            <FormGroup label="Free Shipping Threshold">
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
              <p className="text-sm text-gray-500 mt-1">
                Orders above this amount qualify for free shipping
              </p>
            </FormGroup>
          </div>
        </SettingsSection>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings; 