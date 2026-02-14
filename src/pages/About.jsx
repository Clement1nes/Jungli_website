import { useState } from 'react';
import { motion } from 'framer-motion';

function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What materials do you use?",
      answer: "All Products are made with Solid Recycled 925. Sterling Silver and 9/14/18k Gold upon Request. 18k Gold Plating is our standard plating option."
    },
    {
      question: "Do you offer Custom pieces?",
      answer: "Yes! I love creating Custom pieces. If you have an idea, Get in touch via Instagram @Jungli____ or through the Contact Form."
    },
    {
      question: "How long does Shipping take?",
      answer: "As every piece is Hand crafted, expect delivery of your piece within 3-4 weeks. Depending on location shipping may vary."
    },
    {
      question: "What is your Return Policy?",
      answer: "We do not accept returns after purchase of any items. If there is an issue with an item or Re-Sizing is needed this can be arranged with us within 2 weeks of receiving your product."
    },
    {
      question: "How do I care for my Jewellery?",
      answer: "Silver will scratch and dull over time, to bring back its sparkle we recommend buying a polishing cloth. If your jewellery has become dirty, simply boil some water and use washing up liquid and an old toothbrush to clean it.\n\nThere can be a chemical reaction to silver from sweat, plus other external chemicals in lotions, soaps and chlorine. Please remove your items before showering, exercising or swimming. Highly chlorinated pools will instantly change the silver to black, if you forget and need your items to be polished please contact us and we will advise you on the fee and lead time."
    }
  ];

  return (
    <main style={{ background: '#3d3428', minHeight: '100vh', paddingTop: '120px' }}>
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
            About
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
              color: '#E8E0D0',
              fontStyle: 'italic'
            }}>
              Jungli: animals and plants that live or grow in the wild.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              color: '#E8E0D0'
            }}>
              Jungli was born during the 2020 Lockdown. From a desire to create Jewellery I wanted to wear. Born and raised in London, my Jungle is a concrete one. Taking inspiration directly from my city, my spirituality and everyday parts of us being human.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              marginBottom: '2.5rem',
              color: '#E8E0D0'
            }}>
              I've created every piece by hand over the past 5 years with the intention of making artefacts that speak to our experience of being on this beautiful planet.
            </p>

            <p style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              color: '#E8E0D0'
            }}>
              Momin Isiah Hai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}
          >
            <img
              src="/assets/momin.jpeg"
              alt="Momin Isiah Hai"
              style={{
                width: '100%',
                maxWidth: '480px',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(0.9) contrast(1.05)'
              }}
            />
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
