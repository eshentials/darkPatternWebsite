import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CountdownTimer from '../components/CountdownTimer';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = getCartTotal();
  const shipping = 14.99; // Express shipping pre-selected
  const giftWrap = 7.99; // Gift wrap pre-selected
  const warranty = 19.99; // Warranty pre-selected
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + giftWrap + warranty + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    alert('Order placed successfully! (This is a dummy checkout for research purposes)');
    clearCart();
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DARK PATTERN: Urgent banner */}
      <div className="bg-danger text-white py-3 text-center font-semibold animate-pulse">
        ⚡ Complete your order now to lock in these prices! ⚡
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Timer Banner */}
          <div className="bg-yellow-50 border-l-4 border-accent p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">⏰ Your cart is reserved</p>
                <p className="text-sm text-gray-600">Complete checkout before items are released</p>
              </div>
              <CountdownTimer initialMinutes={8} label="Time remaining" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* DARK PATTERN: Donation Shaming */}
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-400">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    ❤️ Support a Cause
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Help children in need get access to education
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button className="border-2 border-primary bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition">
                      $5
                    </button>
                    <button className="border-2 border-primary bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition">
                      $10
                    </button>
                    <button className="border-2 border-primary bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition">
                      $20
                    </button>
                  </div>

                  <button className="w-full text-sm text-gray-400 hover:text-gray-600 py-2">
                    No, I don't want to help children get educated
                  </button>
                </div>

                {/* DARK PATTERN: Packing Material Shaming */}
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-400">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    🌍 Eco-Friendly Packaging
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose sustainable packaging to protect our planet
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer p-3 border-2 border-green-500 bg-green-50 rounded-lg">
                      <input
                        type="radio"
                        name="packaging"
                        defaultChecked
                        className="w-5 h-5 text-green-600 mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          ♻️ Eco-Friendly Packaging (FREE)
                        </p>
                        <p className="text-xs text-gray-600">
                          Recyclable materials, minimal waste. Join 80% of our customers!
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg bg-gray-50">
                      <input
                        type="radio"
                        name="packaging"
                        className="w-5 h-5 text-primary mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          📦 Extra Bubble Wrap & Plastic
                        </p>
                        <p className="text-xs text-red-600 font-semibold">
                          ⚠️ WARNING: Creates 5x more landfill waste. Harms marine life.
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Not recommended. Adds unnecessary plastic pollution.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg bg-gray-50">
                      <input
                        type="radio"
                        name="packaging"
                        className="w-5 h-5 text-primary mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          🗑️ Maximum Packaging
                        </p>
                        <p className="text-xs text-red-600 font-semibold">
                          ⚠️ SHAME: You're choosing to harm the environment. Selfish choice.
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Double boxes, foam, plastic - completely unnecessary waste.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Note:</span> Our eco-friendly packaging is tested to protect items just as well. Choosing excessive packaging doesn't improve safety, it just harms Earth. 🌎
                    </p>
                  </div>
                </div>

                {/* DARK PATTERN: Misdirection - Multiple pre-checked options */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Options</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer p-3 border-2 border-accent bg-yellow-50 rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          📧 Subscribe to our newsletter
                        </p>
                        <p className="text-sm text-gray-600">
                          Get exclusive deals and early access to sales
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          📱 Receive SMS notifications about your order
                        </p>
                        <p className="text-sm text-gray-600">
                          Stay updated with real-time delivery updates
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          🎁 Join QuickBuy Premium for $9.99/month
                        </p>
                        <p className="text-sm text-gray-600">
                          Free shipping, exclusive deals, and priority support
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          🔔 Allow personalized product recommendations
                        </p>
                        <p className="text-sm text-gray-600">
                          Based on your browsing and purchase history
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 text-lg"
                >
                  Complete Purchase - ${total.toFixed(2)}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                <div className="max-h-64 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 mb-4 pb-4 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Express Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Gift Wrapping</span>
                    <span>${giftWrap.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Extended Warranty</span>
                    <span>${warranty.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* DARK PATTERN: Fake urgency */}
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-yellow-50 border border-accent rounded-lg p-3 text-xs">
                    <p className="font-semibold text-gray-800 mb-1">
                      ⚠️ Prices may increase soon!
                    </p>
                    <p className="text-gray-600">
                      {cart.length} items in your cart are in high demand
                    </p>
                  </div>
                </div>

                {/* Security badges */}
                <div className="mt-4 text-center">
                  <div className="flex justify-center gap-2 text-xs text-gray-500">
                    <span>🔒 Secure Checkout</span>
                    <span>•</span>
                    <span>✓ SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

