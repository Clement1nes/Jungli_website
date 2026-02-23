import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function Shop() {
  const navigate = useNavigate();

  // Hardcoded product data matching ProductDetail
  const products = [
    {
      id: 'eye',
      name: 'Eye Ring',
      price: '$140',
      image: '/assets/Highdef/eye face gold.png'
    },
    {
      id: 'star',
      name: 'Star Ring',
      price: '$160',
      image: '/assets/Highdef/gold star front.png'
    },
    {
      id: 'foot',
      name: 'Foot Ring',
      price: '$150',
      image: '/assets/Highdef/gold foot up.png'
    },
    {
      id: 'sizer',
      name: 'Ring Sizer',
      price: 'Free + Postage',
      image: '/assets/placeholder.jpg'
    }
  ];

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
            {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  style={{
                    border: '2px solid rgba(255, 245, 218, 0.2)',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 245, 218, 0.03)',
                    backdropFilter: 'blur(10px)',
                    transform: `rotate(${Math.random() * 4 - 2}deg)`,
                    cursor: 'pointer'
                  }}
                  initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{
                    scale: 1.03,
                    rotate: Math.random() * 6 - 3,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
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
                    marginBottom: '0.5rem',
                    color: '#FFF5DA'
                  }}>{product.name}</h3>

                  <p style={{
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1.2rem',
                    marginBottom: '1rem',
                    color: '#D4AF37'
                  }}>{product.price}</p>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
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
                    View Details
                  </motion.button>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;
