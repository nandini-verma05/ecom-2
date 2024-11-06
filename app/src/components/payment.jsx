import React, { useState } from 'react';
import { X } from "lucide-react";

const Payment = ({ closePayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // Validate payment details here (for demo purposes, this is simple)
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }
    
    // Simulate payment processing (you should integrate with a real payment gateway)
    alert('Payment processed successfully!');
    closePayment(); // Close the payment form after successful payment
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closePayment}></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-md">
        <div className="h-full flex flex-col bg-white shadow-xl">
          <div className="flex items-start justify-between p-6">
            <h2 className="text-2xl font-bold">Payment Information</h2>
            <button onClick={closePayment} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <form className="flex-1 overflow-y-auto p-6" onSubmit={handlePayment}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
