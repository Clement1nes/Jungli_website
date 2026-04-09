import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Fade out header quickly - fully transparent by 150px
      const newOpacity = Math.max(0, 1 - scrollPosition / 150);
      setHeaderOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {!isLandingPage && (
        <header className="main-header" style={{ opacity: headerOpacity }}>
          <div className="header-logo">
            <Link to="/home">
              <img src="/assets/newlogo.png" alt="Jungli Logo" className="site-logo" />
            </Link>
          </div>
          <div className="nav-corner">
            <nav className="main-nav">
              <ul>
                {/* <li><Link to="/gallery">Gallery</Link></li> */}
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!isLandingPage && (
        <footer className="main-footer">
          <p className="footer-brand">
            2026 Jungli
            <img src="/favicon.png" alt="" />
          </p>
          <a
            className="footer-social"
            href="https://www.instagram.com/jungli____/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            @jungli____
          </a>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
