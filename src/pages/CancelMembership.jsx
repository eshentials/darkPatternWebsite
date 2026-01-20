import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logTaskStart } from '../utils/dpriLogger';

const CancelMembership = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [step, setStep] = useState(0);
  const [delayActive, setDelayActive] = useState(false);

  useEffect(() => {
    if (step === 0) return;
    setDelayActive(true);
    const timer = setTimeout(() => setDelayActive(false), 1500);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    logTaskStart('T4', 'task4-start');
  }, []);

  const handlePause = () => {
    navigate('/profile');
  };

  const startCancel = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-task-id="T4" data-task-start="true" id="task4-start">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Subscription Controls</h1>

        {step === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-6">
              Manage your Stationery Saver Club membership.
            </p>
            <div data-intervention-slot="pre-decision" data-task-id="T4"></div>
            <button
              id="task4-pause-subscription"
              onClick={handlePause}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
              data-task-id="T4"
              data-decision-role="final"
              data-task-end="true"
              data-outcome-type="manipulative"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            >
              Pause Subscription
            </button>
            <div data-intervention-slot="post-decision" data-task-id="T4"></div>

            <div className="mt-6 border-t pt-4">
              <button
                id="task4-options-toggle"
                onClick={() => setShowOptions(!showOptions)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                More options
              </button>
              {showOptions && (
                <div className="mt-3">
                  <button
                    id="task4-cancel-link"
                    onClick={startCancel}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Confirm your request</h2>
            <p className="text-sm text-gray-600 mb-6">
              We need a quick confirmation before proceeding.
            </p>
            <button
              id="task4-continue-1"
              onClick={() => setStep(2)}
              disabled={delayActive}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                delayActive ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-danger text-white hover:bg-red-700'
              }`}
              data-task-id="T4"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            >
              {delayActive ? 'Loading...' : 'Continue cancellation'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Review benefits</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your discounts and free shipping end immediately after cancellation.
            </p>
            <button
              id="task4-continue-2"
              onClick={() => setStep(3)}
              disabled={delayActive}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                delayActive ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-danger text-white hover:bg-red-700'
              }`}
              data-task-id="T4"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            >
              {delayActive ? 'Loading...' : 'Continue cancellation'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Final step</h2>
            <p className="text-sm text-gray-600 mb-6">
              Confirm cancellation to remove the subscription.
            </p>
            <div data-intervention-slot="pre-decision" data-task-id="T4"></div>
            <button
              id="task4-confirm-cancel"
              onClick={() => navigate('/privacy-settings')}
              disabled={delayActive}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                delayActive ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-danger text-white hover:bg-red-700'
              }`}
              data-task-id="T4"
              data-decision-role="final"
              data-task-end="true"
              data-outcome-type="resistant"
              data-aoi-type="honest"
              data-aoi-static="true"
            >
              {delayActive ? 'Processing...' : 'Cancel subscription'}
            </button>
            <div data-intervention-slot="post-decision" data-task-id="T4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelMembership;

