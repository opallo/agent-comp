'use client';
import { useState } from 'react';

const CheckoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 1, // You can make this dynamic based on user input
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect user to Stripe Checkout page
      } else {
        console.error('Error creating checkout session:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  );
};

export default CheckoutButton;