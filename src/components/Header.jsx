import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Crafts', icon: '🎨' },
    { name: 'Home Decor', icon: '🏠' },
    { name: 'Outdoor', icon: '🏕️' },
    { name: 'Wellness', icon: '🧘' },
    { name: 'Office Supplies', icon: '📝' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Banner - DARK PATTERN: False urgency */}
      <div className="bg-gradient-to-r from-danger-600 via-danger-500 to-danger-600 text-white py-2 text-center font-semibold text-sm animate-pulse-fast">
        <span className="inline-flex items-center gap-2">
          ⚡ FLASH SALE! Up to 60% OFF - Limited Time Only! ⚡
          <span className="hidden sm:inline">| Free Shipping on Orders Above $50</span>
        </span>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-medium sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Header Row */}
          <div className="flex items-center justify-between py-3 border-b">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-soft">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  QuickBuy
                </span>
                <div className="text-xs text-gray-500 -mt-1">Shop Smart, Live Better</div>
              </div>
            </Link>

            {/* Search Bar - Prominent like Amazon/Flipkart */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition text-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-md transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* User Menu */}
              {user ? (
                <Link 
                  to="/profile" 
                  className="hidden sm:flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Hello,</div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-primary-500 transition">
                      {user.name}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="hidden sm:flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Hello,</div>
                    <div className="text-sm font-semibold text-gray-800">Sign In</div>
                  </div>
                </Link>
              )}

              {/* Cart - Prominent like quick commerce */}
              <Link 
                to="/cart" 
                className="relative flex items-center gap-2 hover:bg-primary-50 px-4 py-2 rounded-lg transition group"
              >
                <div className="relative">
                  <svg className="w-7 h-7 text-gray-700 group-hover:text-primary-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in shadow-medium">
                      {getCartItemsCount()}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block text-sm font-semibold text-gray-800 group-hover:text-primary-500 transition">
                  Cart
                </span>
              </Link>

              {/* Logout for mobile */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="sm:hidden text-sm text-gray-600 hover:text-danger-500 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* Category Menu */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>All Categories</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {showCategories && (
                  <div
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                    className="absolute top-full left-0 mt-1 w-64 bg-white shadow-strong rounded-lg py-2 animate-slide-down z-50"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to="/products"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-primary-50 transition"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Navigation Links */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive('/') 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive('/products') 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Products
                </Link>
                <div className="px-4 py-2 text-gray-700 font-medium flex items-center gap-1">
                  <span className="text-danger-500">🔥</span>
                  Deals
                </div>
                <div className="px-4 py-2 text-gray-700 font-medium">New Arrivals</div>
              </nav>

              {/* Right Side Links */}
              <div className="hidden lg:flex items-center gap-4">
                {user && (
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-danger-500 font-medium transition"
                  >
                    Logout
                  </button>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b px-4 py-2 sticky top-[88px] z-40">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:border-primary-500 focus:outline-none text-sm"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
