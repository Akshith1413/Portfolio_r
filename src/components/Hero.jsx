import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, Sphere, RoundedBox, Text3D, Cone, Ring, TorusKnot } from '@react-three/drei';
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
        position={[-4, 2, -5]}
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
        position={[3, -1, -7]}
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
        position={[0, 3, -10]}
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
        position={[5, 0, -8]}
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
        position={[-5, -2, -6]}
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
        position={[0, -3, -12]}
        onPointerOver={() => handleShapeHover('knot')}
        onPointerOut={handleShapeLeave}
      >
        <meshStandardMaterial 
          color={hoveredShape === 'knot' ? "#00ff88" : "#6366f1"} 
          metalness={0.8}
          roughness={0.2}
        />
      </TorusKnot>

      {/* 3D Name Text - Using built-in font */}
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        position={[0, -2, -2]}
        rotation={[0, Math.PI / 8, 0]}
      >
        Ravula Akshith
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#06b6d4" 
          emissiveIntensity={0.5} 
        />
      </Text3D>
    </>
  );
};

// Hero Component
const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)`,
          }}
        >
          Ravula Akshith
        </h1>

        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A passionate developer with a love for creating innovative solutions and exploring the world of technology.
          Join me on this journey of discovery and creativity!
        </motion.p>

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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