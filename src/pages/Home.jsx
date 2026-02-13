import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const products = [
    {
      id: 'foot',
      name: 'Foot Ring',
      price: '$150',
      description: 'A reminder of the steps taken and the steps to come…',
      goldImage: '/assets/ezgif.com-coalesce.gif',
      silverImage: '/assets/ezgif.com-coalesce.gif',
      background: '/assets/backgrounds/foot_background.gif',
      alt: 'Foot Ring',
      type: 'foot'
    },
    {
      id: 'star',
      name: 'Star Ring',
      price: '$160',
      description: 'When you Shoot for the stars remember we were made from them.',
      goldImage: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      silverImage: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      background: '/assets/backgrounds/star_background.gif',
      alt: 'Star Ring',
      type: 'star'
    },
    {
      id: 'eye',
      name: 'Eye Ring',
      price: '$140',
      description: 'We look with Two Eyes but see with Three…',
      goldImage: '/assets/silver_eye.gif',
      silverImage: '/assets/silver_eye.gif',
      background: '/assets/backgrounds/eye_background.gif',
      alt: 'Eye Ring',
      type: 'eye'
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

      {/* Floating Products Section */}
      <section className="products-showcase">
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
