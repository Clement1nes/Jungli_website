import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/shopify';
import { useShopify } from '../context/ShopifyContext';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { buyNow, addItemToCart } = useShopify();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchProducts();
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '120px' }}>
        <section className="content-section">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '3rem',
              fontWeight: 'normal',
              color: '#FFF5DA'
            }}>Loading products...</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '120px' }}>
      <section className="content-section">
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: "'Evil Green Plant', serif",
            fontSize: '3rem',
            fontWeight: 'normal',
            textAlign: 'center',
            marginBottom: '3rem',
            transform: 'rotate(-1deg)',
            color: '#FFF5DA'
          }}>Shop</h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem'
          }}>
            {products.map((product, index) => {
              const variant = product.variants[0];
              const price = variant.price.amount;
              const currencyCode = variant.price.currencyCode;
              const imageUrl = product.images[0]?.src || '/assets/placeholder.jpg';

              return (
                <motion.div
                  key={product.id}
                  style={{
                    border: '2px solid rgba(255, 245, 218, 0.2)',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 245, 218, 0.03)',
                    backdropFilter: 'blur(10px)',
                    transform: `rotate(${Math.random() * 4 - 2}deg)`
                  }}
                  initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{
                    scale: 1.03,
                    rotate: Math.random() * 6 - 3,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: 'rgba(10, 10, 10, 0.5)',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 245, 218, 0.1)'
                  }}>
                    <img
                      src={imageUrl}
                      alt={product.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  <h3 style={{
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1.5rem',
                    fontWeight: 'normal',
                    marginBottom: '0.5rem',
                    color: '#FFF5DA'
                  }}>{product.title}</h3>

                  <p style={{
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1.2rem',
                    marginBottom: '1rem',
                    color: '#D4AF37'
                  }}>{currencyCode === 'USD' ? '$' : ''}{price}</p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <motion.button
                      onClick={async () => {
                        try {
                          await buyNow(variant.id, 1);
                        } catch (error) {
                          console.error('Error purchasing:', error);
                          alert('Error processing purchase. Please try again.');
                        }
                      }}
                      style={{
                        fontFamily: "'Evil Green Plant', serif",
                        fontSize: '1rem',
                        padding: '0.8rem',
                        backgroundColor: '#8faf70',
                        color: '#0A0A0A',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'normal',
                        width: '100%'
                      }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                    </motion.button>

                    <motion.button
                      onClick={async () => {
                        try {
                          await addItemToCart(variant.id, 1);
                          alert('Added to cart!');
                        } catch (error) {
                          console.error('Error adding to cart:', error);
                          alert('Error adding to cart. Please try again.');
                        }
                      }}
                      style={{
                        fontFamily: "'Evil Green Plant', serif",
                        fontSize: '1rem',
                        padding: '0.8rem',
                        backgroundColor: 'transparent',
                        color: '#FFF5DA',
                        border: '2px solid rgba(255, 245, 218, 0.3)',
                        cursor: 'pointer',
                        fontWeight: 'normal'
                      }}
                      whileHover={{
                        scale: 1.05,
                        rotate: -1,
                        backgroundColor: 'rgba(255, 245, 218, 0.1)',
                        borderColor: '#8faf70',
                        color: '#8faf70'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Basket
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;
