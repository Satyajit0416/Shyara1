import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { updateProfile } from 'firebase/auth';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed! Please try again.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updateProfile(user, { displayName });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Profile</h2>
        <div className="w-50 mx-auto">
          {/* Profile Card */}
          <div className="card p-4 shadow-sm">
            <div className="text-center mb-4">
              <img
                src={user.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4>{user.displayName || 'User'}</h4>
            </div>

            {/* User Details */}
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              ) : (
                <p>{user.displayName || 'Not set'}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <p>{user.email || 'Not set'}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Phone Number</label>
              <p>{user.phoneNumber || 'Not set'}</p>
            </div>

            {/* Success/Error Messages */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Edit/Save Button */}
            <div className="d-flex justify-content-between mb-3">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateProfile}
                    disabled={!displayName.trim()}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(user.displayName || '');
                      setError('');
                      setSuccess('');
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Logout Button */}
            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;