import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <main className="landing-container">
      {/* Animated Environment Background */}
      <div className="environment-background">
        <img
          src="/assets/Background.gif"
          alt=""
          className="background-gif-layer"
        />
      </div>

      {/* Landing Content */}
      <div className="landing-content">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <img
            src="/assets/newlogo.png"
            alt="Jungli Logo"
            style={{ height: '280px', width: 'auto' }}
          />
        </motion.div>

        {/* Anatomy Ring with Hover Text */}
        <motion.div
          className="landing-ring-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={handleEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/assets/mainfront.gif"
            alt="Anatomy Ring"
            className="landing-ring"
          />

          {/* Rotating circular text */}
          <svg className="rotating-text" viewBox="0 0 400 400">
            <defs>
              <path
                id="circlePath"
                d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
              />
            </defs>
            <text className="circular-text">
              <textPath href="#circlePath" startOffset="0%">
                enter the jungle • enter the jungle • enter the jungle •
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </main>
  );
}

export default Landing;
