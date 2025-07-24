import { useRef, useEffect, useState } from 'react';

const TechSphere = () => {
  const sphereRef = useRef();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const techIcons = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#8CC84B' },
    { name: 'IoT', color: '#FF6B6B' },
    { name: 'Flutter', color: '#42A5F5' },
    { name: 'Arduino', color: '#00979D' },
    { name: 'Three.js', color: '#000000' },
    { name: 'GSAP', color: '#88CE02' },
    { name: 'MongoDB', color: '#47A248' }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div 
        className="relative w-80 h-80"
        style={{ 
          transform: `rotateY(${rotation * 50}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-pulse" />
        
        {techIcons.map((tech, i) => {
          const angle = (i / techIcons.length) * Math.PI * 2;
          const radius = 120;
          const x = Math.cos(angle + rotation) * radius;
          const y = Math.sin(angle + rotation) * radius;
          const z = Math.sin(rotation * 0.5 + i) * 20;
          
          return (
            <div
              key={tech.name}
              className="absolute w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{
                backgroundColor: tech.color,
                left: `50%`,
                top: `50%`,
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                opacity: 0.8,
                animation: `float ${2 + i * 0.5}s ease-in-out infinite alternate`
              }}
            >
              {tech.name.slice(0, 2)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getKeyFeatures = (project) => {
  let features = [];
  
  switch(project.category) {
    case 'iot':
      features = [
        'Remote monitoring',
        'Real-time data collection',
        'Cross-platform control',
        'Automated alerts',
        'Energy efficient'
      ];
      break;
    case 'fullstack':
      features = [
        'Responsive design',
        'Secure authentication',
        'Database integration',
        'API endpoints',
        'Admin dashboard'
      ];
      break;
    case 'embedded':
      features = [
        'Low power consumption',
        'Real-time processing',
        'Hardware interfaces',
        'Firmware updates',
        'Compact design'
      ];
      break;
    case 'mobile':
      features = [
        'Cross-platform support',
        'Offline functionality',
        'Push notifications',
        'Device integration',
        'User analytics'
      ];
      break;
    case 'uiux':
      features = [
        'Accessibility compliant',
        'Dark mode support',
        'Design system',
        'Interactive prototypes',
        'User testing'
      ];
      break;
    default:
      features = [
        'Modern design',
        'High performance',
        'Scalable architecture',
        'Documentation',
        'Testing suite'
      ];
  }
  
  if (project.features) {
    return project.features;
  }
  
  const featureCount = project.tags.length > 4 ? 5 : 3;
  return features.slice(0, featureCount);
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const tiltX = (mousePosition.y - 0.5) * 20;
  const tiltY = -(mousePosition.x - 0.5) * 20;

  return (
    <div
      ref={cardRef}
      className={`relative h-96 w-full transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ 
        perspective: '1000px',
        transitionDelay: `${index * 100}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="absolute inset-0 w-full h-full transition-all duration-500 cursor-pointer"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${isHovered ? tiltX : 0}deg) rotateY(${(isHovered ? tiltY : 0) + (isFlipped ? 180 : 0)}deg) translateY(${isHovered ? '-10px' : '0'})`
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(30px)',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(8, 145, 178, 0.3)' 
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="relative h-1/2 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
            {project.image ? (
              <>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </>
            ) : (
              <div className="text-gray-500 text-center p-4">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Project Preview</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400 transform transition-all duration-300"
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {project.title}
              </span>
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-2">
              {project.description}
            </p>
            <div 
              className="flex items-center text-cyan-400 transition-all duration-300"
              style={{ transform: isHovered ? 'translateX(5px)' : 'translateX(0)' }}
            >
              <span>View Details</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-cyan-400/30 shadow-xl p-6 flex flex-col"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'translateZ(30px) rotateY(180deg)'
          }}
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.details}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {getKeyFeatures(project).map((feature, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <a 
              href={project.liveUrl} 
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 text-center hover:scale-105"
            >
              Live Demo
            </a>
            <a 
              href={project.codeUrl} 
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 text-center hover:scale-105"
            >
              View Code
            </a>
          </div>
          
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'iot', name: 'IoT' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'embedded', name: 'Embedded Systems' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'uiux', name: 'UI/UX' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
            activeCategory === category.id
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

const AnimatedParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * Math.PI * 2
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/10 transition-all duration-1000"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `pulse ${2 + particle.id * 0.1}s ease-in-out infinite alternate`
          }}
        />
      ))}
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewAll, setViewAll] = useState(false);

  const projectsData = [
    {
      id: 1,
      title: "Smart Home IoT System",
      description: "Home automation with ESP32 and React dashboard for seamless control",
      details: "Complete IoT solution with sensor network and mobile app control. Features real-time monitoring, automated lighting, temperature control, and security alerts with machine learning predictions.",
      tags: ["IoT", "ESP32", "React", "Node.js", "MongoDB"],
      category: 'iot',
      features: [
        "Real-time sensor monitoring",
        "Mobile app control",
        "Automated lighting",
        "Energy usage tracking",
        "Voice command integration"
      ],
      image: "/icons/smarthome.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack online store with payment processing and inventory management",
      details: "Built with MERN stack featuring advanced product management, shopping cart system, Stripe payment integration, order tracking, and admin dashboard with analytics.",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
      category: 'fullstack',
      features: [
        "Product catalog",
        "Shopping cart",
        "Stripe payments",
        "Order tracking",
        "Admin dashboard"
      ],
      image: "/icons/eccommerce.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Embedded Vehicle Tracker",
      description: "GPS tracking device with cellular connectivity and real-time monitoring",
      details: "Low-power STM32-based tracker with Flutter companion app for fleet management. Features geofencing, route optimization, and predictive maintenance alerts.",
      tags: ["STM32", "Embedded", "Flutter", "GPS", "C++"],
      category: 'embedded',
      features: [
        "GPS tracking",
        "Low power design",
        "Fleet management",
        "Geofencing",
        "Predictive maintenance"
      ],
      image: "/icons/embeddedvehcile.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 4,
      title: "Health Monitoring App",
      description: "Cross-platform mobile app for comprehensive health tracking",
      details: "Flutter application with Bluetooth device integration, Firebase backend, and AI-powered health insights. Tracks vitals, medications, and provides personalized recommendations.",
      tags: ["Flutter", "Mobile", "Firebase", "Bluetooth", "AI"],
      category: 'mobile',
      features: [
        "Vital signs tracking",
        "Medication reminders",
        "Bluetooth sync",
        "Health insights",
        "Cross-platform"
      ],
      image: "/icons/health.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 5,
      title: "UI Component Library",
      description: "Modern design system for enterprise applications",
      details: "React component library with Storybook documentation, accessibility features, and automated testing. Includes 50+ components with dark mode support and responsive design.",
      tags: ["React", "Design System", "Storybook", "Figma", "TypeScript"],
      category: 'uiux',
      features: [
        "50+ components",
        "Dark mode",
        "Accessibility",
        "Storybook docs",
        "Responsive"
      ],
      image: "/icons/ui component.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 6,
      title: "Industrial IoT Monitor",
      description: "Factory equipment monitoring system with predictive analytics",
      details: "Python-based data processing with React visualization dashboard for predictive maintenance. Features machine learning algorithms for anomaly detection and downtime prevention.",
      tags: ["Python", "React", "IoT", "ML", "TensorFlow"],
      category: 'iot',
      features: [
        "Equipment monitoring",
        "Predictive analytics",
        "Anomaly detection",
        "Dashboard visualization",
        "ML integration"
      ],
      image: "/icons/industrial.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 7,
      title: "Blockchain Voting System",
      description: "Secure voting platform using blockchain technology",
      details: "Ethereum-based voting system with smart contracts, ensuring transparency and immutability. Features voter authentication, real-time results, and audit trails.",
      tags: ["Blockchain", "Ethereum", "Solidity", "Web3", "React"],
      category: 'fullstack',
      features: [
        "Smart contracts",
        "Voter authentication",
        "Real-time results",
        "Audit trails",
        "Immutable records"
      ],
      image: "/icons/blockchain.png",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 8,
      title: "AR Shopping Experience",
      description: "Augmented reality app for virtual product try-ons",
      details: "React Native application with AR capabilities for furniture and fashion retailers. Includes 3D product visualization, virtual fitting rooms, and social sharing features.",
      tags: ["React Native", "AR", "3D", "Mobile", "ARCore"],
      category: 'mobile',
      features: [
        "3D product visualization",
        "Virtual try-on",
        "ARCore integration",
        "Social sharing",
        "Cross-platform"
      ],
      image: "/icons/ar.png",
      liveUrl: "#",
      codeUrl: "#"
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const displayedProjects = viewAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="relative min-h-screen py-20 px-4 overflow-hidden bg-gray-950">
        
        <AnimatedParticles />
        
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <TechSphere />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                My Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Interactive showcase of my work across IoT, full stack, embedded systems, and mobile development
            </p>
          </div>

          <CategoryFilter 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {filteredProjects.length > 6 && !viewAll && (
            <div className="text-center mt-16">
              <button
                onClick={() => setViewAll(true)}
                className="inline-flex items-center px-8 py-3 border border-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-900/50 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                View All {filteredProjects.length} Projects
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;