import { useRef, useEffect, useState } from 'react';

const TimelineItem = ({ year, title, description, company, isLast, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`timeline-item-container ${isVisible ? 'animate-in' : ''}`}
      ref={itemRef}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Timeline line */}
      <div className={`timeline-line ${isLast ? 'timeline-line-last' : ''}`} />
      
      {/* Animated dot */}
      <div className="timeline-dot-container">
        <div className="timeline-dot" />
        <div className="timeline-dot-hover-effect" />
      </div>
      
      <div className="timeline-content">
        {/* Glow effect */}
        <div className="timeline-content-glow" />
        
        <div className="timeline-content-inner">
          <div className="timeline-header">
            <h3 className="timeline-title">{title}</h3>
            <span className="timeline-year">
              {year}
            </span>
          </div>
          <p className="timeline-company">{company}</p>
          <p className="timeline-description">{description}</p>
        </div>
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
      description: 'Leading the development team in creating immersive web experiences using cutting-edge technologies like React, Three.js, and WebGL. Spearheaded the migration to Next.js, improving SEO and performance by 40%.'
    },
    {
      year: '2020 - 2023',
      title: 'Frontend Developer',
      company: 'Digital Dreams Agency',
      description: 'Developed interactive web applications with modern JavaScript frameworks. Implemented GSAP animations that increased user engagement by 25%. Collaborated with designers to create pixel-perfect UIs.'
    },
    {
      year: '2018 - 2020',
      title: 'UI/UX Designer',
      company: 'Creative Minds Studio',
      description: 'Designed user interfaces and interactive prototypes for clients across various industries. Conducted user research and testing that improved conversion rates by an average of 18% across projects.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

        /* Custom animations */
        .timeline-item-container {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-item-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-section {
          padding: 6rem 1rem;
          max-width: 80rem;
          margin-left: auto;
          margin-right: auto;
        }

        .timeline-header-container {
          text-align: center;
          margin-bottom: 5rem;
        }

        .timeline-main-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #6366f1, #8b5cf6);
        }

        .timeline-subtitle {
          font-size: 1.125rem;
          color: #9ca3af;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }

        .timeline-items-wrapper {
          position: relative;
        }

        .timeline-decorative-circle-1 {
          position: absolute;
          top: -5rem;
          left: -5rem;
          width: 16rem;
          height: 16rem;
          background-color: rgba(139, 92, 246, 0.1);
          border-radius: 9999px;
          filter: blur(48px);
          opacity: 0.3;
        }

        .timeline-decorative-circle-2 {
          position: absolute;
          bottom: 0;
          right: -5rem;
          width: 16rem;
          height: 16rem;
          background-color: rgba(99, 102, 241, 0.1);
          border-radius: 9999px;
          filter: blur(48px);
          opacity: 0.3;
        }

        .timeline-item-container {
          position: relative;
          padding-left: 4rem;
          padding-bottom: 4rem;
        }

        .timeline-line {
          position: absolute;
          left: 2rem;
          top: 0;
          width: 2px;
          background-image: linear-gradient(to bottom, #6366f1, #8b5cf6);
          height: 100%;
        }

        .timeline-line-last {
          height: 3rem;
        }

        .timeline-dot-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .timeline-dot {
          width: 1rem;
          height: 1rem;
          background-color: #6366f1;
          border-radius: 9999px;
          box-shadow: 0 0 0 0.5rem rgba(99, 102, 241, 0.2);
          transition: all 0.3s ease;
        }

        .timeline-item-container:hover .timeline-dot {
          box-shadow: 0 0 0 0.5rem rgba(99, 102, 241, 0.4);
          transform: scale(1.25);
        }

        .timeline-dot-hover-effect {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background-color: rgba(99, 102, 241, 0.1);
          transform: scale(0);
          transition: all 0.5s ease;
        }

        .timeline-item-container:hover .timeline-dot-hover-effect {
          transform: scale(1);
        }

        .timeline-content {
          position: relative;
          background-image: linear-gradient(to bottom right, #111827, #1f2937);
          border: 1px solid #374151;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .timeline-item-container:hover .timeline-content {
          border-color: #818cf8;
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04);
        }

        .timeline-content-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .timeline-item-container:hover .timeline-content-glow {
          opacity: 1;
        }

        .timeline-content-inner {
          position: relative;
          z-index: 10;
        }

        .timeline-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .timeline-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .timeline-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .timeline-year {
          display: inline-block;
          background-color: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          font-family: 'IBM Plex Mono', monospace;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .timeline-year {
            font-size: 1rem;
          }
        }

        .timeline-company {
          color: #a5b4fc;
          font-weight: 500;
          margin-bottom: 1rem;
          font-style: italic;
        }

        .timeline-description {
          color: #d1d5db;
          line-height: 1.625;
        }
      `}</style>
      
      <section className="timeline-section">
        <div className="timeline-header-container">
          <h2 className="timeline-main-title">Professional Journey</h2>
          <p className="timeline-subtitle">
            My career path through the years, highlighting key positions and achievements
          </p>
        </div>
        
        <div className="timeline-items-wrapper">
          {/* Decorative elements */}
          <div className="timeline-decorative-circle-1" />
          <div className="timeline-decorative-circle-2" />
          
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={index}
              {...item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Timeline;