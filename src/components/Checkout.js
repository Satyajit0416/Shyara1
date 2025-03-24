import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'COD',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
  });

  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // For UPI payment status
  const [isProcessing, setIsProcessing] = useState(false); // For loading state

  // Handler for card number formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);

    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += '-';
      }
      formattedValue += value[i];
    }

    setFormData({ ...formData, cardNumber: formattedValue });
  };

  // Handler for expiry date formatting
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);

    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 2 && value.length > 2) {
        formattedValue += '/';
      }
      formattedValue += value[i];
    }

    setFormData({ ...formData, expiry: formattedValue });
  };

  // Handler for CVV formatting
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 3);
    setFormData({ ...formData, cvv: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simulate UPI payment processing
  const processUpiPayment = async (upiId) => {
    setIsProcessing(true);
    setPaymentStatus(null);

    // Simulate API call to payment gateway (e.g., Paytm, Razorpay)
    // In a real scenario, you'd call the payment gateway's API to initiate a UPI collect request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success/failure (70% success rate for demo)
        const isSuccess = Math.random() > 0.3;
        setIsProcessing(false);
        if (isSuccess) {
          setPaymentStatus('success');
          resolve(true);
        } else {
          setPaymentStatus('failure');
          setError('UPI payment failed. Please try again.');
          resolve(false);
        }
      }, 3000); // Simulate 3-second processing time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPaymentStatus(null);

    // Validation for shipping details
    if (!formData.name || !formData.address || !formData.city || !formData.zip) {
      setError('Please fill in all shipping details.');
      return;
    }

    if (formData.paymentMethod === 'Card') {
      const cardNumberDigits = formData.cardNumber.replace(/\D/g, '');
      if (!formData.cardNumber || cardNumberDigits.length !== 16) {
        setError('Card number must be 16 digits.');
        return;
      }
      if (!formData.expiry || formData.expiry.length !== 5) {
        setError('Expiry date must be in MM/YY format.');
        return;
      }
      const [month, year] = formData.expiry.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (month < 1 || month > 12) {
        setError('Month must be between 01 and 12.');
        return;
      }
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setError('Card has expired. Please use a valid card.');
        return;
      }
      if (!formData.cvv || formData.cvv.length !== 3) {
        setError('CVV must be 3 digits.');
        return;
      }
    }

    if (formData.paymentMethod === 'UPI') {
      if (!formData.upiId) {
        setError('Please enter your UPI ID.');
        return;
      }
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiRegex.test(formData.upiId)) {
        setError('Please enter a valid UPI ID (e.g., example@upi).');
        return;
      }

      // Process UPI payment
      const paymentSuccess = await processUpiPayment(formData.upiId);
      if (!paymentSuccess) {
        return; // Stop if payment failed
      }
    }

    // Simulate order placement
    alert(`Order placed successfully with ${formData.paymentMethod}!`);
    clearCart();
    navigate('/');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div
        className="min-vh-100"
        style={{
          background: 'linear-gradient(135deg, #ff3366, #ffd700)',
          padding: '40px 20px',
        }}
      >
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
            Checkout
          </h2>
          {error && (
            <div className="alert alert-danger text-center animate-form" role="alert">
              {error}
            </div>
          )}
          {isProcessing && (
            <div className="alert alert-info text-center animate-form" role="alert">
              Processing your UPI payment... Please wait.
              <div className="spinner-border spinner-border-sm ms-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {paymentStatus === 'success' && (
            <div className="alert alert-success text-center animate-form" role="alert">
              UPI payment successful! Completing your order...
            </div>
          )}
          {paymentStatus === 'failure' && (
            <div className="alert alert-danger text-center animate-form" role="alert">
              UPI payment failed. Please try again.
            </div>
          )}
          <div className="row">
            {/* Checkout Form */}
            <div className="col-lg-6 mb-4">
              <div className="card p-4 shadow-lg animate-form" style={{ borderRadius: '15px', border: 'none' }}>
                <h4 className="mb-4" style={{ color: '#ff3366', fontWeight: 'bold' }}>
                  Shipping Details
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <label htmlFor="name" className="form-label" style={{ color: '#333' }}>
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <i className="bi bi-person" style={{ color: '#ff3366' }}></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          borderLeft: 'none',
                          borderRadius: '0 10px 10px 0',
                          paddingLeft: '0',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                        onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                      />
                    </div>
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="address" className="form-label" style={{ color: '#333' }}>
                      Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <i className="bi bi-house-door" style={{ color: '#ff3366' }}></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={{
                          borderLeft: 'none',
                          borderRadius: '0 10px 10px 0',
                          paddingLeft: '0',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                        onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3 position-relative">
                      <label htmlFor="city" className="form-label" style={{ color: '#333' }}>
                        City
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                          <i className="bi bi-geo-alt" style={{ color: '#ff3366' }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: 'none',
                            borderRadius: '0 10px 10px 0',
                            paddingLeft: '0',
                            transition: 'all 0.3s',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                          onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3 position-relative">
                      <label htmlFor="zip" className="form-label" style={{ color: '#333' }}>
                        ZIP Code
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                          <i className="bi bi-mailbox" style={{ color: '#ff3366' }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: 'none',
                            borderRadius: '0 10px 10px 0',
                            paddingLeft: '0',
                            transition: 'all 0.3s',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                          onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <h4 className="mb-4" style={{ color: '#ff3366', fontWeight: 'bold' }}>
                    Payment Method
                  </h4>
                  <div className="mb-4">
                    <div className="d-flex flex-wrap gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="cod"
                          value="COD"
                          checked={formData.paymentMethod === 'COD'}
                          onChange={handleChange}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label" htmlFor="cod" style={{ color: '#333', cursor: 'pointer' }}>
                          <i className="bi bi-cash-stack me-2" style={{ color: '#ff3366' }}></i> Cash on Delivery (COD)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="upi"
                          value="UPI"
                          checked={formData.paymentMethod === 'UPI'}
                          onChange={handleChange}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label" htmlFor="upi" style={{ color: '#333', cursor: 'pointer' }}>
                          <i className="bi bi-phone me-2" style={{ color: '#ff3366' }}></i> UPI
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="card"
                          value="Card"
                          checked={formData.paymentMethod === 'Card'}
                          onChange={handleChange}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label" htmlFor="card" style={{ color: '#333', cursor: 'pointer' }}>
                          <i className="bi bi-credit-card me-2" style={{ color: '#ff3366' }}></i> Credit/Debit Card
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card Details (Show only if Card is selected) */}
                  {formData.paymentMethod === 'Card' && (
                    <>
                      <div className="mb-3 position-relative">
                        <label htmlFor="cardNumber" className="form-label" style={{ color: '#333' }}>
                          Card Number
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                            <i className="bi bi-credit-card" style={{ color: '#ff3366' }}></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234-5678-9012-3456"
                            required={formData.paymentMethod === 'Card'}
                            style={{
                              borderLeft: 'none',
                              borderRadius: '0 10px 10px 0',
                              paddingLeft: '0',
                              transition: 'all 0.3s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                            onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3 position-relative">
                          <label htmlFor="expiry" className="form-label" style={{ color: '#333' }}>
                            Expiry Date (MM/YY)
                          </label>
                          <div className="input-group">
                            <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                              <i className="bi bi-calendar" style={{ color: '#ff3366' }}></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="expiry"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              required={formData.paymentMethod === 'Card'}
                              style={{
                                borderLeft: 'none',
                                borderRadius: '0 10px 10px 0',
                                paddingLeft: '0',
                                transition: 'all 0.3s',
                              }}
                              onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                              onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3 position-relative">
                          <label htmlFor="cvv" className="form-label" style={{ color: '#333' }}>
                            CVV
                          </label>
                          <div className="input-group">
                            <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                              <i className="bi bi-lock" style={{ color: '#ff3366' }}></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleCvvChange}
                              placeholder="123"
                              required={formData.paymentMethod === 'Card'}
                              style={{
                                borderLeft: 'none',
                                borderRadius: '0 10px 10px 0',
                                paddingLeft: '0',
                                transition: 'all 0.3s',
                              }}
                              onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                              onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* UPI Details (Show only if UPI is selected) */}
                  {formData.paymentMethod === 'UPI' && (
                    <div className="mb-3 position-relative">
                      <label htmlFor="upiId" className="form-label" style={{ color: '#333' }}>
                        UPI ID
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                          <i className="bi bi-phone" style={{ color: '#ff3366' }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="upiId"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleChange}
                          placeholder="example@upi"
                          required={formData.paymentMethod === 'UPI'}
                          style={{
                            borderLeft: 'none',
                            borderRadius: '0 10px 10px 0',
                            paddingLeft: '0',
                            transition: 'all 0.3s',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#ff3366')}
                          onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                        />
                      </div>
                      <small className="form-text text-muted">
                        Enter your UPI ID (e.g., yourname@upi). You'll receive a payment request on your UPI app.
                      </small>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn w-100"
                    disabled={isProcessing}
                    style={{
                      background: 'linear-gradient(135deg, #ff3366, #ffd700)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      padding: '12px',
                      transition: 'all 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              </div>
            </div>
            {/* Order Summary */}
            <div className="col-lg-6 mb-4">
              <div className="card p-4 shadow-lg animate-form" style={{ borderRadius: '15px', border: 'none' }}>
                <h4 className="mb-4" style={{ color: '#ff3366', fontWeight: 'bold' }}>
                  Order Summary
                </h4>
                {cart.length === 0 ? (
                  <p className="text-center" style={{ color: '#666' }}>
                    Your cart is empty.
                  </p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '15px' }}
                          />
                          <div>
                            <h6 className="mb-0" style={{ color: '#333' }}>{item.name}</h6>
                            <small style={{ color: '#666' }}>
                              {item.quantity} x ₹{item.price}
                            </small>
                          </div>
                        </div>
                        <span style={{ color: '#ff3366', fontWeight: 'bold' }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5 style={{ color: '#333', fontWeight: 'bold' }}>Total</h5>
                      <h5 style={{ color: '#ff3366', fontWeight: 'bold' }}>₹{totalPrice}</h5>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animation */}
      <style>
        {`
          .animate-form {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Checkout;