import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ScarcityBadge from './ScarcityBadge';
import CountdownTimer from './CountdownTimer';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  // DARK PATTERN: Show timer on random products for false urgency
  const showTimer = product.id % 3 === 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-primary-200">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {/* Discount Badge */}
            <div className="bg-danger-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-medium">
              {discount}% OFF
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full transition-all duration-300 shadow-medium ${
                isWishlisted 
                  ? 'bg-danger-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-danger-50 hover:text-danger-500'
              }`}
            >
              <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Scarcity Badge */}
          <div className="absolute bottom-3 left-3">
            <ScarcityBadge stock={product.stock} />
          </div>

          {/* Quick View on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm shadow-strong transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category Tag */}
          <div className="text-xs text-primary-600 font-semibold mb-1.5 uppercase tracking-wide">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              <span>{product.rating}</span>
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            </div>
            <div className="text-xs text-green-600 font-semibold">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </div>
          </div>

          {/* DARK PATTERN: False Urgency Timer */}
          {showTimer && (
            <div className="mb-3">
              <CountdownTimer initialMinutes={Math.floor(Math.random() * 20) + 10} label="Offer ends" />
            </div>
          )}

          {/* DARK PATTERN: Fake social proof */}
          <div className="mb-3 text-xs text-orange-600 font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{Math.floor(Math.random() * 500) + 100} people viewing</span>
          </div>

          {/* Delivery Info */}
          <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free Delivery</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`mt-auto w-full font-semibold py-3 rounded-lg transition-all transform active:scale-95 relative overflow-hidden ${
              showAdded
                ? 'bg-green-600 text-white'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-medium'
            }`}
          >
            {showAdded ? (
              <span className="flex items-center justify-center gap-2 animate-fade-in">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added to Cart!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
