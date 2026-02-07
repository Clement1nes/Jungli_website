import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = {
    eye: {
      id: 'eye',
      name: 'Eye Ring',
      price: '$140',
      description: 'ring with an eye carved on it.',
      goldImages: [
        '/assets/Highdef/eye face gold.png',
        '/assets/Highdef/Gold face front.png',
        '/assets/Highdef/gold eye up.png'
      ],
      silverImages: [
        '/assets/Highdef/eye face silver.png',
        '/assets/Highdef/Face eye silveer.png',
        '/assets/Highdef/eye up silver.png'
      ],
      background: '/assets/backgrounds/eye_background.gif',
      alt: 'Eye Ring',
      type: 'eye',
      details: [
        'hand carved',
        'gold or silver',
        'adjustable size'
      ]
    },
    star: {
      id: 'star',
      name: 'Star Ring',
      price: '$160',
      description: 'shooting star. wraps around finger.',
      goldImages: [
        '/assets/Highdef/gold star front.png',
        '/assets/Highdef/gold forward star.png',
        '/assets/Highdef/gold star back.png',
        '/assets/Highdef/gold star right.png'
      ],
      silverImages: [
        '/assets/Highdef/silver star front.png',
        '/assets/Highdef/star side silver.png',
        '/assets/Highdef/silver back star.png',
        '/assets/Highdef/silver star main.png'
      ],
      background: '/assets/backgrounds/star_background.gif',
      alt: 'Star Ring',
      type: 'star',
      details: [
        'sculptural form',
        'gold or silver',
        'comfort fit'
      ]
    },
    foot: {
      id: 'foot',
      name: 'Foot Ring',
      price: '$150',
      description: 'sculptural foot ring. anatomical detail.',
      goldImages: [
        '/assets/Highdef/gold foot up.png',
        '/assets/Highdef/gold foot main.png',
        '/assets/Highdef/gold foot back.png',
        '/assets/Highdef/Foot side.png'
      ],
      silverImages: [
        '/assets/Highdef/foot up silver.png',
        '/assets/Highdef/foot side silver.png'
      ],
      background: '/assets/backgrounds/foot_background.gif',
      alt: 'Foot Ring',
      type: 'foot',
      details: [
        'anatomical form',
        'gold or silver',
        'statement piece'
      ]
    }
  };

  const product = products[id];

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) return null;

  const currentImages = selectedMetal === 'gold' ? product.goldImages : product.silverImages;
  const currentImage = currentImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <main className="product-detail-container">
      {/* Animated GIF Background */}
      <div className="product-environment">
        <img
          src={product.background}
          alt=""
          className="environment-gif"
        />
        <div className="environment-overlay" />
      </div>

      {/* Main Content Grid */}
      <div className="product-detail-grid">
        {/* Left: Image Gallery */}
        <motion.div
          className="product-gallery"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="gallery-main"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;

              if (swipe < -500) {
                nextImage();
              } else if (swipe > 500) {
                prevImage();
              }
            }}
          >
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={product.alt}
              className="gallery-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              draggable={false}
            />

            {/* Swipe indicator */}
            {currentImages.length > 1 && (
              <div className="swipe-indicator">
                <span>←</span>
                <span>→</span>
              </div>
            )}
          </motion.div>

          {/* Thumbnail Strip */}
          {currentImages.length > 1 && (
            <div className="gallery-thumbnails">
              {currentImages.map((img, index) => (
                <motion.button
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img} alt={`View ${index + 1}`} />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          className="product-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          <motion.div
            className="info-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>

            {/* Metal Selector */}
            <div className="metal-selector">
              <label className="selector-label">Select Material</label>
              <div className="metal-buttons">
                <motion.button
                  className={`metal-option ${selectedMetal === 'gold' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedMetal('gold');
                    setCurrentImageIndex(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="metal-swatch gold-swatch" />
                  <span>14K Gold</span>
                </motion.button>
                <motion.button
                  className={`metal-option ${selectedMetal === 'silver' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedMetal('silver');
                    setCurrentImageIndex(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="metal-swatch silver-swatch" />
                  <span>Sterling Silver</span>
                </motion.button>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <h3 className="details-title">Details</h3>
              <ul className="details-list">
                {product.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="product-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="btn-buy-now"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
              <motion.button
                className="btn-add-cart"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default ProductDetail;
