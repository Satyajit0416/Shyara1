import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust path as per your folder structure
import { useCart } from '../context/CartContext';

function Products() {
  const { addToCart } = useCart();

  // Sample products data (you can replace this with real data from an API)
  const products = [
    { id: 1, name: 'Product 1', price: 299, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 499, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 799, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 999, image: 'https://via.placeholder.com/150' },
  ];

  // State for size and quantity for each product
  const [productOptions, setProductOptions] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = { size: 'M', quantity: 1 }; // Default size and quantity
      return acc;
    }, {})
  );

  const handleSizeChange = (productId, size) => {
    setProductOptions((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], size },
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity < 1) return; // Prevent quantity less than 1
    setProductOptions((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], quantity: newQuantity },
    }));
  };

  const handleAddToCart = (product) => {
    const { size, quantity } = productOptions[product.id];
    addToCart({ ...product, size, quantity });
    alert(`${product.name} (Size: ${size}, Quantity: ${quantity}) added to cart!`);
  };

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
          <h2
            className="text-center mb-5"
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Our Products
          </h2>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div
                  className="card shadow-sm"
                  style={{
                    borderRadius: '15px',
                    border: 'none',
                    transition: 'transform 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title" style={{ color: '#ff3366', fontWeight: 'bold' }}>
                      {product.name}
                    </h5>
                    <p className="card-text" style={{ color: '#333', fontWeight: '500' }}>
                      ₹{product.price}
                    </p>
                    <div className="mb-2">
                      <label htmlFor={`size-${product.id}`} className="form-label" style={{ color: '#333' }}>
                        Size:
                      </label>
                      <select
                        id={`size-${product.id}`}
                        value={productOptions[product.id].size}
                        onChange={(e) => handleSizeChange(product.id, e.target.value)}
                        className="form-select"
                        style={{
                          borderRadius: '10px',
                          borderColor: '#ff3366',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#ffd700')}
                        onBlur={(e) => (e.target.style.borderColor = '#ff3366')}
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`quantity-${product.id}`} className="form-label" style={{ color: '#333' }}>
                        Quantity:
                      </label>
                      <input
                        type="number"
                        id={`quantity-${product.id}`}
                        value={productOptions[product.id].quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        min="1"
                        className="form-control"
                        style={{
                          borderRadius: '10px',
                          borderColor: '#ff3366',
                          transition: 'all 0.3s',
                          width: '100px',
                          margin: '0 auto',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#ffd700')}
                        onBlur={(e) => (e.target.style.borderColor = '#ff3366')}
                      />
                    </div>
                    <button
                      className="btn"
                      onClick={() => handleAddToCart(product)}
                      style={{
                        background: 'linear-gradient(135deg, #ff3366, #ffd700)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        transition: 'all 0.3s',
                      }}
                      onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;