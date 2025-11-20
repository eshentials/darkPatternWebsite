import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// DARK PATTERN: Iliad Flow - Multi-step cancellation with maximum friction
const CancelMembership = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reason: '',
    detailedReason: '',
    alternativeConsidered: '',
    satisfaction: '',
    likelyToReturn: '',
    recommendation: '',
    additionalFeedback: ''
  });
  const [captchaAnswers, setCaptchaAnswers] = useState(['', '', '', '']);
  const [acceptedTerms, setAcceptedTerms] = useState([false, false]);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const captchaQuestions = [
    { question: "What is 7 + 15?", answer: "22" },
    { question: "Type the word 'CANCEL' in uppercase", answer: "CANCEL" },
    { question: "How many letters are in 'MEMBERSHIP'?", answer: "10" },
    { question: "What is 144 ÷ 12?", answer: "12" }
  ];

  const handleCaptchaChange = (index, value) => {
    const newAnswers = [...captchaAnswers];
    newAnswers[index] = value;
    setCaptchaAnswers(newAnswers);
  };

  const verifyCaptcha = (index) => {
    return captchaAnswers[index].trim() === captchaQuestions[index].answer;
  };

  const canProceedFromStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.reason && formData.detailedReason.length >= 50;
      case 2:
        return formData.alternativeConsidered && formData.satisfaction && formData.likelyToReturn;
      case 3:
        return acceptedTerms[0];
      case 4:
        return verifyCaptcha(0);
      case 5:
        return verifyCaptcha(1);
      case 6:
        return acceptedTerms[1];
      case 7:
        return verifyCaptcha(2) && verifyCaptcha(3);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedFromStep(step)) {
      setStep(step + 1);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleFinalCancel = () => {
    alert('Your membership cancellation request has been submitted. It will be processed in 7-10 business days. You will continue to be charged until the cancellation is complete.');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Bar - DARK PATTERN: Shows many steps to discourage */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Cancel Premium Membership</h1>
            <span className="text-sm text-gray-600">Step {step} of 8</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-danger h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: Initial Reasons */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-accent rounded">
              <p className="font-semibold text-gray-800">⚠️ Before you go...</p>
              <p className="text-sm text-gray-600 mt-1">
                You'll lose access to free shipping, exclusive deals, and priority support worth over $300/year!
              </p>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Why are you leaving us?</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Reason *
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="expensive">Too expensive</option>
                  <option value="not-using">Not using it enough</option>
                  <option value="found-alternative">Found an alternative</option>
                  <option value="service-issues">Service issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Please explain in detail (minimum 50 characters) *
                </label>
                <textarea
                  value={formData.detailedReason}
                  onChange={(e) => setFormData({...formData, detailedReason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  placeholder="We really want to understand why you're leaving..."
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.detailedReason.length}/50 characters minimum
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Keep My Membership
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(1)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(1)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue Canceling
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: More Questions */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-secondary rounded">
              <p className="font-semibold text-gray-800">💡 Did you know?</p>
              <p className="text-sm text-gray-600 mt-1">
                Premium members save an average of $45 per month on shipping alone!
              </p>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Help us understand better</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Have you considered our lower-tier plans? *
                </label>
                <div className="space-y-2">
                  {['Yes, but they don\'t fit my needs', 'No, I wasn\'t aware of them', 'Yes, but still too expensive', 'I don\'t want any plan'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="alternative"
                        value={option}
                        checked={formData.alternativeConsidered === option}
                        onChange={(e) => setFormData({...formData, alternativeConsidered: e.target.value})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How satisfied were you with our service? *
                </label>
                <select
                  value={formData.satisfaction}
                  onChange={(e) => setFormData({...formData, satisfaction: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select satisfaction level</option>
                  <option value="very-satisfied">Very Satisfied</option>
                  <option value="satisfied">Satisfied</option>
                  <option value="neutral">Neutral</option>
                  <option value="dissatisfied">Dissatisfied</option>
                  <option value="very-dissatisfied">Very Dissatisfied</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How likely are you to return in the future? *
                </label>
                <select
                  value={formData.likelyToReturn}
                  onChange={(e) => setFormData({...formData, likelyToReturn: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select likelihood</option>
                  <option value="very-likely">Very Likely</option>
                  <option value="likely">Likely</option>
                  <option value="maybe">Maybe</option>
                  <option value="unlikely">Unlikely</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(2)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(2)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: First Terms & Conditions */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Terms of Cancellation</h2>
            
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto text-xs text-gray-700 mb-4">
              <h3 className="font-bold mb-2">CANCELLATION POLICY - PART 1</h3>
              <p className="mb-2">
                By proceeding with the cancellation of your Premium Membership, you acknowledge and agree to the following terms and conditions...
              </p>
              <p className="mb-2">
                1. Your membership benefits will continue until the end of your current billing cycle. You will not receive a prorated refund for any unused portion of your membership.
              </p>
              <p className="mb-2">
                2. You will lose access to all Premium features including free shipping, exclusive deals, priority support, and early access to sales.
              </p>
              <p className="mb-2">
                3. Any pending orders may be subject to additional shipping charges if they were placed with Premium benefits.
              </p>
              <p className="mb-2">
                4. Accumulated rewards points and exclusive member discounts will expire immediately upon cancellation.
              </p>
              <p className="mb-2">
                5. You may not be eligible for the same membership rate if you choose to rejoin in the future.
              </p>
              <p className="mb-2">
                6. Cancellation requests may take 7-10 business days to process.
              </p>
              <p className="mb-2">
                7. During the processing period, you may continue to be charged at your regular membership rate.
              </p>
              <p className="mb-2">
                8. We reserve the right to offer you special retention offers before final cancellation.
              </p>
              <p className="mb-2">
                9. Your purchase history and saved items will remain, but you will no longer receive personalized recommendations.
              </p>
              <p>
                10. By canceling, you forfeit any ongoing promotional pricing and will be subject to standard pricing if you rejoin.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={acceptedTerms[0]}
                onChange={(e) => {
                  const newTerms = [...acceptedTerms];
                  newTerms[0] = e.target.checked;
                  setAcceptedTerms(newTerms);
                }}
                className="w-5 h-5 mt-1"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the cancellation terms and conditions described above. I understand that I will lose all Premium benefits immediately. *
              </span>
            </label>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(3)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(3)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: First CAPTCHA */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Security Verification (1 of 4)</h2>
            
            <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                For security purposes, please verify you're not a bot.
              </p>
              <div className="bg-white p-4 rounded border-2 border-gray-400 inline-block">
                <p className="font-bold text-lg mb-2">{captchaQuestions[0].question}</p>
                <input
                  type="text"
                  value={captchaAnswers[0]}
                  onChange={(e) => handleCaptchaChange(0, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your answer"
                />
              </div>
              {captchaAnswers[0] && !verifyCaptcha(0) && (
                <p className="text-danger text-sm mt-2">Incorrect answer. Please try again.</p>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(4)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(4)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Verify & Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Second CAPTCHA */}
        {step === 5 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Security Verification (2 of 4)</h2>
            
            <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Additional verification required for account security.
              </p>
              <div className="bg-white p-4 rounded border-2 border-gray-400 inline-block">
                <p className="font-bold text-lg mb-2">{captchaQuestions[1].question}</p>
                <input
                  type="text"
                  value={captchaAnswers[1]}
                  onChange={(e) => handleCaptchaChange(1, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your answer"
                />
              </div>
              {captchaAnswers[1] && !verifyCaptcha(1) && (
                <p className="text-danger text-sm mt-2">Incorrect answer. Please try again.</p>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(5)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(5)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Verify & Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Second Terms & Conditions */}
        {step === 6 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Terms - Financial Impact</h2>
            
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto text-xs text-gray-700 mb-4">
              <h3 className="font-bold mb-2">CANCELLATION POLICY - PART 2 (FINANCIAL TERMS)</h3>
              <p className="mb-2">
                By continuing with this cancellation, you further acknowledge and accept...
              </p>
              <p className="mb-2">
                11. You understand that cancellation is permanent and cannot be undone without creating a new membership.
              </p>
              <p className="mb-2">
                12. Future membership rates may be higher than your current rate, which is a legacy promotional rate.
              </p>
              <p className="mb-2">
                13. You acknowledge losing approximately $300+ in annual benefits including free shipping on over 50 orders.
              </p>
              <p className="mb-2">
                14. Exclusive member-only prices will no longer apply to your account, resulting in potentially higher product costs.
              </p>
              <p className="mb-2">
                15. Priority customer support will be downgraded to standard support with longer wait times.
              </p>
              <p className="mb-2">
                16. You will no longer receive early access to flash sales, new products, or limited-time offers.
              </p>
              <p className="mb-2">
                17. Gift card balances and promotional credits may be forfeited upon cancellation.
              </p>
              <p className="mb-2">
                18. Saved payment methods and express checkout will be disabled for 90 days after cancellation.
              </p>
              <p className="mb-2">
                19. You will be removed from our premium member rewards program and lose all accumulated points.
              </p>
              <p className="mb-2">
                20. Special financing options available only to Premium members will no longer be accessible.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={acceptedTerms[1]}
                onChange={(e) => {
                  const newTerms = [...acceptedTerms];
                  newTerms[1] = e.target.checked;
                  setAcceptedTerms(newTerms);
                }}
                className="w-5 h-5 mt-1"
              />
              <span className="text-sm text-gray-700">
                I understand the financial impact of canceling my Premium membership and accept all terms described above, including the loss of over $300 in annual value. *
              </span>
            </label>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(6)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(6)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Third & Fourth CAPTCHA */}
        {step === 7 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Final Security Verification (3-4 of 4)</h2>
            
            <div className="space-y-6 mb-6">
              <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Verification 3 of 4:</p>
                <div className="bg-white p-4 rounded border-2 border-gray-400">
                  <p className="font-bold text-lg mb-2">{captchaQuestions[2].question}</p>
                  <input
                    type="text"
                    value={captchaAnswers[2]}
                    onChange={(e) => handleCaptchaChange(2, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your answer"
                  />
                </div>
                {captchaAnswers[2] && !verifyCaptcha(2) && (
                  <p className="text-danger text-sm mt-2">Incorrect answer. Please try again.</p>
                )}
              </div>

              <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Verification 4 of 4:</p>
                <div className="bg-white p-4 rounded border-2 border-gray-400">
                  <p className="font-bold text-lg mb-2">{captchaQuestions[3].question}</p>
                  <input
                    type="text"
                    value={captchaAnswers[3]}
                    onChange={(e) => handleCaptchaChange(3, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your answer"
                  />
                </div>
                {captchaAnswers[3] && !verifyCaptcha(3) && (
                  <p className="text-danger text-sm mt-2">Incorrect answer. Please try again.</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(7)}
                className={`flex-1 py-3 rounded-lg transition ${
                  canProceedFromStep(7)
                    ? 'bg-danger text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Verification
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Final Confirmation with Retention Offers */}
        {step === 8 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Wait! One Last Thing...</h2>
            
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4">🎁 Exclusive Retention Offer!</h3>
              <p className="mb-4">
                We'd hate to see you go! As a valued customer, we're offering you:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  50% OFF for the next 3 months ($4.99/month)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  $25 shopping credit
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Extended free trial of Premium Plus features
                </li>
              </ul>
              <button
                onClick={() => {
                  alert('Thank you for staying! Your discount has been applied.');
                  navigate('/profile');
                }}
                className="w-full bg-accent text-gray-800 font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Accept Offer & Keep Membership
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4">Are you absolutely sure you want to cancel?</h3>
              <div className="bg-red-50 border-l-4 border-danger p-4 mb-6">
                <p className="text-sm text-gray-700">
                  ⚠️ This action cannot be easily reversed. You will lose all benefits immediately and may not get the same rate if you return.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigate('/profile');
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold"
                >
                  Keep My Benefits
                </button>
                <button
                  onClick={handleFinalCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition text-sm"
                >
                  Yes, Cancel Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelMembership;

