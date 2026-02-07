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
      description: 'Mesmerizing eye ring with intricate detail and symbolic design. A piece that sees beyond the ordinary, crafted for those who embrace the mystical.',
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
        'Hand-carved eye detail',
        'Available in 14K gold & sterling silver',
        'Adjustable sizing',
        'Limited edition piece'
      ]
    },
    star: {
      id: 'star',
      name: 'Star Ring',
      price: '$160',
      description: 'Celestial shooting star ring. A dynamic piece that brings cosmic energy and movement to your collection. Capture the magic of wishes and dreams.',
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
        'Sculptural shooting star design',
        'Available in 14K gold & sterling silver',
        'Comfort fit band',
        'Handcrafted in limited quantities'
      ]
    },
    foot: {
      id: 'foot',
      name: 'Foot Ring',
      price: '$150',
      description: 'Handcrafted sculptural foot ring. A bold statement piece that celebrates anatomical beauty and artistic form. For those who dare to be different.',
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
        'Anatomical sculptural form',
        'Available in 14K gold & sterling silver',
        'Unique conversation piece',
        'Artisan crafted'
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
          <div className="gallery-main">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={product.alt}
              className="gallery-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Navigation Arrows */}
            {currentImages.length > 1 && (
              <>
                <motion.button
                  className="gallery-nav gallery-nav-prev"
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </motion.button>
                <motion.button
                  className="gallery-nav gallery-nav-next"
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </motion.button>
              </>
            )}
          </div>

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
