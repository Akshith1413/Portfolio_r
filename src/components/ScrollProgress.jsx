// src/components/ScrollProgress.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollProgress = () => {
  const progressRef = useRef();

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / documentHeight) * 100;
      
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power1.out'
      });
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ScrollProgress;