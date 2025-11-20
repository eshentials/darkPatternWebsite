import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-semibold text-gray-800">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Member Since</label>
                <p className="font-semibold text-gray-800">
                  {new Date(user.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition">
              Edit Profile
            </button>
          </div>

          {/* Premium Membership */}
          <div className="bg-gradient-to-br from-accent to-yellow-500 rounded-lg shadow-md p-6 text-gray-800">
            <h2 className="text-2xl font-bold mb-4">⭐ Premium Membership</h2>
            <p className="text-sm mb-4">
              You're currently on our Premium plan
            </p>
            <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
              <p className="text-lg font-bold">$9.99/month</p>
              <p className="text-sm">Billed monthly • Next payment: Dec 20, 2024</p>
            </div>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free shipping on all orders
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Exclusive deals and early access
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Priority customer support
              </div>
            </div>
            
            {/* DARK PATTERN: Make cancellation hard to find and scary */}
            <Link
              to="/cancel-membership"
              className="block text-center text-xs text-gray-700 hover:text-gray-900 underline"
            >
              Cancel membership
            </Link>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No orders yet</p>
              <Link to="/products" className="text-primary hover:underline mt-2 inline-block">
                Start shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

