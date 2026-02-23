import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/ProductDetail.css';
import { RockButton } from '../components/RockButton';
import { fetchProducts } from '../utils/shopify';
import { useShopify } from '../context/ShopifyContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedSize, setSelectedSize] = useState('7');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [includeRingSizer, setIncludeRingSizer] = useState(false);
  const { buyNow } = useShopify();

  const sizeChart = [
    { us: '5', uk: 'J', diameter: '15.7mm', circumference: '49.3mm' },
    { us: '6', uk: 'L', diameter: '16.5mm', circumference: '51.8mm' },
    { us: '7', uk: 'N', diameter: '17.3mm', circumference: '54.4mm' },
    { us: '8', uk: 'P', diameter: '18.2mm', circumference: '57.1mm' },
    { us: '9', uk: 'R', diameter: '19.0mm', circumference: '59.7mm' },
    { us: '10', uk: 'T', diameter: '19.8mm', circumference: '62.2mm' },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchProducts();
        setAllProducts(shopifyProducts);

        // Find the product matching the ID from URL
        const foundProduct = shopifyProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/shop');
        }
      } catch (error) {
        console.error('Error loading products:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [id, navigate]);

  if (loading) {
    return (
      <main className="product-detail-container">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Evil Green Plant', serif",
            fontSize: '3rem',
            fontWeight: 'normal',
            color: '#FFF5DA'
          }}>Loading product...</h1>
        </div>
      </main>
    );
  }

  if (!product) return null;

  // Get the selected variant based on metal and size selections
  const getSelectedVariant = () => {
    // Try to find variant that matches both metal and size
    return product.variants.find(v => {
      const title = v.title.toLowerCase();
      const matchesMetal = title.includes(selectedMetal);
      const matchesSize = title.includes(selectedSize);
      return matchesMetal && matchesSize;
    }) || product.variants[0]; // Fallback to first variant
  };

  const selectedVariant = getSelectedVariant();
  const productImages = product.images.map(img => img.src);
  const currentImage = productImages[currentImageIndex] || '/assets/placeholder.jpg';
  const totalImages = productImages.length;

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
              alt={product.title}
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
          {productImages.length > 1 && (
            <div className="gallery-thumbnails">
              {productImages.map((img, index) => (
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
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">
              {selectedVariant.price.currencyCode === 'USD' ? '$' : ''}{selectedVariant.price.amount}
            </p>

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

            {/* Size Selector */}
            <div className="size-selector">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <label className="selector-label" style={{ marginBottom: 0 }}>Select Size</label>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255, 245, 218, 0.5)',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  size guide
                </button>
              </div>

              {showSizeChart && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginBottom: '1.5rem',
                    borderTop: '1px solid rgba(255,245,218,0.1)',
                    borderBottom: '1px solid rgba(255,245,218,0.1)',
                    padding: '1rem 0'
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Evil Green Plant', serif" }}>
                    <thead>
                      <tr>
                        {['US Size', 'UK Size', 'Diameter', 'Circumference'].map(h => (
                          <th key={h} style={{ textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,245,218,0.45)', paddingBottom: '0.6rem', fontWeight: 'normal' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map(row => (
                        <tr
                          key={row.us}
                          style={{ borderTop: '1px solid rgba(255,245,218,0.07)', cursor: 'pointer' }}
                          onClick={() => { setSelectedSize(row.us); setShowSizeChart(false); }}
                        >
                          <td style={{ padding: '0.5rem 0', fontSize: '0.95rem', color: selectedSize === row.us ? '#8faf70' : 'rgba(255,245,218,0.85)' }}>{row.us}</td>
                          <td style={{ padding: '0.5rem 0', fontSize: '0.95rem', color: selectedSize === row.us ? '#8faf70' : 'rgba(255,245,218,0.85)' }}>{row.uk}</td>
                          <td style={{ padding: '0.5rem 0', fontSize: '0.85rem', color: 'rgba(255,245,218,0.6)' }}>{row.diameter}</td>
                          <td style={{ padding: '0.5rem 0', fontSize: '0.85rem', color: 'rgba(255,245,218,0.6)' }}>{row.circumference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ fontFamily: "'Evil Green Plant', serif", fontSize: '0.75rem', color: 'rgba(255,245,218,0.35)', marginTop: '0.75rem' }}>
                    Tap a size to select it. Unsure? We recommend measuring your finger with a strip of paper.
                  </p>
                </motion.div>
              )}

              <div className="size-buttons">
                {sizeChart.map(size => (
                  <motion.button
                    key={size.us}
                    className={`size-option ${selectedSize === size.us ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size.us)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size.us} <span style={{ fontSize: '0.85em', opacity: 0.7 }}>({size.uk})</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ring Sizer Option */}
            <motion.div
              className="ring-sizer-option"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="ring-sizer-checkbox">
                <input
                  type="checkbox"
                  checked={includeRingSizer}
                  onChange={(e) => setIncludeRingSizer(e.target.checked)}
                  className="ring-sizer-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label-container">
                  <span className="checkbox-label">
                    Add Ring Sizer <span style={{ color: '#8faf70' }}>(+$5)</span>
                  </span>
                  <span className="checkbox-sublabel">
                    Not sure of your size? We'll include a sizing tool
                  </span>
                </span>
              </label>
            </motion.div>

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
                onClick={async () => {
                  try {
                    console.log('Buy Now clicked', { metal: selectedMetal, size: selectedSize, ringSizer: includeRingSizer });
                    await buyNow(selectedVariant.id, 1);
                  } catch (error) {
                    console.error('Error purchasing:', error);
                    alert('Error processing purchase. Please try again.');
                  }
                }}
              >
                Buy Now
              </RockButton>
            </motion.div>

            {/* Product Details */}
            <div className="product-details">
              <h3 className="details-title">Description</h3>
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Other Products Section */}
      {allProducts.length > 1 && (
        <motion.div
          className="other-products-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="other-products-grid">
            {allProducts
              .filter(p => p.id !== id)
              .map((otherProduct, index) => (
                <motion.div
                  key={otherProduct.id}
                  className="other-product-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.2) }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onClick={() => {
                    navigate(`/product/${otherProduct.id}`);
                    setCurrentImageIndex(0);
                    setSelectedMetal('gold');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="other-product-image">
                    <img
                      src={otherProduct.images[0]?.src || '/assets/placeholder.jpg'}
                      alt={otherProduct.title}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default ProductDetail;
