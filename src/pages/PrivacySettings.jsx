import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExperiment } from '../context/ExperimentContext';
import { logTaskStart } from '../utils/dpriLogger';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const { privacySettings, setPrivacySettings } = useExperiment();
  const [toggles, setToggles] = useState({
    experience: privacySettings.experience,
    personalization: privacySettings.personalization,
    insights: privacySettings.insights,
    partners: privacySettings.partners
  });
  const [cooldown, setCooldown] = useState(0);

  const allOn = Object.values(toggles).every(Boolean);

  useEffect(() => {
    if (allOn) {
      setCooldown(0);
      return;
    }

    setCooldown(10);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [allOn]);

  useEffect(() => {
    logTaskStart('T5', 'task5-start');
  }, []);

  const updateToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isContinueDisabled = !allOn && cooldown > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-task-id="T5" data-task-start="true" id="task5-start">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Account & Privacy Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Control how we use data to improve your experience.
          </p>

          <label className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-semibold text-gray-800">Improve your experience</p>
              <p className="text-xs text-gray-500">Use activity to enhance features</p>
            </div>
            <input
              id="task5-toggle-experience"
              type="checkbox"
              checked={toggles.experience}
              onChange={() => updateToggle('experience')}
              className="w-5 h-5 text-primary"
              data-task-id="T5"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            />
          </label>

          <label className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-semibold text-gray-800">Personalized content</p>
              <p className="text-xs text-gray-500">Show items tailored to you</p>
            </div>
            <input
              id="task5-toggle-personalization"
              type="checkbox"
              checked={toggles.personalization}
              onChange={() => updateToggle('personalization')}
              className="w-5 h-5 text-primary"
              data-task-id="T5"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            />
          </label>

          <label className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-semibold text-gray-800">Improve services</p>
              <p className="text-xs text-gray-500">Use insights to refine features</p>
            </div>
            <input
              id="task5-toggle-insights"
              type="checkbox"
              checked={toggles.insights}
              onChange={() => updateToggle('insights')}
              className="w-5 h-5 text-primary"
              data-task-id="T5"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            />
          </label>

          <label className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-gray-800">Trusted partners</p>
              <p className="text-xs text-gray-500">Share data for better offers</p>
            </div>
            <input
              id="task5-toggle-partners"
              type="checkbox"
              checked={toggles.partners}
              onChange={() => updateToggle('partners')}
              className="w-5 h-5 text-primary"
              data-task-id="T5"
              data-aoi-type="deceptive"
              data-aoi-static="true"
            />
          </label>

          <div className="pt-4 border-t">
            <div data-intervention-slot="pre-decision" data-task-id="T5"></div>
            <button
              id="task5-continue"
              onClick={() => {
                setPrivacySettings(toggles);
                navigate('/final-confirmation');
              }}
              disabled={isContinueDisabled}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isContinueDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-secondary'
              }`}
              data-task-id="T5"
              data-decision-role="final"
              data-task-end="true"
              data-outcome-type={allOn ? 'manipulative' : 'resistant'}
              data-aoi-type={allOn ? 'deceptive' : 'honest'}
              data-aoi-static="true"
            >
              Continue{!allOn && cooldown > 0 ? ` (${cooldown}s)` : ''}
            </button>
            <div data-intervention-slot="post-decision" data-task-id="T5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
