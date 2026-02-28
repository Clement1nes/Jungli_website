import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/ProductDetail.css';
import { RockButton } from '../components/RockButton';
import { useShopify } from '../context/ShopifyContext';
import { fetchProductById } from '../utils/shopify';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { buyNow } = useShopify();
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedSize, setSelectedSize] = useState('7');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [shopifyProduct, setShopifyProduct] = useState(null);

  const sizeChart = [
    { us: '5', uk: 'J', diameter: '15.7mm', circumference: '49.3mm' },
    { us: '6', uk: 'L', diameter: '16.5mm', circumference: '51.8mm' },
    { us: '7', uk: 'N', diameter: '17.3mm', circumference: '54.4mm' },
    { us: '8', uk: 'P', diameter: '18.2mm', circumference: '57.1mm' },
    { us: '9', uk: 'R', diameter: '19.0mm', circumference: '59.7mm' },
    { us: '10', uk: 'T', diameter: '19.8mm', circumference: '62.2mm' },
  ];

  const products = {
    eye: {
      id: 'eye',
      name: 'Third Eye Ring',
      price: '£140',
      description: 'We look with Two Eyes but see with Three…',
      aboutTheRing: 'In my previous life I was enamored with idea of spiritual awakening. One day, during a deep meditation a person appeared before me… My eyes were closed but the person opposite me was clear as day. They were cross-legged, also meditating. It looked as though they had not moved for centuries. They were wearing a turmeric yellow robe and a purple crystal hung from their neck. Their head was bald and had a deep crease running from the centre of their forehead to the back of their skull. I was about to call out and had barely opened my mouth when their head split open to reveal an Eye embedded in their cranium. They spoke. "Two eyes to look, One eye to see. Three eyes together will set you free"…',
      shopifyProductId: '8128692388158',
      goldImages: [
        '/assets/Highdef/eye face gold.png',
        '/assets/Highdef/Gold face front.png',
        '/assets/Highdef/gold eye up.png',
        '/assets/Facegoldside.png'
      ],
      silverImages: [
        '/assets/Highdef/eye face silver.png',
        '/assets/Highdef/Face eye silveer.png',
        '/assets/Highdef/eye up silver.png',
        '/assets/Faceright.png'
      ],
      goldAnimation3d: '/assets/gold-eye-ring.gif',
      silverAnimation3d: '/assets/silver_eye.gif',
      background: '/assets/backgrounds/eye_background.gif',
      alt: 'Eye Ring',
      type: 'eye',
      details: [
        "Inspired from the painting 'Aperture' by Alex Grey.",
        'Hallmarked 925. Sterling Silver.',
        '15 Grams.',
        'Solid Gold available upon request.'
      ]
    },
    star: {
      id: 'star',
      name: 'Shooting Star Ring',
      price: '£160',
      description: 'When you Shoot for the stars remember we were made from them.',
      aboutTheRing: 'Late one night, deep in the forests of North Vietnam; I was perched high on the branch of an ancient Banyan tree when the sky lit up above me in a fiery blaze. What I thought was a meteor hurtling towards my location was, in fact, a small star. Mesmerised, I followed its trajectory, watching as it poked through the canopy and landed into the dirt a few feet away from me. The star was cold to the touch. Its trail perfectly preserved. I took it home with me and forged it into this ring. A Shooting Star. Immortalised forever.',
      shopifyProductId: '12277117354302',
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
      silverAnimation3d: '/assets/silver_ring.gif',
      background: '/assets/backgrounds/star_background.gif',
      alt: 'Star Ring',
      type: 'star',
      details: [
        'Adjustable design.',
        'Hallmarked 925. Sterling Silver.',
        '10 Grams.',
        'Solid Gold available upon request.'
      ]
    },
    foot: {
      id: 'foot',
      name: 'Footprint Ring',
      price: '£150',
      description: 'A reminder of the steps taken and the steps to come…',
      aboutTheRing: 'This ring was made as a reminder. A reminder to stay grounded. A reminder of where we have been, where we plant our feet now, and the steps yet to be taken. It is a reminder of the people that have stood before us and an encouragement to put ourselves in others\' shoes. This ring stamps a footprint as a way to leave our mark on the world.',
      shopifyProductId: '8128703234366',
      goldImages: [
        '/assets/Highdef/gold foot up.png',
        '/assets/Highdef/gold foot main.png',
        '/assets/Highdef/gold foot back.png',
        '/assets/Highdef/Foot side.png'
      ],
      silverImages: [
        '/assets/Highdef/foot up silver.png',
        '/assets/Highdef/foot side silver.png',
        '/assets/Highdef/silver_foot_ring.png'
      ],
      goldAnimation3d: '/assets/ezgif.com-coalesce.gif',
      silverAnimation3d: '/assets/ezgif.com-coalesce.gif',
      background: '/assets/backgrounds/foot_background_new.gif',
      alt: 'Foot Ring',
      type: 'foot',
      details: [
        'Stamps an actual Footprint.',
        'Hallmarked 925. Sterling Silver.',
        '30 Grams.',
        'Solid Gold available upon request.'
      ]
    },
    sizer: {
      id: 'sizer',
      name: 'Ring Sizer',
      price: 'Free + Postage',
      description: 'Not sure of your ring size? Order our professional ring sizer tool.',
      shopifyProductId: '12277121548606',
      images: [
        '/assets/placeholder.jpg'
      ],
      background: '/assets/backgrounds/eye_background.gif',
      alt: 'Ring Sizer Tool',
      type: 'sizer',
      details: [
        'Professional ring sizing tool.',
        'Measures US sizes 1-17.',
        'Includes UK size conversions.',
        'Free - just pay postage.',
        'Fast delivery.'
      ],
      isSizer: true
    }
  };

  const product = products[id];

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  // Fetch Shopify product data if shopifyProductId exists
  useEffect(() => {
    const loadShopifyProduct = async () => {
      if (product?.shopifyProductId) {
        try {
          const shopifyData = await fetchProductById(product.shopifyProductId);
          setShopifyProduct(shopifyData);
        } catch (error) {
          console.error('Error loading Shopify product:', error);
        }
      }
    };
    loadShopifyProduct();
  }, [product]);

  if (!product) return null;

  // Ring sizer uses simple images array, rings use metal-specific images
  const currentImages = product.isSizer
    ? (product.images || [])
    : (selectedMetal === 'gold' ? (product.goldImages || []) : (product.silverImages || []));

  const current3dAnimation = product.isSizer
    ? null
    : (selectedMetal === 'gold' ? product.goldAnimation3d : product.silverAnimation3d);

  // If 3D animation exists, it's at index 0, static images start at index 1
  // If no 3D animation, static images start at index 0
  const currentImage = current3dAnimation
    ? (currentImageIndex === 0 ? current3dAnimation : currentImages[currentImageIndex - 1])
    : (currentImages[currentImageIndex] || '/assets/placeholder.jpg');

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
              style={{
                transform: product.type === 'star' && currentImageIndex === 0 ? 'rotate(180deg)' : 'none'
              }}
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
          {currentImages && currentImages.length >= 1 && (
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

            {/* Metal Selector - Only for rings */}
            {!product.isSizer && (
            <div className="metal-selector">
              <label className="selector-label">Select Material</label>
              <div className="metal-buttons">
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
                  <span>18K Gold Plated</span>
                </motion.button>
              </div>
            </div>
            )}

            {/* Size Selector - Only for rings */}
            {!product.isSizer && (
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
                        {['UK Size', 'US Size', 'Diameter', 'Circumference'].map(h => (
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
                          <td style={{ padding: '0.5rem 0', fontSize: '0.95rem', color: selectedSize === row.us ? '#8faf70' : 'rgba(255,245,218,0.85)' }}>{row.uk}</td>
                          <td style={{ padding: '0.5rem 0', fontSize: '0.95rem', color: selectedSize === row.us ? '#8faf70' : 'rgba(255,245,218,0.85)' }}>{row.us}</td>
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
                    {size.uk} <span style={{ fontSize: '0.85em', opacity: 0.7 }}>({size.us})</span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                style={{
                  marginTop: '1rem',
                  textAlign: 'center'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={async () => {
                    try {
                      const sizerProduct = await fetchProductById('12277121548606');
                      if (sizerProduct && sizerProduct.variants.length > 0) {
                        await buyNow(sizerProduct.variants[0].id, 1);
                      }
                    } catch (error) {
                      console.error('Error ordering ring sizer:', error);
                      alert('Error processing ring sizer order. Please try again.');
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255, 245, 218, 0.6)',
                    textDecoration: 'underline',
                    padding: '0.5rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#8faf70'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 245, 218, 0.6)'}
                >
                  I don't know my size - Order a free ring sizer
                </button>
              </motion.div>
            </div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="product-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <RockButton
                variant="cream"
                size="lg"
                className="uppercase-button"
                onClick={async () => {
                  // Try to fetch and checkout via Shopify
                  if (product.shopifyProductId) {
                    try {
                      console.log('Attempting Shopify checkout...');
                      console.log('Product ID:', product.shopifyProductId);
                      console.log('Selected metal:', selectedMetal);
                      console.log('Selected size:', selectedSize);

                      // Fetch product if not already loaded
                      const productData = shopifyProduct || await fetchProductById(product.shopifyProductId);
                      console.log('Shopify product data:', productData);

                      if (!productData) {
                        throw new Error('Could not load product from Shopify');
                      }

                      // Find the variant that matches the selected metal and size
                      const matchingVariant = productData.variants.find(variant => {
                        const variantTitle = variant.title.toLowerCase();
                        console.log('Checking variant:', variantTitle);
                        const metalMatch = variantTitle.includes(selectedMetal);
                        const sizeMatch = variantTitle.includes(`size ${selectedSize}`) ||
                                        variantTitle.includes(`us ${selectedSize}`) ||
                                        variantTitle.includes(`${selectedSize} /`);
                        return metalMatch && sizeMatch;
                      });

                      console.log('Matching variant:', matchingVariant);

                      if (matchingVariant) {
                        await buyNow(matchingVariant.id, 1);
                      } else {
                        // If no matching variant, use first available
                        console.warn('No matching variant found, using first available');
                        if (productData.variants.length > 0) {
                          await buyNow(productData.variants[0].id, 1);
                        } else {
                          throw new Error('No variants available');
                        }
                      }
                    } catch (error) {
                      console.error('Error with Shopify checkout:', error);
                      alert(`Error processing checkout: ${error.message}. Please try again or contact us.`);
                    }
                  } else {
                    // Fallback to email for products without Shopify integration
                    const subject = `Order: ${product.name}`;
                    const body = product.isSizer
                      ? `Hi,\n\nI would like to order:\n\nProduct: ${product.name}\nPrice: ${product.price}\n\nPlease send payment and shipping details.\n\nThank you!`
                      : `Hi,\n\nI would like to order:\n\nProduct: ${product.name}\nMaterial: ${selectedMetal === 'gold' ? '14K Gold' : 'Sterling Silver'}\nSize: US ${selectedSize} (UK ${sizeChart.find(s => s.us === selectedSize)?.uk})\nPrice: ${product.price}\n\nPlease send payment and shipping details.\n\nThank you!`;

                    window.location.href = `mailto:hello@jungli.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }
                }}
              >
                Buy Now
              </RockButton>
            </motion.div>

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

            {/* About the Ring Section */}
            {product.aboutTheRing && (
              <div className="product-details" style={{ marginTop: '2rem' }}>
                <h3 className="details-title">About the Ring</h3>
                <p className="product-description" style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255, 245, 218, 0.75)' }}>
                  {product.aboutTheRing}
                </p>
              </div>
            )}

            <p className="product-description">{product.description}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Other Products Section */}
      <motion.div
        className="other-products-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="other-products-grid">
          {Object.values(products)
            .filter(p => p.id !== id && !p.isSizer)
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
                    src={otherProduct.goldAnimation3d}
                    alt={otherProduct.name}
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </main>
  );
}

export default ProductDetail;
