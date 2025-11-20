import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CountdownTimer from '../components/CountdownTimer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DARK PATTERN: False urgency banner */}
      <div className="bg-danger text-white py-3 text-center font-semibold animate-pulse">
        ⚡ Items in your cart are selling fast! Complete checkout now! ⚡
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
            <Link
              to="/products"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* DARK PATTERN: Timer on cart */}
              <div className="bg-yellow-50 border-l-4 border-accent p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">⏰ Reserved for you</p>
                    <p className="text-sm text-gray-600">Items will be released if not purchased soon</p>
                  </div>
                  <CountdownTimer initialMinutes={12} label="Time left" />
                </div>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 relative">
                  {/* DARK PATTERN: Mark sneaked items subtly */}
                  {item.sneaked && (
                    <div className="absolute top-2 right-2 bg-accent text-xs px-2 py-1 rounded-full font-semibold">
                      ⭐ Recommended
                    </div>
                  )}

                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xl font-semibold text-gray-800 hover:text-primary transition"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      
                      {/* DARK PATTERN: Show scarcity in cart */}
                      {item.stock <= 3 && (
                        <p className="text-sm text-danger font-semibold mt-2 animate-pulse">
                          ⚠️ Only {item.stock} left in stock!
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-danger hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        ${(item.originalPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* DARK PATTERN: Misdirection - Pre-selected add-ons */}
                <div className="border-t border-b py-4 mb-6 space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">Express Shipping (+$14.99)</p>
                      <p className="text-gray-500">Get it by tomorrow</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">Gift Wrapping (+$7.99)</p>
                      <p className="text-gray-500">Beautiful premium packaging</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">Extended Warranty (+$19.99)</p>
                      <p className="text-gray-500">3-year protection plan</p>
                    </div>
                  </label>
                </div>

                {subtotal < 50 && (
                  <div className="bg-yellow-50 border border-accent rounded-lg p-3 mb-4 text-sm">
                    <p className="font-semibold text-gray-800">
                      🎁 Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* DARK PATTERN: Donation Shaming Preview */}
                <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    ❤️ Support Children's Education
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Add a small donation at checkout to help underprivileged children
                  </p>
                  <div className="text-xs text-gray-500">
                    ✓ Available at checkout
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-primary hover:text-secondary font-medium"
                >
                  Continue Shopping
                </Link>

                {/* DARK PATTERN: Fake social proof */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-600 text-center">
                    🔥 {Math.floor(Math.random() * 50) + 20} people bought these items in the last hour
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

