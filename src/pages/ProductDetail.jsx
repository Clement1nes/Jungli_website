import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/ProductDetail.css';
import { RockButton } from '../components/RockButton';

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
      goldAnimation3d: '/assets/gold-eye-ring.gif',
      silverAnimation3d: '/assets/silver_eye.gif',
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
      goldAnimation3d: '/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif',
      silverAnimation3d: '/assets/silver ring.gif',
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
      goldAnimation3d: '/assets/ezgif.com-coalesce.gif',
      silverAnimation3d: '/assets/ezgif.com-coalesce.gif',
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
  const current3dAnimation = selectedMetal === 'gold' ? product.goldAnimation3d : product.silverAnimation3d;

  // If 3D animation exists, it's at index 0, static images start at index 1
  // If no 3D animation, static images start at index 0
  const currentImage = current3dAnimation
    ? (currentImageIndex === 0 ? current3dAnimation : currentImages[currentImageIndex - 1])
    : currentImages[currentImageIndex];

  const totalImages = currentImages.length + (current3dAnimation ? 1 : 0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
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
            {totalImages > 1 && (
              <div className="swipe-indicator">
                <span>←</span>
                <span>→</span>
              </div>
            )}
          </motion.div>

          {/* Thumbnail Strip */}
          {currentImages.length >= 1 && (
            <div className="gallery-thumbnails">
              {/* 3D Animation Thumbnail FIRST - only show if exists for current metal */}
              {current3dAnimation && (
                <motion.button
                  key="3d-animation"
                  className={`thumbnail ${currentImageIndex === 0 ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(0)}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={current3dAnimation} alt="3D Animation" />
                </motion.button>
              )}
              {/* Static images follow */}
              {currentImages.map((img, index) => {
                const thumbnailIndex = current3dAnimation ? index + 1 : index;
                return (
                  <motion.button
                    key={index}
                    className={`thumbnail ${thumbnailIndex === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(thumbnailIndex)}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </motion.button>
                );
              })}
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
              <RockButton
                variant="cream"
                size="md"
                onClick={() => console.log('Buy Now clicked')}
              >
                Buy Now
              </RockButton>
              <RockButton
                variant="cream"
                size="md"
                onClick={() => console.log('Add to Cart clicked')}
              >
                Add to Cart
              </RockButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default ProductDetail;
