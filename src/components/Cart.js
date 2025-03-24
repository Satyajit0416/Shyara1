import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Header from './Header';

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + price * quantity;
  }, 0);

  const handleQuantityChange = (id, size, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity, 10) || 0;
    if (parsedQuantity < 1) {
      const shouldRemove = window.confirm('Do you want to remove this item from the cart?');
      if (shouldRemove) updateQuantity(id, 0, size);
    } else {
      updateQuantity(id, parsedQuantity, size);
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#8B1E3F', fontWeight: 'bold' }}>
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-center">
            Your cart is empty! <Link to="/">Shop now</Link>
          </p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="card mb-3"
                style={{
                  borderRadius: '15px',
                  border: '2px solid #FFC107',
                  padding: '10px',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 style={{ color: '#8B1E3F' }}>
                      {item.name} (Size: {item.size})
                    </h5>
                    <p className="mb-0">
                      ₹{parseFloat(item.price) || 0} x{' '}
                      <button
                        className="btn btn-outline-secondary btn-sm mx-1"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            (parseInt(item.quantity, 10) || 0) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">
                        {parseInt(item.quantity, 10) || 0}
                      </span>
                      <button
                        className="btn btn-outline-secondary btn-sm mx-1"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            (parseInt(item.quantity, 10) || 0) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span style={{ color: '#8B1E3F', marginRight: '10px' }}>
                      ₹{(parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0)}
                    </span>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: '#FF3366',
                        color: 'white',
                        borderRadius: '10px',
                      }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-end align-items-center mt-4">
              <h5 className="me-3" style={{ color: '#8B1E3F' }}>
                TOTAL: ₹{total.toFixed(2)}
              </h5>
              <Link
                to="/checkout"
                className="btn"
                style={{
                  background: '#FF3366',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '10px 20px',
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;