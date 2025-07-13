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

  // Check for mobile/small screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Intersection Observer (unchanged)
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

  // Mouse move effect (unchanged)
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
      {/* 3D Background (unchanged) */}
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
                      src="/public/profile.jpg" 
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
              I'm a passionate Full Stack Developer and UI/UX Engineer creating immersive digital experiences.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 transition-all duration-800"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '0.8s'
              }}
            >
              {[
                { label: 'Name', value: 'Ravula Akshith' },
                { label: 'Email', value: 'akshith@example.com' },
                { label: 'From', value: 'San Francisco, CA' },
                { label: 'Freelance', value: 'Available' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg transition-all duration-500 hover:transform hover:-translate-y-1 hover:border-cyan-300/30"
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(125, 211, 252, 0.1)',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${0.9 + index * 0.1}s`
                  }}
                >
                  <h4 className="text-xs text-cyan-300 font-mono">{item.label}</h4>
                  <p className="text-white font-medium text-base mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;