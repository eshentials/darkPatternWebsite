import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showAdded, setShowAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [taskTimer, setTaskTimer] = useState(179);

  const isPremiumPenSet = product.name.toLowerCase().includes('premium') && product.name.toLowerCase().includes('pen');

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTaskTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="group block">
      <div className="bg-white rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-primary-200">
        {/* Image Container */}
        <Link to={`/product/${product.id}`} className="relative overflow-hidden bg-gray-50 aspect-square block">
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

          {/* Quick View on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm shadow-strong transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category Tag */}
          <div className="text-xs text-primary-600 font-semibold mb-1.5 uppercase tracking-wide">
            {product.category}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition leading-snug">
              {product.name}
            </h3>
          </Link>

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

          <div
            id={isPremiumPenSet ? 'task1-urgency-timer' : undefined}
            className="mb-3 bg-yellow-50 border border-accent rounded-lg px-3 py-2 text-xs font-semibold text-gray-800"
          >
            Offer expires in {String(Math.floor(taskTimer / 60)).padStart(2, '0')}:
            {String(taskTimer % 60).padStart(2, '0')}
          </div>

          {/* Delivery Info */}
          <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free Delivery</span>
          </div>

          <div className="mt-auto">
            <button
              id={isPremiumPenSet ? 'task1-buy-now' : undefined}
              onClick={isPremiumPenSet ? handleBuyNow : handleAddToCart}
              className={`w-full font-bold rounded-lg transition-all transform hover:scale-105 ${
                isPremiumPenSet
                  ? 'py-4 bg-primary-500 hover:bg-primary-600 text-white shadow-medium'
                  : 'py-4 bg-primary-500 hover:bg-primary-600 text-white shadow-medium'
              }`}
            >
              {showAdded && !isPremiumPenSet ? 'Added to Cart!' : 'Buy Now'}
            </button>
            <Link
              id={isPremiumPenSet ? 'task1-view-details' : undefined}
              to={`/product/${product.id}`}
              className="mt-2 block text-center text-xs text-gray-400 hover:text-gray-500"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
