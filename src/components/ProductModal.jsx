import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../styles/ProductModal.css';

function ProductModal({ product, isOpen, onClose }) {
  const [selectedMetal, setSelectedMetal] = useState('gold');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedMetal('gold'); // Reset to gold when modal opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const currentImage = selectedMetal === 'gold' ? product.goldImage : product.silverImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'fixed', top: '50%', left: '50%' }}
          >
            {/* Close Button */}
            <motion.button
              className="modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <div className="modal-split">
              {/* Left Side: Animated Background + Product Image */}
              <div className="modal-left">
                <img
                  src={product.background}
                  alt=""
                  className="background-gif"
                  onError={(e) => {
                    console.error('Failed to load background:', product.background);
                  }}
                  onLoad={() => {
                    console.log('Background loaded:', product.background);
                  }}
                />
                <motion.div
                  className="product-image-wrapper"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  key={selectedMetal}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="product-image-large"
                  />
                </motion.div>
              </div>

              {/* Right Side: Product Info + Buttons */}
              <motion.div
                className="modal-right"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="product-info-wrapper">
                  <motion.h2
                    className="product-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {product.name}
                  </motion.h2>

                  <motion.p
                    className="product-price"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {product.price}
                  </motion.p>

                  <motion.p
                    className="product-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {product.description}
                  </motion.p>

                  <motion.div
                    className="metal-selector"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <button
                      className={`metal-button ${selectedMetal === 'gold' ? 'active' : ''}`}
                      onClick={() => setSelectedMetal('gold')}
                    >
                      Gold
                    </button>
                    <button
                      className={`metal-button ${selectedMetal === 'silver' ? 'active' : ''}`}
                      onClick={() => setSelectedMetal('silver')}
                    >
                      Silver
                    </button>
                  </motion.div>

                  <motion.div
                    className="modal-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      className="btn-primary"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProductModal;
