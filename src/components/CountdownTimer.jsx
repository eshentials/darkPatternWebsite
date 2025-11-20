import React, { useState, useEffect } from 'react';

// DARK PATTERN: False Urgency - Fake countdown timer
const CountdownTimer = ({ initialMinutes = 15, label = "Deal ends in" }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    // When timer reaches 0, reset it to create false urgency
    if (timeLeft <= 0) {
      setTimeLeft(initialMinutes * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 bg-danger text-white px-4 py-2 rounded-lg animate-pulse-fast">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-bold">{label}:</span>
      <span className="text-xl font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default CountdownTimer;

