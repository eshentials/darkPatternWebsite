import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ScarcityBadge from '../components/ScarcityBadge';
import CountdownTimer from '../components/CountdownTimer';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 3000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DARK PATTERN: Urgent banner */}
      <div className="bg-danger text-white py-3 text-center font-semibold animate-pulse">
        ⚡ LIMITED TIME OFFER - Order within the next hour to get this price! ⚡
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="text-primary hover:underline">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-danger text-white px-4 py-2 rounded-full font-bold text-lg">
              {discount}% OFF
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* DARK PATTERN: Scarcity */}
            <div className="mb-6">
              <ScarcityBadge stock={product.stock} />
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-primary">${product.price}</span>
                <div>
                  <span className="text-2xl text-gray-400 line-through block">${product.originalPrice}</span>
                  <span className="text-sm text-green-600 font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* DARK PATTERN: False Urgency Timer */}
            <div className="mb-6">
              <CountdownTimer initialMinutes={18} label="Special price expires in" />
            </div>

            {/* DARK PATTERN: Fake social proof */}
            <div className="bg-yellow-50 border-l-4 border-accent p-4 mb-6 rounded-lg">
              <p className="text-sm font-semibold text-gray-800">
                🔥 {Math.floor(Math.random() * 200) + 50} people have this in their cart right now!
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {Math.floor(Math.random() * 30) + 10} sold in the last 24 hours
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                {product.stock < 10 && (
                  <span className="text-sm text-danger font-semibold">
                    Only {product.stock} available!
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 mb-4"
            >
              {showAdded ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            {/* DARK PATTERN: Misdirection - Insurance option prominently displayed */}
            <div className="border-2 border-accent bg-yellow-50 p-4 rounded-lg mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    🛡️ Add Product Protection Plan - Only $9.99!
                  </p>
                  <p className="text-sm text-gray-600">
                    Protect your purchase with our comprehensive 2-year warranty
                  </p>
                </div>
              </label>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              
              {/* Fake features */}
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Premium Quality Materials
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Shipping on Orders Over $50
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  30-Day Money-Back Guarantee*
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

