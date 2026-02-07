import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="main-header">
          <div className="header-logo">
            <Link to="/">
              <img src="/assets/Clean_logo.png" alt="Jungli Logo" className="site-logo" />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <nav className="main-nav">
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
            <div className="basket-icon">
              <Link to="/" style={{ textDecoration: 'none', color: '#F7F4ED', position: 'relative' }}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#D4AF37',
                  color: '#1A1A1D',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Evil Green Plant', serif"
                }}>0</span>
              </Link>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="main-footer">
          <p>&copy; 2026 Jungli</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
