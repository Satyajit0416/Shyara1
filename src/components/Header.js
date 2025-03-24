import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Check if user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #ff3366, #ffd700)',
        padding: '15px 0',
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          Shyara
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.color = '#fff')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.color = '#fff')}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link position-relative"
                to="/cart"
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.color = '#fff')}
              >
                <i className="bi bi-cart"></i> Cart
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              {loggedInUser ? (
                <button
                  className="nav-link btn"
                  onClick={handleLogout}
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                  onMouseOut={(e) => (e.target.style.color = '#fff')}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="nav-link"
                  to="/login"
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    transition: 'color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                  onMouseOut={(e) => (e.target.style.color = '#fff')}
                >
                  Login
                </Link>
              )}
            </li>
            {!loggedInUser && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signup"
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    transition: 'color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#f0f0f0')}
                  onMouseOut={(e) => (e.target.style.color = '#fff')}
                >
                  Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;