import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExperiment } from '../context/ExperimentContext';

const Subscription = () => {
  const navigate = useNavigate();
  const { setSubscriptionAccepted } = useExperiment();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-800">Stationery Saver Club</h1>
              <span className="text-sm text-gray-600">Step 2 of 2 – Almost Done!</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-full"></div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            Save on every order with exclusive discounts and member-only offers.
          </p>

          <div className="bg-yellow-50 border border-accent rounded-lg p-4 mb-6">
            <p className="font-semibold text-gray-800">Join for $9.99/month</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              id="task3-accept-subscription"
              onClick={() => {
                setSubscriptionAccepted(true);
                navigate('/cancel-membership');
              }}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              Yes, add Stationery Saver Club
            </button>
            <button
              id="task3-decline-subscription"
              onClick={() => {
                setSubscriptionAccepted(false);
                navigate('/cancel-membership');
              }}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              No, I don't want to save money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
