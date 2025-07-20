import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO, TechNova",
    content: "Working with this developer was transformative for our platform. Their innovative approach to performance optimization increased our user retention by 40%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    color: "from-cyan-400 to-blue-500",
    pattern: "circuit-board",
    tech: ["React", "Node.js", "AWS"]
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Product Lead, DesignHub",
    content: "The UI/UX work delivered exceeded all expectations. Our conversion rates improved dramatically thanks to their intuitive design solutions.",
    rating: 5,
    image: "/icons/sarah.jpg",
    color: "from-purple-400 to-fuchsia-500",
    pattern: "floating-cogs",
    tech: ["Figma", "CSS3", "GSAP"]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO, IoT Solutions",
    content: "Their embedded systems expertise helped us solve critical hardware-software integration challenges we'd struggled with for months.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    color: "from-emerald-400 to-teal-500",
    pattern: "binary-code",
    tech: ["C++", "Python", "Raspberry Pi"]
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Mobile Lead, AppVenture",
    content: "The Flutter application they built performs flawlessly across platforms while maintaining beautiful native-like experiences.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    color: "from-amber-400 to-orange-500",
    pattern: "app-icons",
    tech: ["Flutter", "Dart", "Firebase"]
  },
  {
    id: 5,
    name: "David Kim",
    role: "Engineering Director, WebScale",
    content: "One of the most technically proficient full-stack developers I've worked with. Delivered complex features ahead of schedule.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    color: "from-rose-400 to-pink-500",
    pattern: "server-rack",
    tech: ["TypeScript", "GraphQL", "Docker"]
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 15 : -15 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
};

const TechPill = ({ tech, index }) => {
  const colors = [
    'bg-blue-500/20 text-blue-400',
    'bg-purple-500/20 text-purple-400',
    'bg-green-500/20 text-green-400',
    'bg-yellow-500/20 text-yellow-400',
    'bg-red-500/20 text-red-400'
  ];
  const colorIndex = index % colors.length;

  return (
    <motion.span 
      className={`text-xs px-3 py-1 rounded-full ${colors[colorIndex]}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20, delay: index * 0.1 }}
    >
      {tech}
    </motion.span>
  );
};

const PatternBackground = ({ pattern }) => {
  const patterns = {
    'circuit-board': (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
        <circle cx="50" cy="20" r="2" fill="currentColor" />
        <circle cx="80" cy="20" r="2" fill="currentColor" />
        <circle cx="20" cy="50" r="2" fill="currentColor" />
        <circle cx="80" cy="50" r="2" fill="currentColor" />
        <circle cx="20" cy="80" r="2" fill="currentColor" />
        <circle cx="50" cy="80" r="2" fill="currentColor" />
        <circle cx="80" cy="80" r="2" fill="currentColor" />
      </svg>
    ),
    'floating-cogs': (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M30,30 L40,20 L50,30 L60,20 L70,30 L80,20" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M20,40 L30,50 L20,60 L30,70 L20,80" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M80,40 L70,50 L80,60 L70,70 L80,80" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M30,80 L40,70 L50,80 L60,70 L70,80" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
    'binary-code': (
      <div className="absolute inset-0 w-full h-full opacity-10 flex flex-wrap font-mono text-xs overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i} className="m-1 text-current">{Math.random() > 0.5 ? '1' : '0'}</span>
        ))}
      </div>
    ),
    'app-icons': (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="10" y="10" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="40" y="10" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="70" y="10" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="10" y="40" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="40" y="40" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="70" y="40" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="10" y="70" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="40" y="70" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="70" y="70" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    ),
    'server-rack': (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="30" y="10" width="40" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="35" y={15 + i * 10} width="30" height="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>
    )
  };

  return patterns[pattern] || null;
};

const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  const gradientStyle = isActive ? {
    background: `linear-gradient(135deg, rgb(34, 197, 94), rgb(59, 130, 246))`
  } : {};

  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-4 ring-cyan-400/50' : 'opacity-80 hover:opacity-100'
      }`}
      style={isActive ? gradientStyle : {
        background: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(55, 65, 81, 0.5)'
      }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`absolute inset-0 ${isActive ? 'opacity-20' : 'opacity-0'}`}>
        <PatternBackground pattern={testimonial.pattern} />
      </div>

      <div className="p-6 relative z-10">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isActive && (
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {testimonial.rating}
              </motion.div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-300 mb-2">{testimonial.role}</p>
            <StarRating rating={testimonial.rating} />
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mt-4 text-gray-300">
                {testimonial.content}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {testimonial.tech.map((tech, index) => (
                  <TechPill key={index} tech={tech} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FloatingEmojiReaction = ({ emoji, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute text-3xl pointer-events-none z-50"
      initial={{ 
        x: Math.random() * 100, 
        y: Math.random() * 100, 
        opacity: 1, 
        scale: 0.5 
      }}
      animate={{
        x: (Math.random() - 0.5) * 200,
        y: -100 - Math.random() * 50,
        opacity: 0,
        scale: 1.5
      }}
      transition={{
        duration: 3,
        ease: "easeOut"
      }}
    >
      {emoji}
    </motion.div>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [emojiReactions, setEmojiReactions] = useState([]);

  const addEmojiReaction = (emoji) => {
    const newReaction = {
      id: Date.now(),
      emoji
    };
    setEmojiReactions(prev => [...prev, newReaction]);
  };

  const removeEmojiReaction = (id) => {
    setEmojiReactions(prev => prev.filter(r => r.id !== id));
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => 
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Floating decorative bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-cyan-400/20' : 'bg-blue-500/20'} blur-xl`}
            style={{
              width: `${50 + i * 15}px`,
              height: `${50 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            animate={{
              y: [0, i % 2 === 0 ? -20 : 20, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Emoji reactions */}
        {emojiReactions.map(reaction => (
          <FloatingEmojiReaction
            key={reaction.id}
            emoji={reaction.emoji}
            onComplete={() => removeEmojiReaction(reaction.id)}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Client Testimonials
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Hear what industry leaders say about working with me
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Testimonial cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={activeTestimonial === index}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>

            {/* Featured testimonial */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-xl h-full relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Interactive reaction buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {['👍', '❤️', '🔥', '👏', '🚀'].map(emoji => (
                  <motion.button
                    key={emoji}
                    className="text-xl bg-black/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/30 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addEmojiReaction(emoji)}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src={testimonialsData[activeTestimonial].image}
                        alt={testimonialsData[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {testimonialsData[activeTestimonial].name}
                      </h3>
                      <p className="text-gray-400">
                        {testimonialsData[activeTestimonial].role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <StarRating rating={testimonialsData[activeTestimonial].rating} />
                  </div>

                  <motion.blockquote 
                    className="text-xl italic text-gray-300 mb-8 relative pl-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                    {testimonialsData[activeTestimonial].content}
                  </motion.blockquote>

                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex space-x-2">
                      {testimonialsData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeTestimonial === index ? 'bg-cyan-400 w-6' : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive "Leave a Review" button */}
          <motion.div 
            className="mt-16 text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                addEmojiReaction('🌟');
                addEmojiReaction('💫');
                addEmojiReaction('✨');
              }}
            >
              Leave Your Review
            </button>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default Testimonials;