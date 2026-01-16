import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);
  
  // Get flash sale products (random selection)
  const flashSaleProducts = products.slice(8, 14);
  
  // Best deals
  const bestDeals = products.slice(20, 28);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with DARK PATTERNS */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-slide-up">
              Stock Your <span className="text-accent-400">Desk</span>
              <br />
              With Stationery Essentials
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
              Pens, notebooks, and tools for every workspace
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up">
              <div className="text-sm">
                <div className="font-bold text-lg">Stationery staples for every desk</div>
                <div className="text-white/80">Pens, paper, and organizers</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-400 hover:text-gray-900 transition-all transform hover:scale-105 shadow-strong"
              >
                <span>Shop Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Quick Stats / Benefits Bar */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚀', title: '2-Hour Delivery', subtitle: 'In select cities' },
              { icon: '💰', title: 'Best Prices', subtitle: 'Price match guarantee' },
              { icon: '🎁', title: 'Free Gifts', subtitle: 'On orders over $50' },
              { icon: '⭐', title: '4.8★ Rated', subtitle: '50k+ reviews' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-danger-500 rounded-full"></div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                  <span className="text-danger-500">⚡</span>
                  Featured Picks
                </h2>
                <p className="text-gray-600 mt-1">Handpicked stationery essentials</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-danger-500 hover:bg-danger-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-medium hover:shadow-strong"
            >
              View All Picks
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Shop By Category</h2>
            <p className="text-gray-600">Discover amazing products across all categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Notebooks', icon: '📓', color: 'from-orange-400 to-red-500' },
              { name: 'Writing', icon: '✏️', color: 'from-purple-400 to-pink-500' },
              { name: 'Desk Accessories', icon: '🖥️', color: 'from-blue-400 to-cyan-500' },
              { name: 'Paper', icon: '📄', color: 'from-green-400 to-emerald-500' },
              { name: 'Art Supplies', icon: '🎨', color: 'from-indigo-400 to-purple-500' },
              { name: 'Office Supplies', icon: '📎', color: 'from-yellow-400 to-orange-500' }
            ].map((cat, index) => (
              <Link
                key={index}
                to="/products"
                className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-strong rounded-2xl p-6 text-center transition-all transform hover:scale-105"
              >
                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center text-3xl shadow-medium group-hover:shadow-strong transition-all transform group-hover:rotate-12`}>
                  {cat.icon}
                </div>
                <div className="font-semibold text-gray-800 group-hover:text-primary-600 transition">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                🔥 Best Deals of the Day
              </h2>
              <p className="text-gray-600 mt-1">Handpicked just for you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-secondary-500 rounded-full"></div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">⭐ Trending Products</h2>
                <p className="text-gray-600 mt-1">Most popular items this week</p>
              </div>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition shadow-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why Shop With Us?</h2>
            <p className="text-gray-600">Join millions of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🚀',
                title: 'Lightning Fast Delivery',
                description: '2-hour delivery in select cities, guaranteed fresh products'
              },
              {
                icon: '💰',
                title: 'Best Price Guarantee',
                description: 'Found cheaper elsewhere? We\'ll match it and give you 10% off!'
              },
              {
                icon: '🎁',
                title: 'Amazing Rewards',
                description: 'Earn points on every purchase. Redeem for discounts and gifts'
              },
              {
                icon: '⭐',
                title: '24/7 Support',
                description: 'Premium customer service always ready to help you'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Get Exclusive Deals in Your Inbox! 📧
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Subscribe now and get 20% OFF on your first order
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-accent-400"
              />
              <button className="bg-accent-500 hover:bg-accent-600 text-gray-900 px-8 py-4 rounded-xl font-bold transition-all shadow-strong hover:shadow-medium transform hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              ✓ No spam, just great deals | Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
