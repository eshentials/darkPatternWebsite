import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CountdownTimer from '../components/CountdownTimer';
import { products } from '../data/products';

const Home = () => {
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);
  
  // Get flash sale products (random selection)
  const flashSaleProducts = products.slice(8, 14);

  // DARK PATTERN: False urgency - multiple timers
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with DARK PATTERNS */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 animate-pulse">
              🎉 MEGA SALE HAPPENING NOW! 🎉
            </h1>
            <p className="text-xl mb-6">
              Up to 70% OFF on ALL products - Don't miss out!
            </p>
            
            {/* DARK PATTERN: False Urgency */}
            <div className="flex justify-center gap-4 mb-8">
              <CountdownTimer initialMinutes={45} label="Sale ends in" />
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                to="/products"
                className="bg-accent text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
              >
                View Deals
              </Link>
            </div>

            {/* DARK PATTERN: Fake social proof */}
            <div className="mt-8 text-sm opacity-90">
              ⚡ <span className="font-semibold">12,847 people</span> are shopping right now
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-12 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">⚡ Flash Sale</h2>
              <p className="text-gray-600">Hurry! Limited time offers</p>
            </div>
            <CountdownTimer initialMinutes={30} label="Ends in" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fake Notifications - DARK PATTERN */}
      <div className="fixed bottom-4 left-4 z-40">
        <FakeNotifications />
      </div>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🔥 Trending Products</h2>
            <p className="text-gray-600">Most popular items this week</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with DARK PATTERN emphasis */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="font-bold mb-2">Lightning Fast Delivery</h3>
              <p className="text-sm text-gray-600">2-hour delivery guaranteed*</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold mb-2">Lowest Prices</h3>
              <p className="text-sm text-gray-600">Price match guarantee*</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="font-bold mb-2">Free Gifts</h3>
              <p className="text-sm text-gray-600">On orders over $50*</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-bold mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-600">100% satisfaction*</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">*Terms and conditions apply</p>
        </div>
      </section>
    </div>
  );
};

// DARK PATTERN: Fake purchase notifications
const FakeNotifications = () => {
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    const names = ['Sarah', 'John', 'Emma', 'Michael', 'Lisa', 'David', 'Jennifer', 'Robert'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
    
    const showRandomNotification = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      
      const notification = {
        id: Date.now(),
        message: `${randomName} from ${randomCity} just purchased "${randomProduct.name}"`,
        time: 'Just now'
      };

      setNotifications(prev => [notification, ...prev].slice(0, 1));

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    };

    // Show notification every 10-15 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 5000 + 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-white border-l-4 border-primary shadow-lg rounded-lg p-4 max-w-sm animate-slide-in"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

