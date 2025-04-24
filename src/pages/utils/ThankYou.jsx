import React, { useEffect } from 'react';

const ThankYouPage = () => {
  useEffect(() => {
    // Attempt to close the window after a short delay
    const timer = setTimeout(() => {
      window.close();
    }, 3000); // Give them 3 seconds to see the message

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold">Thank You!</h2>
      <p className="mt-4">Your response has been received.</p>
      <p className="mt-2">This window will close automatically in a few seconds.</p>
      <p className="mt-2"> If not, please close this tab</p>
    </div>
  );
};

export default ThankYouPage;
