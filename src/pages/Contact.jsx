import { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will be replaced with actual form handling later
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>
      <section className="content-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          <motion.h1
            style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '3.5rem',
              fontWeight: 'normal',
              textAlign: 'center',
              marginBottom: '2rem',
              transform: 'rotate(-1deg)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>

          <motion.p
            style={{
              fontFamily: "'Evil Green Plant', serif",
              fontSize: '1.3rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#444'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We'd love to hear from you. Whether you have a question about our pieces, want to commission a custom design, or just want to say hello.
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 style={{
                fontFamily: "'Evil Green Plant', serif",
                fontSize: '2rem',
                fontWeight: 'normal',
                marginBottom: '1.5rem',
                transform: 'rotate(1deg)'
              }}>
                Contact Information
              </h2>

              <div style={{ fontFamily: "'Evil Green Plant', serif", fontSize: '1.2rem', lineHeight: '2.5' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Email:</strong><br />
                  <a href="mailto:hello@jungli.com" style={{ color: '#222', textDecoration: 'underline' }}>
                    hello@jungli.com
                  </a>
                </p>

                <p style={{ marginBottom: '1rem' }}>
                  <strong>Studio Hours:</strong><br />
                  Monday - Friday: 9am - 5pm<br />
                  Saturday: By appointment<br />
                  Sunday: Closed
                </p>

                <p>
                  <strong>Response Time:</strong><br />
                  We typically respond within 24-48 hours
                </p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              style={{
                border: '2px solid #222',
                padding: '2rem',
                backgroundColor: '#fff',
                transform: 'rotate(-1deg)'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ rotate: 0.5 }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #222',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1rem',
                    backgroundColor: '#F8F5F2'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #222',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1rem',
                    backgroundColor: '#F8F5F2'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #222',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1rem',
                    backgroundColor: '#F8F5F2'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #222',
                    fontFamily: "'Evil Green Plant', serif",
                    fontSize: '1rem',
                    backgroundColor: '#F8F5F2',
                    resize: 'vertical'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                style={{
                  fontFamily: "'Evil Green Plant', serif",
                  fontSize: '1.2rem',
                  padding: '1rem 2rem',
                  backgroundColor: '#222',
                  color: '#F8F5F2',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'normal'
                }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
