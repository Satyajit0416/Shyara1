import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || 'S'); // Default size 'S'

  const handleAddClick = (e) => {
    e.preventDefault();
    setShowQuantity(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleConfirmAdd = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity, size: selectedSize });
    setShowQuantity(false);
    setQuantity(1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity, size: selectedSize });
    navigate('/checkout');
    setShowQuantity(false);
    setQuantity(1);
  };

  // Default sizes agar product.size nahi hai
  const sizes = product.size && product.size.length > 0 ? product.size : ['S', 'M', 'L'];

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img
            src={product.image || 'https://via.placeholder.com/150'}
            className="card-img-top"
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ color: '#ff3366', fontWeight: 'bold' }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#ff3366' }}>
              {product.name}
            </Link>
          </h5>
          <p className="card-text" style={{ color: '#666' }}>{product.description}</p>
          <p className="card-text fw-bold" style={{ color: '#333' }}>₹{product.price}</p>
          {!showQuantity ? (
            <div className="d-flex justify-content-between">
              <button
                className="btn w-50 me-2"
                style={{ background: '#ff3366', color: 'white', borderRadius: '10px', fontWeight: 'bold', transition: 'all 0.3s' }}
                onClick={handleAddClick}
                onMouseOver={(e) => e.target.style.background = '#e62e5c'}
                onMouseOut={(e) => e.target.style.background = '#ff3366'}
              >
                Add to Cart
              </button>
              <button
                className="btn w-50"
                style={{ background: '#33cc99', color: 'white', borderRadius: '10px', fontWeight: 'bold', transition: 'all 0.3s' }}
                onClick={handleBuyNow}
                onMouseOver={(e) => e.target.style.background = '#2bb580'}
                onMouseOut={(e) => e.target.style.background = '#33cc99'}
              >
                Buy Now
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <span className="mx-2 fw-bold">{quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
              <select
                className="form-select form-select-sm mx-2"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ maxWidth: '100px' }}
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <div>
                <button
                  className="btn btn-success btn-sm ms-2"
                  onClick={handleConfirmAdd}
                  style={{ borderRadius: '10px' }}
                >
                  Add
                </button>
                <button
                  className="btn btn-primary btn-sm ms-2"
                  onClick={handleBuyNow}
                  style={{ background: '#33cc99', borderColor: '#33cc99', borderRadius: '10px', transition: 'all 0.3s' }}
                  onMouseOver={(e) => e.target.style.background = '#2bb580'}
                  onMouseOut={(e) => e.target.style.background = '#33cc99'}
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;