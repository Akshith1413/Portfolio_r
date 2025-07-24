import React, { createContext, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AnimationContext.Provider value={{ containerRef }}>
      <div ref={containerRef}>{children}</div>
    </AnimationContext.Provider>
  );
};