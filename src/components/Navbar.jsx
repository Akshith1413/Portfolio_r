// src/components/Navbar.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // ✅ Correct placement

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', type: 'section' },
    { id: 'about', label: 'About', type: 'section' },
    { id: 'projects', label: 'Projects', type: 'section' },
    { id: 'skills', label: 'Skills', type: 'section' },
    { id: 'timeline', label: 'Journey', type: 'section' },
    { id: 'contact', label: 'Contact', type: 'section' },
    { id: 'resume', label: 'Resume', type: 'route' },
    { id: 'blog', label: 'Blog', type: 'route' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-gray-900/90 backdrop-blur-md shadow-lg' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          PORTFOLIO
        </motion.a>

        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.type === 'route' ? `/${item.id}` : `#${item.id}`}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeSection === item.id && item.type === 'section'
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (item.type === 'route') {
                  navigate(`/${item.id}`);
                } else {
                  onNavigate(item.id);
                }
              }}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
              {activeSection === item.id && item.type === 'section' && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                  layoutId="navUnderline"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="md:hidden text-gray-300 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
