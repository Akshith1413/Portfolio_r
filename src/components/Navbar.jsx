// src/components/Navbar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo_tran.png';

const Navbar = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    { id: 'certifications', label: 'Certifications', type: 'section' },
    { id: 'testimonials', label: 'Testimonials', type: 'section' },
    { id: 'contact', label: 'Contact', type: 'section' },
    { id: 'resume', label: 'Resume', type: 'route' }
  ];

  const handleNavigation = (item) => {
    if (item.type === 'route') {
      navigate(`/${item.id}`);
    } else {
      if (window.location.pathname === '/') {
        onNavigate?.(item.id);
      } else {
        navigate('/', { 
          state: { scrollTo: item.id },
          replace: true 
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2 bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-gray-800/50' 
          : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center relative z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation({ id: 'home', type: 'section' });
          }}
        >
          <motion.img 
            src={Logo} 
            alt="Logo" 
            className="h-12 sm:h-14 w-auto"
            whileHover={{ 
              filter: "brightness(1.2) drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 relative">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id && item.type === 'section';
            const isHovered = hoveredItem === item.id;
            
            return (
              <motion.div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.a
                  href={item.type === 'route' ? `/${item.id}` : `#${item.id}`}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 block ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10'
                      : isHovered
                      ? 'text-white bg-gray-800/50'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.7 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0, x: "-50%" }}
                      animate={{ opacity: 1, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        type: "spring", 
                        bounce: 0.3, 
                        duration: 0.6 
                      }}
                    />
                  )}
                  
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg border border-gray-600/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg border border-cyan-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        {/* Mobile Menu Button */}
<motion.button
  className="md:hidden text-gray-300 focus:outline-none p-2 rounded-lg hover:bg-gray-800/50 transition-colors relative z-50"
  whileTap={{ scale: 0.9 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 1.8 }}
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle menu"
>
  <AnimatePresence mode="wait">
    {mobileMenuOpen ? (
      <motion.div
        key="close"
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          transition: { 
            type: "spring",
            stiffness: 300,
            damping: 15
          }
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.svg 
          className="w-8 h-8"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1
          }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </motion.svg>
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-500/10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        />
      </motion.div>
    ) : (
      <motion.svg 
        key="menu"
        className="w-6 h-6"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </motion.svg>
    )}
  </AnimatePresence>
</motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40"
              style={{ height: '100vh' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="h-full overflow-y-auto pt-24 pb-10 px-6">
                <motion.ul 
                  className="flex flex-col space-y-4 flex-grow"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id && item.type === 'section';
                    
                    return (
                      <motion.li
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.a
                          href={item.type === 'route' ? `/${item.id}` : `#${item.id}`}
                          className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all ${
                            isActive
                              ? 'text-cyan-300 bg-cyan-500/10'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item);
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center">
                            <span>{item.label}</span>
                            {isActive && (
                              <motion.span
                                className="ml-2 w-2 h-2 bg-cyan-400 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                              />
                            )}
                          </div>
                        </motion.a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navbar border effect */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;