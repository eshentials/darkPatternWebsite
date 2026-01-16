import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FinalConfirmation = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [showExitModal, setShowExitModal] = useState(false);

  const subtotal = getCartTotal();
  const shipping = 9.99;
  const handling = 2.5;
  const total = subtotal + shipping + handling;

  useEffect(() => {
    const handleMouseOut = (event) => {
      if (event.clientY <= 0) {
        setShowExitModal(true);
      }
    };

    window.addEventListener('mouseout', handleMouseOut);
    return () => window.removeEventListener('mouseout', handleMouseOut);
  }, []);

  const handleConfirm = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <button
            id="task6-exit"
            onClick={() => setShowExitModal(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Final Confirmation</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Order Items</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Handling</span>
                  <span>${handling.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                id="task6-confirm-order"
                onClick={handleConfirm}
                className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-strong p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Your items may sell out!
            </p>
            <div className="flex gap-3">
              <button
                id="task6-stay"
                onClick={() => setShowExitModal(false)}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition"
              >
                Keep my order
              </button>
              <button
                id="task6-review-breakdown"
                onClick={() => setShowExitModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Review breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalConfirmation;
