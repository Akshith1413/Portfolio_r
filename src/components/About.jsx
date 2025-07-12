// src/components/About.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      },
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="relative">
          <div className="relative w-full h-80 lg:h-full rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-cyan-400 transition-all duration-300">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-400/10 rounded-2xl border border-cyan-400/30 -z-10" />
        </div>

        <div ref={contentRef} className="space-y-6">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            About Me
          </h2>
          
          <p className="text-gray-300">
            I'm a passionate frontend developer with expertise in creating immersive digital experiences. 
            With 5+ years in the industry, I specialize in React, animation frameworks, and modern CSS.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { label: 'Name', value: 'Your Name' },
              { label: 'Email', value: 'hello@example.com' },
              { label: 'From', value: 'San Francisco, CA' },
              { label: 'Freelance', value: 'Available' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-cyan-400 transition-all"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-sm text-gray-400">{item.label}</h4>
                <p className="text-white font-medium">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;