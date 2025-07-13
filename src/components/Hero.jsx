import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, Sphere, RoundedBox, Cone, Ring, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 3D Floating Shapes Component
const FloatingShapes = () => {
  const torusRef = useRef();
  const sphereRef = useRef();
  const boxRef = useRef();
  const coneRef = useRef();
  const ringRef = useRef();
  const knotRef = useRef();
  const [hoveredShape, setHoveredShape] = useState(null);
  const [initialPositions] = useState({
    torus: { x: -10, y: 2, z: -5 },
    sphere: { x: 10, y: -1, z: -7 },
    box: { x: -8, y: 3, z: -10 },
    cone: { x: 12, y: 0, z: -8 },
    ring: { x: -12, y: -2, z: -6 },
    knot: { x: 8, y: -3, z: -12 }
  });

  // Initialize shape positions
  useEffect(() => {
    // Animate shapes from their initial positions to final positions
    gsap.to(torusRef.current.position, {
      x: -4,
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(sphereRef.current.position, {
      x: 3,
      duration: 2,
      delay: 0.2,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(boxRef.current.position, {
      x: 0,
      duration: 2,
      delay: 0.4,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(coneRef.current.position, {
      x: 5,
      duration: 2,
      delay: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(ringRef.current.position, {
      x: -5,
      duration: 2,
      delay: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(knotRef.current.position, {
      x: 0,
      duration: 2,
      delay: 1,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Animate shapes
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }
    if (boxRef.current) {
      boxRef.current.rotation.z = time * 0.4;
    }
    if (coneRef.current) {
      coneRef.current.rotation.x = time * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 0.2;
    }
    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.1;
      knotRef.current.rotation.y = time * 0.15;
    }
  });

  const handleShapeHover = (shape) => {
    setHoveredShape(shape);
    const shapeRef = {
      torus: torusRef,
      sphere: sphereRef,
      box: boxRef,
      cone: coneRef,
      ring: ringRef,
      knot: knotRef
    }[shape];
    
    if (shapeRef.current) {
      gsap.to(shapeRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
      });
    }
  };

  const handleShapeLeave = () => {
    if (hoveredShape) {
      const shapeRef = {
        torus: torusRef,
        sphere: sphereRef,
        box: boxRef,
        cone: coneRef,
        ring: ringRef,
        knot: knotRef
      }[hoveredShape];
      
      if (shapeRef.current) {
        gsap.to(shapeRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        });
      }
    }
    setHoveredShape(null);
  };

  return (
    <>
      {/* Floating Torus (3D Ring) */}
      <Torus
        ref={torusRef}
        args={[1.2, 0.4, 16, 32]}
        position={[initialPositions.torus.x, initialPositions.torus.y, initialPositions.torus.z]}
        rotation={[Math.PI / 3, Math.PI / 3, 0]}
        onPointerOver={() => handleShapeHover('torus')}
        onPointerOut={handleShapeLeave}
      >
        <meshPhongMaterial 
          color={hoveredShape === 'torus' ? "#ff00ff" : "#06b6d4"} 
          emissive={hoveredShape === 'torus' ? "#ff00ff" : "#06b6d4"} 
          emissiveIntensity={0.8} 
          wireframe 
        />
      </Torus>

      {/* Floating Sphere */}
      <Sphere
        ref={sphereRef}
        args={[1.5, 32, 32]}
        position={[initialPositions.sphere.x, initialPositions.sphere.y, initialPositions.sphere.z]}
        onPointerOver={() => handleShapeHover('sphere')}
        onPointerOut={handleShapeLeave}
      >
        <meshStandardMaterial 
          color={hoveredShape === 'sphere' ? "#00ffcc" : "#3b82f6"} 
          transparent 
          opacity={0.8} 
          roughness={0.2} 
          metalness={hoveredShape === 'sphere' ? 1 : 0.7} 
        />
      </Sphere>

      {/* Floating Rounded Box */}
      <RoundedBox
        ref={boxRef}
        args={[2, 2, 2]}
        radius={0.2}
        smoothness={10}
        position={[initialPositions.box.x, initialPositions.box.y, initialPositions.box.z]}
        onPointerOver={() => handleShapeHover('box')}
        onPointerOut={handleShapeLeave}
      >
        <meshPhongMaterial 
          color={hoveredShape === 'box' ? "#ffcc00" : "#8b5cf6"} 
          emissive={hoveredShape === 'box' ? "#ffcc00" : "#8b5cf6"} 
          emissiveIntensity={0.5} 
          wireframe={hoveredShape !== 'box'}
        />
      </RoundedBox>

      {/* Floating Cone */}
      <Cone
        ref={coneRef}
        args={[1, 2, 32]}
        position={[initialPositions.cone.x, initialPositions.cone.y, initialPositions.cone.z]}
        rotation={[Math.PI / 4, 0, Math.PI / 4]}
        onPointerOver={() => handleShapeHover('cone')}
        onPointerOut={handleShapeLeave}
      >
        <meshStandardMaterial 
          color={hoveredShape === 'cone' ? "#ff6600" : "#10b981"} 
          metalness={0.9}
          roughness={0.1}
        />
      </Cone>

      {/* Floating Ring */}
      <Ring
        ref={ringRef}
        args={[1, 1.5, 32]}
        position={[initialPositions.ring.x, initialPositions.ring.y, initialPositions.ring.z]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => handleShapeHover('ring')}
        onPointerOut={handleShapeLeave}
      >
        <meshPhongMaterial 
          color={hoveredShape === 'ring' ? "#ff0066" : "#ec4899"} 
          emissive={hoveredShape === 'ring' ? "#ff0066" : "#ec4899"} 
          emissiveIntensity={0.6}
        />
      </Ring>

      {/* Floating Torus Knot */}
      <TorusKnot
        ref={knotRef}
        args={[1, 0.4, 128, 32]}
        position={[initialPositions.knot.x, initialPositions.knot.y, initialPositions.knot.z]}
        onPointerOver={() => handleShapeHover('knot')}
        onPointerOut={handleShapeLeave}
      >
        <meshStandardMaterial 
          color={hoveredShape === 'knot' ? "#00ff88" : "#6366f1"} 
          metalness={0.8}
          roughness={0.2}
        />
      </TorusKnot>
    </>
  );
};

// Animated Text Component
const AnimatedText = ({ text, delay = 0 }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Skill Tag Component
const SkillTag = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
      style={{
        background: isHovered 
          ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" 
          : "rgba(255, 255, 255, 0.1)",
        color: isHovered ? "white" : "#e2e8f0",
        border: isHovered ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
      }}
      whileHover={{ 
        scale: 1.1,
        y: -3,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};

// Hero Component
const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  
  const words = ["Developer", "Designer", "Engineer", "Creator"];
  const skills = [
    "Full Stack", "React", "Node.js", "MongoDB", 
    "Flutter", "Android", "IoT", "Embedded",
    "UI/UX", "C/C++", "Java", "Python"
  ];

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Title animation
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    });

    // Subtitle animation
    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 0.3,
      ease: "elastic.out(1, 0.5)",
    });

    // Scroll-triggered animations
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0.5,
      y: 100,
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800"
      id="home"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <FloatingShapes />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Hello I'm text */}
        <motion.div 
          className="text-2xl md:text-3xl font-light text-gray-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <AnimatedText text="Hello, I'm" delay={0.2} />
        </motion.div>

        {/* Main Name */}
        <h1 
          ref={titleRef}
          className="text-6xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)`,
          }}
        >
          Ravula Akshith
        </h1>

        {/* Rotating Word - Increased height to prevent cutting */}
        <div className="h-20 md:h-24 overflow-hidden relative mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ lineHeight: '1.2' }}
            >
              {words[currentWord]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Crafting digital experiences that blend innovation with functionality
        </motion.p>

        {/* Skills Tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {skills.map((skill, index) => (
            <SkillTag key={index}>{skill}</SkillTag>
          ))}
        </motion.div>

        {/* Hire Me Button */}
        <motion.a
          href="#contact"
          className="relative px-8 py-3 rounded-full font-medium overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></span>
          <span className="absolute inset-0.5 bg-gray-900 rounded-full"></span>
          <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
            Hire Me
          </span>
        </motion.a>

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full mt-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;