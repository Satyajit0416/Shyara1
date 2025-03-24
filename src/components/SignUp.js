import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username) {
      setError('Please enter a username.');
      return;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Simulate signup (store user data in localStorage)
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signup successful! Please login.');
    navigate('/login');
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
          Signup
        </h2>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label htmlFor="username" className="form-label" style={{ color: '#333' }}>
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#fff', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                <i className="bi bi-person-circle" style={{ color: '#ff3366' }}></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
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
            Signup
          </button>
        </form>
        <p className="text-center mt-3" style={{ color: '#333' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff3366', textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;