// src/components/Projects.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Neon Futuristic Dashboard",
    description: "A cutting-edge admin dashboard with real-time analytics and 3D data visualization using Three.js.",
    tags: ["React", "Three.js", "GSAP", "Tailwind"],
    imageUrl: "/project1.jpg",
    liveUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Augmented Reality Web App",
    description: "Web-based AR experience that allows users to visualize products in their environment before purchasing.",
    tags: ["AR.js", "React", "WebGL", "Framer Motion"],
    imageUrl: "/project2.jpg",
    liveUrl: "#",
    codeUrl: "#"
  },
  {
    title: "AI-Powered Design Tool",
    description: "Machine learning application that generates UI designs based on natural language prompts.",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    imageUrl: "/project3.jpg",
    liveUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Blockchain Explorer",
    description: "Interactive visualization tool for exploring blockchain transactions and network activity.",
    tags: ["Web3.js", "Ethereum", "D3.js", "React"],
    imageUrl: "/project4.jpg",
    liveUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Voice-Controlled Portfolio",
    description: "Experimental portfolio that can be navigated using voice commands and gestures.",
    tags: ["Voice Recognition", "TensorFlow.js", "React", "GSAP"],
    imageUrl: "/project5.jpg",
    liveUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Metaverse Gallery",
    description: "3D virtual exhibition space for digital art and NFTs with WebXR compatibility.",
    tags: ["Three.js", "WebXR", "React", "Blender"],
    imageUrl: "/project6.jpg",
    liveUrl: "#",
    codeUrl: "#"
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out"
    });
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-cyan-400"
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
          </motion.a>
          <motion.a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(subtitleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 bg-gray-950 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Featured Projects
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Explore my collection of innovative projects showcasing cutting-edge technologies and creative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center px-8 py-3 border border-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-900/50 hover:border-cyan-400 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;