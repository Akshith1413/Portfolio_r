import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Particle Field (unchanged)
const ParticleField = ({ count = 1500 }) => {
  const particlesRef = useRef();
  const particlesGeometry = useRef(new THREE.BufferGeometry());
  const particlesMaterial = useRef(
    new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
    })
  );

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return () => {
      particlesGeometry.current.dispose();
      particlesMaterial.current.dispose();
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.12;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry.current} material={particlesMaterial.current} />
  );
};

// Floating 3D Shapes (unchanged)
const FloatingShapes = () => {
  const shapesRef = useRef([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    shapesRef.current.forEach((shape, index) => {
      if (shape) {
        shape.rotation.x = time * 0.12;
        shape.rotation.y = time * 0.18;
        shape.position.y = Math.sin(time * 0.6 + index) * 0.6;
      }
    });
  });

  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.4, 256, 64);
  const sphereGeometry = new THREE.SphereGeometry(0.6, 64, 64);
  const sphere2Geometry = new THREE.SphereGeometry(0.5, 64, 64);

  return (
    <>
      <mesh
        ref={(el) => (shapesRef.current[0] = el)}
        geometry={torusKnotGeometry}
        position={[0, 0, -2]}
      >
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.95}
          roughness={0.05}
          emissive="#6366f1"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh
        ref={(el) => (shapesRef.current[1] = el)}
        geometry={sphereGeometry}
        position={[-2.5, 2, -1]}
      >
        <meshStandardMaterial
          color="#10b981"
          metalness={0.95}
          roughness={0.05}
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh
        ref={(el) => (shapesRef.current[2] = el)}
        geometry={sphere2Geometry}
        position={[2.5, -1.5, -3]}
      >
        <meshStandardMaterial
          color="#ec4899"
          metalness={0.9}
          roughness={0.1}
          emissive="#ec4899"
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
  );
};

const About = () => {
  const sectionRef = useRef();
  const contentRef = useRef();
  const imageContainerRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('education');

  // Check for mobile/small screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'education':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-cyan-300/20">
              <h3 className="text-xl font-bold text-cyan-200 mb-2">Amrita Vishwa Vidyapeetham</h3>
              <p className="text-white/90">B.Tech (Computer Science)</p>
              <p className="text-sm text-cyan-100/80 mt-2">2023 - 2027 (Ongoing)</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-pink-300/20">
              <h3 className="text-xl font-bold text-pink-200 mb-2">Alphores, Telangana</h3>
              <p className="text-white/90">Class 12</p>
              <p className="text-sm text-pink-100/80 mt-2">2021 - 2023</p>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-300/20">
              <h3 className="text-xl font-bold text-emerald-200 mb-2">Intel IoT Club</h3>
              <p className="text-white/90">Full Stack Developer</p>
              <p className="text-sm text-emerald-100/80 mt-2">Dec 2024 - Present · 8 mos</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-100">MERN Stack</span>
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-100">Front-End</span>
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-100">UI/UX</span>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-300/20">
              <h3 className="text-xl font-bold text-amber-200 mb-2">Learnflu</h3>
              <p className="text-white/90">Web Development Intern</p>
              <p className="text-sm text-amber-100/80 mt-2">May 2024 - Jul 2024 · 3 mos</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-amber-900/50 text-amber-100">UX Design</span>
                <span className="px-2 py-1 text-xs rounded-full bg-amber-900/50 text-amber-100">UI Design</span>
                <span className="px-2 py-1 text-xs rounded-full bg-amber-900/50 text-amber-100">Web Dev</span>
              </div>
            </div>
          </div>
        );
      case 'hobbies':
        return (
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Coding', icon: '💻', color: 'from-blue-900/30 to-blue-700/30' },
              { name: 'Photography', icon: '📷', color: 'from-purple-900/30 to-purple-700/30' },
              { name: 'Music', icon: '🎵', color: 'from-pink-900/30 to-pink-700/30' },
              { name: 'Travel', icon: '✈️', color: 'from-amber-900/30 to-amber-700/30' },
              { name: 'Reading', icon: '📚', color: 'from-emerald-900/30 to-emerald-700/30' },
              { name: 'Gaming', icon: '🎮', color: 'from-red-900/30 to-red-700/30' },
            ].map((hobby, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl bg-gradient-to-br ${hobby.color} border border-white/10 flex flex-col items-center justify-center hover:scale-105 transition-transform`}
              >
                <span className="text-2xl mb-2">{hobby.icon}</span>
                <p className="text-white/90 text-sm">{hobby.name}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-16 px-4 min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.2) 0%, rgba(15,23,42,1) 100%)',
        backgroundColor: '#0f172a'
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[15, 15, 15]} intensity={2} color="#3b82f6" />
          <pointLight position={[-15, -15, -15]} intensity={1} color="#8b5cf6" />
          <ParticleField count={1500} />
          <FloatingShapes />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row items-center'} gap-8 lg:gap-20`}>
          {/* Profile Image */}
          <div 
            ref={imageContainerRef}
            className={`${isMobile ? 'w-64 h-64 mb-12' : 'w-80 h-80'} rounded-2xl overflow-hidden transition-all duration-700 ease-out`}
            style={{
              transform: isMobile 
                ? `${isVisible ? 'translateY(0)' : 'translateY(-50px)'}`
                : `translate(${mousePos.x}px, ${mousePos.y}px) ${isVisible ? 'translateX(0)' : 'translateX(-100px)'}`,
              opacity: isVisible ? 1 : 0,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-6">
              <div
                className="relative w-full h-full rounded-xl overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '0.4s'
                }}
              >
                {/* Profile Image Placeholder */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <img 
                      src="/profile.jpg" 
                      alt="Ravula Akshith Profile"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        filter: 'brightness(0.9) contrast(1.1)'
                      }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
                <div className="absolute inset-0 border-4 border-white/10 rounded-xl pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentRef} 
            className={`${isMobile ? 'w-full max-w-md' : 'w-[760px]'} space-y-6 p-6 md:p-8 rounded-2xl transition-all duration-700 ease-out`}
            style={{
              transform: isMobile 
                ? `${isVisible ? 'translateY(0)' : 'translateY(50px)'}`
                : `${isVisible ? 'translateX(0)' : 'translateX(50px)'}`,
              opacity: isVisible ? 1 : 0,
              background: 'rgba(2, 6, 23, 0.3)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(125, 211, 252, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transitionDelay: '0.2s'
            }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-300 transition-all duration-800"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '0.4s'
              }}
            >
              About Me
            </h2>

            <p
              className="text-base md:text-lg text-gray-100 font-medium leading-relaxed transition-all duration-600"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '0.6s'
              }}
            >
              I'm a passionate Full Stack Developer and UI/UX Engineer with a knack for creating immersive digital experiences. My journey in technology combines technical expertise with creative problem-solving, allowing me to build solutions that are both functional and visually stunning. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or capturing moments through my lens.
            </p>

            {/* Interactive Tabs */}
            <div className="mt-8">
              <div className="flex space-x-2 mb-6">
                {['education', 'experience', 'hobbies'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-cyan-600/30 text-cyan-100 border border-cyan-400/30'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div
                className="transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '0.8s'
                }}
              >
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;