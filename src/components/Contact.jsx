// src/components/Contact.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Floating elements animation
    const floatingElements = gsap.utils.toArray('.floating-element');
    
    floatingElements.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? 20 : -20,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Form reveal animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      id="contact"
    >
      {/* Floating decorative elements */}
      <div className="floating-element absolute top-20 left-10 w-16 h-16 rounded-full bg-cyan-400/20 blur-xl" />
      <div className="floating-element absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-500/20 blur-xl" />
      <div className="floating-element absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-purple-500/20 blur-xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Build The Future
        </motion.h2>
        
        <motion.p 
          className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? Send me a message and let's create something amazing together.
        </motion.p>
        
        <div 
          ref={formRef}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl"
        >
          {submitStatus === 'success' && (
            <motion.div 
              className="mb-6 p-4 bg-green-900/30 border border-green-400 rounded-lg text-green-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div 
              className="mb-6 p-4 bg-red-900/30 border border-red-400 rounded-lg text-red-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Oops! Something went wrong. Please try again later.
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;