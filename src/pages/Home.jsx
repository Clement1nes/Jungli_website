import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const products = [
    {
      id: 'eye',
      name: 'Eye Ring',
      price: '$140',
      description: 'Mesmerizing eye ring with intricate detail and symbolic design. Available in gold and silver.',
      goldImage: '/assets/silver_eye.gif',
      silverImage: '/assets/silver_eye.gif',
      background: '/assets/backgrounds/eye_background.gif',
      alt: 'Eye Ring',
      type: 'eye'
    },
    {
      id: 'star',
      name: 'Star Ring',
      price: '$160',
      description: 'Celestial shooting star ring. A dynamic piece that brings cosmic energy and movement to your collection.',
      goldImage: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      silverImage: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      background: '/assets/backgrounds/star_background.gif',
      alt: 'Star Ring',
      type: 'star'
    },
    {
      id: 'foot',
      name: 'Foot Ring',
      price: '$150',
      description: 'Handcrafted sculptural foot ring. A bold statement piece that celebrates anatomical beauty and artistic form.',
      goldImage: '/assets/ezgif.com-coalesce.gif',
      silverImage: '/assets/ezgif.com-coalesce.gif',
      background: '/assets/backgrounds/foot_background.gif',
      alt: 'Foot Ring',
      type: 'foot'
    }
  ];

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <main className="home-container">
      {/* Animated Environment Background */}
      <div className="environment-background">
        <img
          src="/assets/Background.gif"
          alt=""
          className="background-gif-layer"
        />
      </div>

      {/* Hero Section with Main Gold Foot */}
      <section className="hero-section">
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={() => handleProductClick(products[0])}
        >
          <img
            src="/assets/mainfront.gif"
            alt="Main Ring"
            className="hero-image"
          />
        </motion.div>
      </section>

      {/* Floating Products Section */}
      <section className="products-showcase">
        <motion.h2
          className="showcase-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Our Collection
        </motion.h2>

        <div className="floating-products">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-float"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2 + (index * 0.1),
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              onClick={() => handleProductClick(product)}
            >
              <div className="product-float-inner">
                <img
                  src={product.goldImage}
                  alt={product.alt}
                  className="product-image"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default Home;
