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
  const [selectedStone, setSelectedStone] = useState('blue');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [shopifyProduct, setShopifyProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stoneOptions = [
    { id: 'blue', name: 'Blue Sapphire', image: '/images/stones/blue.png' },
    { id: 'red', name: 'Red Ruby', image: '/images/stones/red.png' },
    { id: 'green', name: 'Green Emerald', image: '/images/stones/green.png' },
    { id: 'orange', name: 'Orange Citrine', image: '/images/stones/orange.png' },
    { id: 'purple', name: 'Purple Amethyst', image: '/images/stones/Purple.png' },
    { id: 'pink', name: 'Pink Sapphire', image: '/images/stones/pink.png' },
    { id: 'yellow', name: 'Yellow Citrine', image: '/images/stones/yellow.png' },
    { id: 'silver', name: 'White Diamond', image: '/images/stones/silver.png' },
    { id: 'black', name: 'Black Diamond', image: '/images/stones/black.png' },
    { id: 'none', name: 'No Stone', image: '/images/stones/none.png' },
  ];

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
      price: '£175',
      silverPrice: 175,
      silverPriceWithStone: 200,
      goldPriceNoStone: 225,
      goldPriceWithStone: 250,
      description: 'We look with Two Eyes but see with Three…',
      aboutTheRing: [
        'In my earlier years I was enamored with the idea of spiritual awakening. One day, during a deep meditation a figure appeared before me…',
        'My eyes were closed but the person opposite me appeared as clear as day. They were cross-legged, also meditating. It looked as though they had not moved for centuries. They were wearing a turmeric yellow robe and a purple crystal hung from their neck. Their head was skin bald and had a deep crease running from the centre of their forehead to the back of their skull.',
        'I was about to call out but had barely parted my lips when their head split open to reveal an Eye embedded in their cranium.',
        'They spoke.',
        '"Two eyes to look, one eye to see. Three eyes together will set you free"…'
      ],
      shopifyProductId: '8128692388158',
      // Shopify variant IDs mapped by metal, stone, and size
      shopifyVariants: {
        gold: {
          none: { '5': '44526684275006', '6': '53173846212926', '7': '53173846245694', '8': '53173846278462', '9': '53173846311230', '10': '53173846343998' },
          black: { '5': '44526684307774', '6': '53173846376766', '7': '53173846409534', '8': '53173846442302', '9': '53173846475070', '10': '53173846507838' },
          blue: { '5': '53173203075390', '6': '53173846868286', '7': '53173846901054', '8': '53173846933822', '9': '53173846966590', '10': '53173846999358' },
          gold: { '5': '53173235220798', '6': '53173848342846', '7': '53173848375614', '8': '53173848408382', '9': '53173848441150', '10': '53173848473918' },
          green: { '5': '53173209497918', '6': '53173847195966', '7': '53173847228734', '8': '53173847261502', '9': '53173847294270', '10': '53173847327038' },
          orange: { '5': '53173211365694', '6': '53173847359806', '7': '53173847392574', '8': '53173847425342', '9': '53173847458110', '10': '53173847490878' },
          pink: { '5': '53173216837950', '6': '53173847523646', '7': '53173847556414', '8': '53173847589182', '9': '53173847621950', '10': '53173847654718' },
          purple: { '5': '53173217657150', '6': '53173847687486', '7': '53173847720254', '8': '53173847753022', '9': '53173847785790', '10': '53173847818558' },
          red: { '5': '53173530427710', '6': '53173849653566', '7': '53173849686334', '8': '53173849719102', '9': '53173849751870', '10': '53173849784638' },
          silver: { '5': '53173219230014', '6': '53173847851326', '7': '53173847884094', '8': '53173847916862', '9': '53173847949630', '10': '53173847982398' },
          yellow: { '5': '53173219983678', '6': '53173848015166', '7': '53173848047934', '8': '53173848080702', '9': '53173848113470', '10': '53173848146238' },
        },
        silver: {
          none: { '5': '53168230629694', '6': '53173846540606', '7': '53173846573374', '8': '53173846606142', '9': '53173846638910', '10': '53173846671678' },
          black: { '5': '53168230760766', '6': '53173846704446', '7': '53173846737214', '8': '53173846769982', '9': '53173846802750', '10': '53173846835518' },
          blue: { '5': '53173229748542', '6': '53173848179006', '7': '53173848211774', '8': '53173848244542', '9': '53173848277310', '10': '53173848310078' },
          gold: { '5': '53173235220798', '6': '53173848342846', '7': '53173848375614', '8': '53173848408382', '9': '53173848441150', '10': '53173848473918' },
          green: { '5': '53173238661438', '6': '53173848506686', '7': '53173848539454', '8': '53173848572222', '9': '53173848604990', '10': '53173848637758' },
          orange: { '5': '53173244002622', '6': '53173848670526', '7': '53173848703294', '8': '53173848736062', '9': '53173848768830', '10': '53173848801598' },
          pink: { '5': '53173261402430', '6': '53173848998206', '7': '53173849030974', '8': '53173849063742', '9': '53173849096510', '10': '53173849129278' },
          purple: { '5': '53173248819518', '6': '53173848834366', '7': '53173848867134', '8': '53173848899902', '9': '53173848932670', '10': '53173848965438' },
          red: { '5': '53173268283710', '6': '53173849162046', '7': '53173849194814', '8': '53173849227582', '9': '53173849260350', '10': '53173849293118' },
          silver: { '5': '53173271658814', '6': '53173849325886', '7': '53173849358654', '8': '53173849391422', '9': '53173849424190', '10': '53173849456958' },
          yellow: { '5': '53173274673470', '6': '53173849489726', '7': '53173849522494', '8': '53173849555262', '9': '53173849588030', '10': '53173849620798' },
        }
      },
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
      // Gem-specific images for Third Eye Ring
      gemImages: {
        gold: {
          blue: '/images/eye-ring-gems/gold_blue.png',
          red: '/images/eye-ring-gems/gold_red.png',
          green: '/images/eye-ring-gems/gold_green.png',
          orange: '/images/eye-ring-gems/gold_orange.png',
          purple: '/images/eye-ring-gems/gold_purple.png',
          pink: '/images/eye-ring-gems/gold_pink.png',
          silver: '/images/eye-ring-gems/gold_silver.png',
          black: '/images/eye-ring-gems/gold_black.png',
        },
        silver: {
          blue: '/images/eye-ring-gems/silver_blue.png',
          red: '/images/eye-ring-gems/silver_red.png',
          green: '/images/eye-ring-gems/silver_green.png',
          orange: '/images/eye-ring-gems/silver_orange.png',
          purple: '/images/eye-ring-gems/silver_purple.png',
          pink: '/images/eye-ring-gems/silver_pink.png',
          silver: '/images/eye-ring-gems/silver_silver.png',
          black: '/images/eye-ring-gems/silver_black.png',
        }
      },
      goldAnimation3d: '/assets/gold-eye-ring.gif',
      silverAnimation3d: '/assets/silver_eye.gif',
      background: '/assets/backgrounds/eye_background.webm',
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
      price: '£150',
      silverPrice: 150,
      goldPrice: 200,
      description: 'When you Shoot for the stars remember we were made from them.',
      aboutTheRing: [
        'Late one night, deep in the forests of North Vietnam, I was perched high up on the branch of an ancient Banyan tree when the sky lit up above me in a fiery blaze.',
        'What I thought was a meteor hurtling towards my location was, in fact, a small star. Mesmerised, I followed its trajectory, watching as it poked through the canopy and landed in the dirt a few feet away from me.',
        'The star was cold to the touch, its trail perfectly preserved. I took it home with me and forged it into this ring.',
        'A Shooting Star. Immortalised forever.'
      ],
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
      background: '/assets/backgrounds/star_background.webm',
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
      price: '£250',
      silverPrice: 250,
      goldPrice: 300,
      description: 'A reminder of the steps taken and the steps to come…',
      aboutTheRing: [
        'This ring was made as a reminder.',
        'A reminder to stay grounded.',
        'A reminder of where we have been, where we plant our feet now, and the steps yet to be taken.',
        'It is a reminder of the people that have stood before us and an encouragement to put ourselves in others\' shoes.',
        'This ring stamps a footprint as a way to leave our mark on the world.'
      ],
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
      background: '/assets/backgrounds/foot_background_new.webm',
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
      background: '/assets/backgrounds/eye_background.webm',
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

  // Check if a specific variant is available
  const isVariantAvailable = (metal, stone, size) => {
    if (product.id !== 'eye' || !product.shopifyVariants || !shopifyProduct) {
      return true; // Default to available if we can't check
    }

    const variantId = product.shopifyVariants[metal]?.[stone]?.[size];
    if (!variantId) return false;

    // Find the variant in Shopify product data
    const variant = shopifyProduct.variants.find(v =>
      v.id === `gid://shopify/ProductVariant/${variantId}`
    );

    return variant ? variant.available : false;
  };

  // Calculate dynamic price based on product, metal, and stone selection
  const getCurrentPrice = () => {
    if (product.isSizer) return product.price;

    if (product.id === 'eye') {
      // Third Eye Ring: £175 silver, £200 silver with stone, £225 gold no stone, £250 gold with stone
      if (selectedMetal === 'silver') {
        return selectedStone === 'none' ? `£${product.silverPrice}` : `£${product.silverPriceWithStone}`;
      } else {
        return selectedStone === 'none' ? `£${product.goldPriceNoStone}` : `£${product.goldPriceWithStone}`;
      }
    } else if (product.silverPrice && product.goldPrice) {
      // Other rings with dynamic pricing
      return selectedMetal === 'silver' ? `£${product.silverPrice}` : `£${product.goldPrice}`;
    }

    return product.price;
  };

  // Ring sizer uses simple images array, rings use metal-specific images
  // For Third Eye Ring with gems, show gem image first, then other images
  let currentImages = [];
  if (product.isSizer) {
    currentImages = product.images || [];
  } else if (product.id === 'eye' && product.gemImages) {
    // Add gem-specific image first, then 3D animation, then other images
    const animation3d = selectedMetal === 'gold' ? product.goldAnimation3d : product.silverAnimation3d;
    const otherImages = selectedMetal === 'gold' ? product.goldImages : product.silverImages;

    // If "No Stone" is selected, show 3D animation first, then other images
    if (selectedStone === 'none') {
      currentImages = [
        animation3d,
        ...otherImages
      ];
    } else {
      // If a stone is selected, show gem image first
      const gemImage = product.gemImages[selectedMetal][selectedStone];
      currentImages = [
        gemImage,
        animation3d,
        ...otherImages
      ];
    }
  } else {
    currentImages = selectedMetal === 'gold' ? (product.goldImages || []) : (product.silverImages || []);
  }

  const current3dAnimation = (product.isSizer || (product.id === 'eye' && product.gemImages))
    ? null
    : (selectedMetal === 'gold' ? product.goldAnimation3d : product.silverAnimation3d);

  // For Third Eye Ring, all images are in the array (gem image at 0, 3D at 1, etc)
  // For other rings, 3D animation is at index 0, static images start at index 1
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
        <video
          src={product.background}
          autoPlay
          loop
          muted
          playsInline
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
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
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
            <p className="product-price">{getCurrentPrice()}</p>

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
                  aria-label="Select Sterling Silver"
                  aria-pressed={selectedMetal === 'silver'}
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
                  aria-label="Select 18k Gold Plated"
                  aria-pressed={selectedMetal === 'gold'}
                >
                  <span className="metal-swatch gold-swatch" />
                  <span>18k Gold Plated</span>
                </motion.button>
              </div>
            </div>
            )}

            {/* Stone Selector - Only for Third Eye Ring - Horizontal Layout */}
            {!product.isSizer && product.id === 'eye' && (
            <div className="stone-selector">
              <label className="selector-label">Select Stone</label>
              <div className="stone-buttons">
                {stoneOptions.map((stone) => (
                  <motion.button
                    key={stone.id}
                    className={`stone-option ${selectedStone === stone.id ? 'active' : ''} ${stone.id === 'none' ? 'no-stone-option' : ''}`}
                    onClick={() => {
                      setSelectedStone(stone.id);
                      setCurrentImageIndex(0);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={stone.name}
                    aria-label={`Select ${stone.name}`}
                    aria-pressed={selectedStone === stone.id}
                  >
                    <img src={stone.image} alt={stone.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
                  </motion.button>
                ))}
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
                {sizeChart.map(size => {
                  const available = isVariantAvailable(selectedMetal, selectedStone, size.us);
                  return (
                    <motion.button
                      key={size.us}
                      className={`size-option ${selectedSize === size.us ? 'active' : ''} ${!available ? 'out-of-stock' : ''}`}
                      onClick={() => available && setSelectedSize(size.us)}
                      whileHover={available ? { scale: 1.05 } : {}}
                      whileTap={available ? { scale: 0.95 } : {}}
                      disabled={!available}
                      title={!available ? 'Out of Stock' : ''}
                    >
                      {size.uk} <span style={{ fontSize: '0.85em', opacity: 0.7 }}>({size.us})</span>
                    </motion.button>
                  );
                })}
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
                    setIsLoading(true);
                    try {
                      console.log('Attempting Shopify checkout...');
                      console.log('Product ID:', product.shopifyProductId);
                      console.log('Selected metal:', selectedMetal);
                      console.log('Selected size:', selectedSize);

                      // For Third Eye Ring, use direct variant ID mapping with size
                      if (product.id === 'eye' && product.shopifyVariants) {
                        const variantId = product.shopifyVariants[selectedMetal]?.[selectedStone]?.[selectedSize];

                        if (variantId) {
                          console.log('Using mapped variant ID:', variantId, `(${selectedMetal} + ${selectedStone} + size ${selectedSize})`);
                          // Build the full variant ID path for Shopify
                          const fullVariantId = `gid://shopify/ProductVariant/${variantId}`;
                          await buyNow(fullVariantId, 1);
                        } else {
                          throw new Error(`No variant found for ${selectedMetal} with ${selectedStone} stone in size ${selectedSize}`);
                        }
                      } else {
                        // For other rings, use the existing variant matching logic
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
                      }
                    } catch (error) {
                      console.error('Error with Shopify checkout:', error);
                      alert(`Error processing checkout: ${error.message}. Please try again or contact us.`);
                    } finally {
                      setIsLoading(false);
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
                {isLoading ? 'Processing...' : 'Buy Now'}
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
              <div className="product-details" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                <h3 className="details-title" style={{ marginBottom: '2rem' }}>About the Ring</h3>
                {Array.isArray(product.aboutTheRing) ? (
                  product.aboutTheRing.map((paragraph, index) => (
                    <p key={index} className="product-description" style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'rgba(255, 245, 218, 0.75)', marginBottom: '2rem' }}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="product-description" style={{ fontSize: '0.95rem', lineHeight: '2', color: 'rgba(255, 245, 218, 0.75)' }}>
                    {product.aboutTheRing}
                  </p>
                )}
              </div>
            )}
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
