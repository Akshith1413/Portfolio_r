import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useAnimation } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef();
  const [activeCategory, setActiveCategory] = useState('fullstack');
  const controls = useAnimation();
  const [proficiencyScore] = useState(Math.floor(Math.random() * 50) + 50);

  const skillCategories = {
    fullstack: {
      title: 'Full Stack Development',
      icon: '💻',
      description: 'End-to-end web application development with modern frameworks and architectures',
      skills: [
        { name: 'React/Next.js', level: 95, color: 'from-cyan-400 to-blue-500' },
        { name: 'Node.js/Express', level: 90, color: 'from-green-400 to-emerald-500' },
        { name: 'GraphQL/Apollo', level: 85, color: 'from-pink-400 to-rose-500' },
        { name: 'MongoDB/PostgreSQL', level: 88, color: 'from-yellow-400 to-amber-500' },
        { name: 'AWS/Docker', level: 80, color: 'from-orange-400 to-red-500' },
      ]
    },
    uiux: {
      title: 'UI/UX Engineering',
      icon: '🎨',
      description: 'Creating intuitive interfaces and seamless user experiences',
      skills: [
        { name: 'Figma/Adobe XD', level: 92, color: 'from-purple-400 to-fuchsia-500' },
        { name: 'Framer Motion', level: 90, color: 'from-blue-400 to-indigo-500' },
        { name: 'GSAP Animations', level: 88, color: 'from-green-400 to-teal-500' },
        { name: 'User Research', level: 85, color: 'from-rose-400 to-pink-500' },
        { name: 'Prototyping', level: 87, color: 'from-amber-400 to-orange-500' },
      ]
    },
    iot: {
      title: 'IoT Engineering',
      icon: '🌐',
      description: 'Building connected devices and smart systems',
      skills: [
        { name: 'Raspberry Pi/Arduino', level: 85, color: 'from-red-400 to-orange-500' },
        { name: 'MQTT/WebSockets', level: 82, color: 'from-emerald-400 to-teal-500' },
        { name: 'Sensor Networks', level: 80, color: 'from-indigo-400 to-blue-500' },
        { name: 'Edge Computing', level: 78, color: 'from-violet-400 to-purple-500' },
        { name: 'LoRaWAN', level: 75, color: 'from-cyan-400 to-sky-500' },
      ]
    },
    embedded: {
      title: 'Embedded Systems',
      icon: '🔌',
      description: 'Low-level programming for hardware devices',
      skills: [
        { name: 'C/C++', level: 88, color: 'from-gray-400 to-gray-600' },
        { name: 'RTOS', level: 80, color: 'from-lime-400 to-green-500' },
        { name: 'ARM Cortex', level: 82, color: 'from-amber-400 to-yellow-500' },
        { name: 'FPGA/VHDL', level: 75, color: 'from-pink-400 to-rose-500' },
        { name: 'Device Drivers', level: 78, color: 'from-blue-400 to-indigo-500' },
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: '📱',
      description: 'Cross-platform and native mobile applications',
      skills: [
        { name: 'Flutter', level: 90, color: 'from-sky-400 to-blue-500' },
        { name: 'Android (Kotlin)', level: 85, color: 'from-green-400 to-emerald-500' },
        { name: 'React Native', level: 82, color: 'from-purple-400 to-indigo-500' },
        { name: 'Firebase', level: 85, color: 'from-orange-400 to-amber-500' },
        { name: 'SwiftUI', level: 70, color: 'from-red-400 to-pink-500' },
      ]
    }
  };

  useLayoutEffect(() => {
    const orbs = gsap.utils.toArray('.floating-orb');

    orbs.forEach((orb, i) => {
      const duration = 8 + i * 2;
      const yoyo = i % 2 === 0;

      gsap.to(orb, {
        x: `+=${(Math.random() * 100) - 50}`,
        y: `+=${(Math.random() * 100) - 50}`,
        rotation: 360,
        duration: duration,
        repeat: -1,
        yoyo: yoyo,
        ease: 'sine.inOut'
      });
    });

    gsap.from('.skill-bar-fill', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      scaleX: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power3.out'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(orbs);
    };
  }, [activeCategory]);

  const handleCategoryChange = async (category) => {
    await controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    });

    setActiveCategory(category);

    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  };

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`floating-orb absolute rounded-full filter blur-xl opacity-20 ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-blue-500'}`}
            style={{
              width: `${50 + i * 10}px`,
              height: `${50 + i * 10}px`,
              left: `${10 + i * 10}%`,
              top: `${20 + i * 5}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Category Selector */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === key ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <span className="mr-2">{icon}</span> {title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          animate={controls}
          initial={{ opacity: 0, y: 20 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{skillCategories[activeCategory].title}</h2>
            <p className="text-gray-400">{skillCategories[activeCategory].description}</p>
          </div>

          <div className="space-y-4">
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                    className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Proficiency Spectrum */}
        <motion.div
          className="mt-20 bg-gray-900/50 border border-gray-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Proficiency Spectrum
          </h3>

          <div className="relative h-40">
            {Object.keys(skillCategories).map((category, i) => {
              const angle = i * (360 / Object.keys(skillCategories).length);
              const x = 160 * Math.cos(angle * Math.PI / 180);
              const y = 160 * Math.sin(angle * Math.PI / 180);

              return (
                <motion.div
                  key={category}
                  className="absolute origin-center"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${activeCategory === category ? 'bg-cyan-500 text-white scale-110' : 'bg-gray-800 text-gray-400'}`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {skillCategories[category].icon}
                  </motion.div>
                </motion.div>
              );
            })}

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-gray-700" />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {proficiencyScore}%
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
