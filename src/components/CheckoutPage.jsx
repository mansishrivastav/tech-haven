import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    cardDetails: '',
  });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    cardDetails: '',
  });

 
  const { cartItems } = useSelector((state) => state.cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!userInfo.name) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!userInfo.cardDetails) {
      errors.cardDetails = 'Card number is required.';
      isValid = false;
    }

  
    if (userInfo.name && userInfo.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
      isValid = false;
    }

    if (userInfo.cardDetails && !/^\d{1,16}$/.test(userInfo.cardDetails)) {
      errors.cardDetails = 'Card number should not exceed 16 digits and must be numeric.';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fix the errors in the form.');
      return;
    }

    setErrorMessage('');
    setShowOrderSummary(true);
  };

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold text-center mb-8">Checkout</h3>
      {showOrderSummary ? (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Order Summary</h2>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Name: </strong> {userInfo.name}
            </p>
            <p className="text-gray-700">
              <strong>Address: </strong> {userInfo.address}
            </p>
          </div>
          <h3 className="text-lg">Order Details</h3>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold text-gray-900 mb-4">Total: ${calculateTotal()}</p>
        </div>
      ) : (
        <form
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm">{validationErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardDetails"
              className="block text-gray-700 font-medium mb-2"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardDetails"
              name="cardDetails"
              value={userInfo.cardDetails}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
            {validationErrors.cardDetails && (
              <p className="text-red-500 text-sm">{validationErrors.cardDetails}</p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition-colors duration-200"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
