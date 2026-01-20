import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useExperiment } from '../context/ExperimentContext';
import { logTaskStart } from '../utils/dpriLogger';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { addOns: storedAddOns, setAddOns: setStoredAddOns } = useExperiment();
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(5);
  const [userInteracted, setUserInteracted] = useState(false);
  const [addOns, setLocalAddOns] = useState({
    engraving: storedAddOns.engraving,
    refillPack: storedAddOns.refillPack
  });

  const subtotal = getCartTotal();

  useEffect(() => {
    if (!showAddOnModal || userInteracted) return;
    logTaskStart('T2', 'task2-modal');
    setModalCountdown(5);
    const interval = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStoredAddOns(addOns);
          navigate('/checkout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showAddOnModal, userInteracted, navigate, addOns, setStoredAddOns]);

  const handleCheckout = () => {
    setShowAddOnModal(true);
    setUserInteracted(false);
  };

  const handleAddonChange = (key) => {
    setLocalAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
    setUserInteracted(true);
  };

  const handleProceedWithAddons = () => {
    setStoredAddOns(addOns);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 relative">
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
                          id={item.name === 'Premium Pen Set' ? 'task1-remove-item' : undefined}
                          data-task-id={item.name === 'Premium Pen Set' ? 'T1' : undefined}
                          data-recovery={item.name === 'Premium Pen Set' ? 'true' : undefined}
                          data-recovery-from={item.name === 'Premium Pen Set' ? 'manipulative' : undefined}
                          data-aoi-type={item.name === 'Premium Pen Set' ? 'honest' : 'neutral'}
                          data-aoi-static="true"
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
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Current Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
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

              </div>
            </div>
          </div>
        )}
      </div>

      {showAddOnModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl shadow-strong w-full max-w-lg p-6"
            id="task2-modal"
            data-task-id="T2"
            data-task-start="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add-ons for your order</h2>
              {!userInteracted && (
                <span className="text-xs text-gray-500">
                  Continuing in {modalCountdown}s
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Recommended additions for your stationery set
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="task2-addon-engraving"
                  type="checkbox"
                  checked={addOns.engraving}
                  onChange={() => handleAddonChange('engraving')}
                  className="w-4 h-4 text-primary border-gray-300 rounded mt-1"
                  data-task-id="T2"
                  data-aoi-type="deceptive"
                  data-aoi-static="true"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">Custom Engraving</p>
                  <p className="text-gray-400 text-xs">+$6.00</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="task2-addon-refill"
                  type="checkbox"
                  checked={addOns.refillPack}
                  onChange={() => handleAddonChange('refillPack')}
                  className="w-4 h-4 text-primary border-gray-300 rounded mt-1"
                  data-task-id="T2"
                  data-aoi-type="deceptive"
                  data-aoi-static="true"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">Refill Pack (12)</p>
                  <p className="text-gray-400 text-xs">+$4.50</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <div data-intervention-slot="pre-decision" data-task-id="T2"></div>
              <button
                id="task2-continue-addons"
                onClick={handleProceedWithAddons}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                data-task-id="T2"
                data-decision-role="final"
                data-task-end="true"
                data-outcome-type={addOns.engraving || addOns.refillPack ? 'manipulative' : 'resistant'}
                data-aoi-type="deceptive"
                data-aoi-static="true"
              >
                Continue with add-ons
              </button>
              <button
                id="task2-update-addons"
                onClick={() => setUserInteracted(true)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                data-task-id="T2"
                data-aoi-type="honest"
                data-aoi-static="true"
              >
                Update selections
              </button>
              <div data-intervention-slot="post-decision" data-task-id="T2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

