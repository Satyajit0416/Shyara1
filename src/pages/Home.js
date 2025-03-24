import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(location.state?.showProducts || false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from Firestore...');
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched products:', productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.showProducts) {
      setShowProducts(true);
    }
  }, [location.state]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || product.category === category)
  );

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const handleShopNowClick = () => {
    setShowProducts(true);
  };

  return (
    <div>
      <Header />
      <div
        className="min-vh-100"
        style={{
          background: showProducts ? '#f5f5f5' : 'linear-gradient(135deg, #ff3366, #ffd700)', // Gradient for welcome, light for products
          padding: '20px',
        }}
      >
        <div className="container">
          {/* Welcome Section */}
          <div
            className={`text-center mb-5 ${showProducts ? 'slide-up' : ''}`}
            style={{
              transition: 'transform 0.5s ease-in-out',
              transform: showProducts ? 'translateY(-50px)' : 'translateY(0)',
            }}
          >
            <h1
              className="display-4 mb-4"
              style={{
                color: showProducts ? '#ff3366' : '#fff', // White for welcome, pink for products view
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Welcome to Shyara{user ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            {!showProducts && (
              <>
                <p
                  className="lead mb-5"
                  style={{ color: '#fff', maxWidth: '600px', margin: '0 auto' }}
                >
                  Discover the best products at unbeatable prices. Shop now and enjoy a seamless shopping experience!
                </p>
                <button
                  onClick={handleShopNowClick}
                  className="btn btn-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff3366, #ffd700)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    padding: '12px 30px',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Shop Now
                </button>
              </>
            )}
          </div>

          {/* Products Section */}
          {showProducts && (
            <div
              className="fade-in"
              style={{
                animation: 'fadeIn 0.5s ease-in-out',
              }}
            >
              <div className="row mb-4 justify-content-center">
                <div className="col-md-5 mb-3">
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      borderRadius: '25px',
                      padding: '12px 20px',
                      border: '2px solid #ff3366',
                      transition: 'all 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ffd700')}
                    onBlur={(e) => (e.target.style.borderColor = '#ff3366')}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <select
                    className="form-select shadow-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      borderRadius: '25px',
                      padding: '12px 20px',
                      border: '2px solid #ff3366',
                      transition: 'all 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ffd700')}
                    onBlur={(e) => (e.target.style.borderColor = '#ff3366')}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row g-4">
                {loading ? (
                  <p
                    className="text-center fw-bold"
                    style={{ color: '#ff3366', fontSize: '1.5rem' }}
                  >
                    Loading products...
                  </p>
                ) : products.length === 0 ? (
                  <p
                    className="text-center fw-bold"
                    style={{ color: '#ff3366', fontSize: '1.5rem' }}
                  >
                    No products found in Firestore
                  </p>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p
                    className="text-center fw-bold"
                    style={{ color: '#ff3366', fontSize: '1.5rem' }}
                  >
                    No products match your search
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .slide-up {
            transform: translateY(-50px);
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
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default Home;