import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Shop() {
  // Placeholder products - will be replaced with Shopify integration
  const products = [
    { id: 1, name: 'Silver Eye Ring', price: '$120', image: '/assets/silver_eye.gif' },
    { id: 2, name: 'Gold Shooting Star', price: '$150', image: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif' },
    { id: 3, name: 'Anatomy Ring', price: '$130', image: '/assets/ezgif.com-coalesce.gif' },
    { id: 4, name: 'Gold Eye Ring', price: '$140', image: '/assets/Gold Eye Ring.mov' },
    { id: 5, name: 'Silver Shooting Star', price: '$145', image: '/assets/Silver Shooting Star.mov' },
    { id: 6, name: 'Mystery Piece', price: '$160', image: '/assets/ezgif.com-gif-maker.gif' },
  ];

  return (
    <main>
      <section className="content-section">
        <div style={{ padding: '2rem' }}>
          <h1 style={{
            fontFamily: "'Evil Green Plant', serif",
            fontSize: '3rem',
            fontWeight: 'normal',
            textAlign: 'center',
            marginBottom: '3rem',
            transform: 'rotate(-1deg)'
          }}>Shop</h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem'
          }}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                style={{
                  border: '2px solid #222',
                  padding: '1.5rem',
                  backgroundColor: '#F8F5F2',
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
                  backgroundColor: '#fff',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
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
                  marginBottom: '0.5rem'
                }}>{product.name}</h3>

                <p style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  color: '#666'
                }}>{product.price}</p>

                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <motion.button
                      style={{
                        fontFamily: "'Evil Green Plant', serif",
                        fontSize: '1rem',
                        padding: '0.8rem',
                        backgroundColor: '#222',
                        color: '#F8F5F2',
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
                  </Link>

                  <motion.button
                    style={{
                      fontFamily: "'Evil Green Plant', serif",
                      fontSize: '1rem',
                      padding: '0.8rem',
                      backgroundColor: 'transparent',
                      color: '#222',
                      border: '2px solid #222',
                      cursor: 'pointer',
                      fontWeight: 'normal'
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: -1,
                      backgroundColor: '#222',
                      color: '#F8F5F2'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Basket
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;
