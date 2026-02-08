import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Gallery.css';

function Gallery() {
  const navigate = useNavigate();

  const galleryItems = [
    {
      id: 'eye',
      name: 'Eye Ring',
      image: '/assets/silver_eye.gif',
      alt: 'Eye Ring Animation'
    },
    {
      id: 'star',
      name: 'Star Ring',
      image: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      alt: 'Star Ring Animation'
    },
    {
      id: 'foot',
      name: 'Foot Ring',
      image: '/assets/ezgif.com-coalesce.gif',
      alt: 'Foot Ring Animation'
    },
    {
      id: 'eye-static',
      name: 'Eye Ring Detail',
      image: '/assets/Highdef/eye face gold.png',
      alt: 'Eye Ring Close-up'
    },
    {
      id: 'star-static',
      name: 'Star Ring Detail',
      image: '/assets/Highdef/gold star front.png',
      alt: 'Star Ring Close-up'
    },
    {
      id: 'foot-static',
      name: 'Foot Ring Detail',
      image: '/assets/Highdef/gold foot up.png',
      alt: 'Foot Ring Close-up'
    }
  ];

  const handleItemClick = (item) => {
    // If it's a product, navigate to product detail
    if (item.id === 'eye' || item.id === 'star' || item.id === 'foot') {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <main className="gallery-container">
      {/* Animated Environment Background */}
      <div className="environment-background">
        <img
          src="/assets/Background.gif"
          alt=""
          className="background-gif-layer"
        />
      </div>

      <section className="gallery-content">
        <motion.h1
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gallery
        </motion.h1>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="gallery-item-inner">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="gallery-image"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-name">{item.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Gallery;
