import React, { createContext, useContext, useEffect, useState } from 'react';

const ExperimentContext = createContext();

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within ExperimentProvider');
  }
  return context;
};

const DEFAULT_STATE = {
  addOns: {
    engraving: true,
    refillPack: true
  },
  subscriptionAccepted: null,
  privacySettings: {
    experience: true,
    personalization: true,
    insights: true,
    partners: true
  }
};

export const ExperimentProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    const stored = localStorage.getItem('experimentState');
    if (stored) {
      setState(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('experimentState', JSON.stringify(state));
  }, [state]);

  const setAddOns = (addOns) => {
    setState((prev) => ({ ...prev, addOns }));
  };

  const setSubscriptionAccepted = (accepted) => {
    setState((prev) => ({ ...prev, subscriptionAccepted: accepted }));
  };

  const setPrivacySettings = (privacySettings) => {
    setState((prev) => ({ ...prev, privacySettings }));
  };

  const value = {
    addOns: state.addOns,
    subscriptionAccepted: state.subscriptionAccepted,
    privacySettings: state.privacySettings,
    setAddOns,
    setSubscriptionAccepted,
    setPrivacySettings
  };

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
};
