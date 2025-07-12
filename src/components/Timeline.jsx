// src/components/Timeline.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ year, title, description, company, isLast }) => {
  const itemRef = useRef();
  const lineRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    gsap.from([itemRef.current, lineRef.current, dotRef.current], {
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="relative pl-12 pb-10" ref={itemRef}>
      {/* Timeline line */}
      <div 
        ref={lineRef}
        className={`absolute left-6 top-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 ${isLast ? 'h-10' : 'h-full'}`}
      />
      
      {/* Animated dot */}
      <div 
        ref={dotRef}
        className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center"
      >
        <div className="w-5 h-5 bg-cyan-400 rounded-full ring-4 ring-blue-500/30 animate-pulse" />
      </div>
      
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg hover:border-cyan-400 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-cyan-400 font-mono">{year}</span>
        </div>
        <p className="text-gray-400 italic mb-3">{company}</p>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const timelineData = [
    {
      year: '2023 - Present',
      title: 'Senior Frontend Developer',
      company: 'FutureTech Innovations',
      description: 'Leading the development of immersive web experiences using React, Three.js, and WebGL.'
    },
    {
      year: '2020 - 2023',
      title: 'Frontend Developer',
      company: 'Digital Dreams Agency',
      description: 'Created interactive web applications with modern JavaScript frameworks and GSAP animations.'
    },
    {
      year: '2018 - 2020',
      title: 'UI/UX Designer',
      company: 'Creative Minds Studio',
      description: 'Designed user interfaces and prototypes for various clients across different industries.'
    }
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Professional Journey
      </h2>
      
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItem 
            key={index}
            {...item}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;