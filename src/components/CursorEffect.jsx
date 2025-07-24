import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      const hoverables = document.querySelectorAll('a, button, .hover-effect');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    const handleClick = () => {
      window.addEventListener('mousedown', () => setIsClicking(true));
      window.addEventListener('mouseup', () => setIsClicking(false));
    };

    window.addEventListener('mousemove', moveCursor);
    handleHover();
    handleClick();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-white/10 border border-cyan-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 2 : 1,
          opacity: isClicking ? 0.7 : 1
        }}
        transition={{ type: 'spring', mass: 0.1 }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 0.5 : 1
        }}
        transition={{ type: 'spring', mass: 0.1 }}
      />
    </>
  );
};

export default CursorEffect;