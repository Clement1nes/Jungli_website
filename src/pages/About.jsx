import { useState } from 'react';
import { motion } from 'framer-motion';

function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What materials do you use?",
      answer: "We work primarily with sterling silver and 14k gold, sourcing materials from ethical suppliers. Each piece is crafted with attention to sustainability and quality."
    },
    {
      question: "How long does shipping take?",
      answer: "Each piece is made to order. Production takes 2-3 weeks, with shipping taking an additional 3-5 business days depending on your location."
    },
    {
      question: "Do you offer custom pieces?",
      answer: "Yes! We love creating custom pieces. Contact us with your ideas and we'll work together to bring your vision to life."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for unworn items in original packaging. Custom pieces are final sale."
    },
    {
      question: "How do I care for my jewelry?",
      answer: "Store pieces in a dry place away from direct sunlight. Clean with a soft cloth. Avoid exposure to chemicals, perfumes, and water when possible."
    }
  ];

  return (
    <main style={{ background: '#3d3428', minHeight: '100vh', paddingTop: '250px' }}>
      <section className="content-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          <motion.h1
            style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '3.5rem',
              fontWeight: 'normal',
              textAlign: 'center',
              marginBottom: '3rem',
              transform: 'rotate(-1deg)',
              color: '#F7F4ED'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Jungli
          </motion.h1>

          <motion.div
            style={{
              marginBottom: '4rem',
              lineHeight: '1.9'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              color: '#E8E0D0'
            }}>
              Jungli was born from a desire to create objects that feel both ancient and contemporary—pieces that carry the weight of time without being bound by it.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              color: '#E8E0D0'
            }}>
              We draw inspiration from the organic world: the irregular curves of river stones, the asymmetry of tree branches, the quiet persistence of natural forms. Each piece is designed and crafted by hand in our small studio, where we prioritize slow processes over mass production.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              color: '#E8E0D0'
            }}>
              Our approach is intentionally limited. We make small batches, use traditional techniques, and let materials guide the final form. This means no two pieces are exactly alike—each carries its own subtle variations, its own character.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              color: '#E8E0D0'
            }}>
              We believe in objects that endure. That age well. That become more meaningful over time, not less.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '2.5rem',
              fontWeight: 'normal',
              marginBottom: '2rem',
              transform: 'rotate(1deg)',
              color: '#F7F4ED'
            }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  style={{
                    border: '2px solid #4A7C2C',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    backgroundColor: openFaq === index ? '#4A7C2C' : 'transparent',
                    color: openFaq === index ? '#F7F4ED' : '#E8E0D0',
                    transition: 'all 0.3s ease',
                    transform: `rotate(${Math.random() * 2 - 1}deg)`
                  }}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  whileHover={{ scale: 1.02, rotate: Math.random() * 3 - 1.5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <h3 style={{
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1.4rem',
                    fontWeight: 'normal',
                    marginBottom: openFaq === index ? '1rem' : '0'
                  }}>
                    {faq.question}
                  </h3>
                  {openFaq === index && (
                    <motion.p
                      style={{
                        fontFamily: "'Evil Green Plant', serif",
                        fontSize: '1.1rem',
                        lineHeight: '1.7'
                      }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default About;
