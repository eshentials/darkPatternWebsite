import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ScarcityBadge from './ScarcityBadge';
import CountdownTimer from './CountdownTimer';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  // DARK PATTERN: Show timer on random products for false urgency
  const showTimer = product.id % 3 === 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Discount Badge */}
          <div className="absolute top-2 left-2 bg-danger text-white px-3 py-1 rounded-full font-bold text-sm">
            {discount}% OFF
          </div>
          {/* Scarcity Badge */}
          <div className="absolute top-2 right-2">
            <ScarcityBadge stock={product.stock} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          </div>

          {/* DARK PATTERN: False Urgency Timer */}
          {showTimer && (
            <div className="mb-3 scale-90">
              <CountdownTimer initialMinutes={Math.floor(Math.random() * 20) + 10} label="Offer ends" />
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-auto w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 relative overflow-hidden"
          >
            {showAdded ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added!
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>

          {/* DARK PATTERN: Fake social proof */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            🔥 {Math.floor(Math.random() * 500) + 100} people viewing this now
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

