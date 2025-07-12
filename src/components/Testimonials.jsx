import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO, TechNova",
    content: "Working with this developer was transformative for our platform. Their innovative approach to performance optimization increased our user retention by 40%.",
    rating: 5,
    image: "/testimonial1.jpg",
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Product Lead, DesignHub",
    content: "The UI/UX work delivered exceeded all expectations. Our conversion rates improved dramatically thanks to their intuitive design solutions.",
    rating: 5,
    image: "/testimonial2.jpg",
    color: "from-purple-400 to-fuchsia-500"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO, IoT Solutions",
    content: "Their embedded systems expertise helped us solve critical hardware-software integration challenges we'd struggled with for months.",
    rating: 4,
    image: "/testimonial3.jpg",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Mobile Lead, AppVenture",
    content: "The Flutter application they built performs flawlessly across platforms while maintaining beautiful native-like experiences.",
    rating: 5,
    image: "/testimonial4.jpg",
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Engineering Director, WebScale",
    content: "One of the most technically proficient full-stack developers I've worked with. Delivered complex features ahead of schedule.",
    rating: 5,
    image: "/testimonial5.jpg",
    color: "from-rose-400 to-pink-500"
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
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  const cardRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    if (isActive) {
      gsap.to(imgRef.current, {
        scale: 1.05,
        duration: 1,
        ease: 'power3.out'
      });
    } else {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [isActive]);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'ring-4 ring-opacity-50' : 'opacity-80 hover:opacity-100'}`}
      whileHover={{ y: -10 }}
      style={{
        background: isActive ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to)` : 'rgba(17, 24, 39, 0.5)',
        border: isActive ? 'none' : '1px solid rgba(55, 65, 81, 0.5)'
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`absolute inset-0 ${isActive ? 'opacity-10' : 'opacity-0'} transition-opacity`}>
        <div className="absolute inset-0 bg-noise-pattern opacity-30" />
      </div>

      <div className="p-6 relative z-10">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
              <img
                ref={imgRef}
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
            <motion.p
              className="mt-4 text-gray-300"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {testimonial.content}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const controls = useAnimation();

  // Floating bubbles animation
  useEffect(() => {
    const bubbles = gsap.utils.toArray('.testimonial-bubble');
    
    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: i % 2 === 0 ? -20 : 20,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Section title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(subtitleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => 
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Animated spotlight effect
  useEffect(() => {
    const spotlight = document.querySelector('.testimonial-spotlight');
    if (!spotlight) return;

    const activeCard = document.querySelector('.testimonial-card.active');
    if (!activeCard) return;

    const cardRect = activeCard.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();

    const x = cardRect.left - sectionRect.left + cardRect.width / 2;
    const y = cardRect.top - sectionRect.top + cardRect.height / 2;

    gsap.to(spotlight, {
      '--x': `${x}px`,
      '--y': `${y}px`,
      '--size': '400px',
      duration: 1.5,
      ease: 'power3.out'
    });

    // Animate cards
    controls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    });
  }, [activeTestimonial, controls]);

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        '--x': '50%',
        '--y': '50%',
        '--size': '0px',
        '--color': 'rgba(6, 182, 212, 0.1)'
      }}
    >
      {/* Animated spotlight background */}
      <div 
        className="testimonial-spotlight absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(var(--size) at var(--x) var(--y), var(--color), transparent)`
        }}
      />

      {/* Floating decorative bubbles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className={`testimonial-bubble absolute rounded-full ${i % 2 === 0 ? 'bg-cyan-400/20' : 'bg-blue-500/20'} blur-xl`}
          style={{
            width: `${50 + i * 15}px`,
            height: `${50 + i * 15}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Client Testimonials
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Hear what industry leaders say about working with me
          </p>
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
                className={`testimonial-card ${activeTestimonial === index ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Featured testimonial */}
          <motion.div 
            className="glass-panel p-8 rounded-xl h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
          >
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
                        className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-cyan-400 w-6' : 'bg-gray-700'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Animated quote marks */}
        <div className="absolute -z-10 opacity-10">
          <motion.svg
            className="w-64 h-64 text-cyan-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 006.925 10H10a1 1 0 011 1v7c0 1.103-.897 2-2 2H3a1 1 0 01-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 01-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0017.925 10H21a1 1 0 011 1v7c0 1.103-.897 2-2 2z" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;