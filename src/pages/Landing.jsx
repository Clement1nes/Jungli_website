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
          <div className="enter-text-overlay">
            enter the jungle
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Landing;
