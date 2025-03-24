import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // Default null, product load hone pe set hoga

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id));
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          setProduct(productData);
          setSelectedSize(productData.size[0]); // Default size pehla option
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddClick = () => {
    setShowQuantity(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleConfirmAdd = () => {
    addToCart({ ...product, quantity, size: selectedSize });
    setShowQuantity(false);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, size: selectedSize });
    navigate('/checkout');
    setShowQuantity(false);
    setQuantity(1);
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!product) return <div className="text-center py-5">Product not found!</div>;

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div style={{ height: '400px', overflow: 'hidden', borderRadius: '10px' }}>
              <img
                src={product.image}
                className="img-fluid"
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{product.name}</h1>
            <p className="text-muted">{product.description}</p>
            <p className="fs-4">₹{product.price}</p>
            <p className="text-muted">Category: {product.category}</p>
            <p className="text-muted">Color: {product.color}</p>
            <p className="text-muted">Sizes: {product.size.join(', ')}</p>
            {!showQuantity ? (
              <div className="d-flex justify-content-start">
                <button
                  onClick={handleAddClick}
                  className="btn btn-primary me-2"
                  style={{ background: '#ff3366', borderColor: '#ff3366', transition: 'all 0.3s', borderRadius: '10px' }}
                  onMouseOver={(e) => e.target.style.background = '#e62e5c'}
                  onMouseOut={(e) => e.target.style.background = '#ff3366'}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary"
                  style={{ background: '#33cc99', borderColor: '#33cc99', transition: 'all 0.3s', borderRadius: '10px' }}
                  onMouseOver={(e) => e.target.style.background = '#2bb580'}
                  onMouseOut={(e) => e.target.style.background = '#33cc99'}
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center flex-wrap">
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
                  {product.size.map((size) => (
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
    </div>
  );
}

export default ProductDetail;