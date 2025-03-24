import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mockOtp, setMockOtp] = useState(''); // For mock OTP flow
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Email/Password Login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('No user found. Please signup first.');
      return;
    }
    if (storedUser.email !== formData.email || storedUser.password !== formData.password) {
      setError('Invalid email or password.');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
    alert('Login successful!');
    navigate('/');
  };

  // Handle Mobile Number Submission
  const handleMobileSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number starting with 6-9.');
      return;
    }

    // Simulate OTP generation (in real scenario, this would be sent via SMS gateway)
    const generatedOtp = '1234'; // Mock OTP
    setMockOtp(generatedOtp);
    setOtpSent(true);
    alert(`Your OTP is: ${generatedOtp} (This is a mock OTP. In a real app, it will be sent to your mobile.)`);
  };

  // Handle OTP Verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (formData.otp !== mockOtp) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    // Simulate user lookup (in real scenario, you'd check if mobile number exists in your database)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('No user found. Please signup first.');
      return;
    }

    // For demo, we're assuming mobile number login is successful
    localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
    alert('Login successful with mobile number!');
    setShowMobileModal(false);
    setOtpSent(false);
    setFormData({ ...formData, mobile: '', otp: '' });
    navigate('/');
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #ff3366, #ffd700)',
      }}
    >
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', border: 'none' }}>
        <h2 className="text-center mb-4" style={{ color: '#ff3366', fontWeight: 'bold' }}>
          Login
        </h2>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-3 position-relative">
            <label htmlFor="email" className="form-label" style={{ color: '#333' }}>
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                <i className="bi bi-envelope" style={{ color: '#ff3366' }}></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
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
            <label htmlFor="password" className="form-label" style={{ color: '#333' }}>
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                <i className="bi bi-lock" style={{ color: '#ff3366' }}></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
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
          <button
            type="submit"
            className="btn w-100 mb-3"
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
            Login
          </button>
        </form>

        {/* Login with Mobile Button Below the Form */}
        <button
          className="btn w-100"
          onClick={() => setShowMobileModal(true)}
          style={{
            background: 'linear-gradient(135deg, #ffd700, #ff3366)',
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
          <i className="bi bi-phone me-2"></i> Login with Mobile
        </button>

        <p className="text-center mt-3" style={{ color: '#333' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#ff3366', textDecoration: 'none' }}>
            Signup
          </Link>
        </p>
      </div>

      {/* Mobile Login Modal */}
      {showMobileModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => {
            setShowMobileModal(false);
            setOtpSent(false);
            setError('');
            setFormData({ ...formData, mobile: '', otp: '' });
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: '15px', border: 'none' }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#ff3366', fontWeight: 'bold' }}>
                  Login with Mobile Number
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowMobileModal(false);
                    setOtpSent(false);
                    setError('');
                    setFormData({ ...formData, mobile: '', otp: '' });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
                {!otpSent ? (
                  <form onSubmit={handleMobileSubmit}>
                    <div className="mb-3 position-relative">
                      <label htmlFor="mobile" className="form-label" style={{ color: '#333' }}>
                        Mobile Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                          <i className="bi bi-phone" style={{ color: '#ff3366' }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g., 9876543210"
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
                    <button
                      type="submit"
                      className="btn w-100"
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
                      Send OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mb-3 position-relative">
                      <label htmlFor="otp" className="form-label" style={{ color: '#333' }}>
                        Enter OTP
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                          <i className="bi bi-shield-lock" style={{ color: '#ff3366' }}></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="otp"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="e.g., 1234"
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
                    <button
                      type="submit"
                      className="btn w-100"
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
                      Verify OTP
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;