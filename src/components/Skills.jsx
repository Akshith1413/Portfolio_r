import { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('fullstack');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = {
    fullstack: {
      title: 'Full Stack Wizardry',
      icon: '💻',
      description: 'Crafting seamless digital experiences from database to UI',
      skills: [
        { name: 'React/Next.js', level: 95, color: 'bg-gradient-to-r from-cyan-400 to-blue-500', icon: '⚛️' },
        { name: 'Node.js/Express', level: 90, color: 'bg-gradient-to-r from-green-400 to-emerald-500', icon: '🟢' },
        { name: 'GraphQL/Apollo', level: 85, color: 'bg-gradient-to-r from-pink-400 to-rose-500', icon: '📊' },
        { name: 'MongoDB/PostgreSQL', level: 88, color: 'bg-gradient-to-r from-yellow-400 to-amber-500', icon: '🗄️' },
        { name: 'AWS/Docker', level: 80, color: 'bg-gradient-to-r from-orange-400 to-red-500', icon: '☁️' },
      ]
    },
    uiux: {
      title: 'UI/UX Design',
      icon: '🎨',
      description: 'Creating intuitive and beautiful user experiences',
      skills: [
        { name: 'Figma/Adobe XD', level: 92, color: 'bg-gradient-to-r from-purple-400 to-fuchsia-500', icon: '✏️' },
        { name: 'User Research', level: 85, color: 'bg-gradient-to-r from-rose-400 to-pink-500', icon: '🔍' },
        { name: 'Prototyping', level: 87, color: 'bg-gradient-to-r from-amber-400 to-orange-500', icon: '🧪' },
        { name: 'UI Components', level: 90, color: 'bg-gradient-to-r from-blue-400 to-indigo-500', icon: '🧩' },
        { name: 'Design Systems', level: 88, color: 'bg-gradient-to-r from-teal-400 to-cyan-500', icon: '📐' },
      ]
    },
    iot: {
      title: 'IoT Engineering',
      icon: '🌐',
      description: 'Building connected devices and smart systems',
      skills: [
        { name: 'Raspberry Pi/Arduino', level: 85, color: 'bg-gradient-to-r from-red-400 to-orange-500', icon: '🖥️' },
        { name: 'Sensor Networks', level: 80, color: 'bg-gradient-to-r from-indigo-400 to-blue-500', icon: '📶' },
        { name: 'MQTT/WebSockets', level: 82, color: 'bg-gradient-to-r from-emerald-400 to-teal-500', icon: '📡' },
        { name: 'Edge Computing', level: 78, color: 'bg-gradient-to-r from-violet-400 to-purple-500', icon: '⏱️' },
        { name: 'LoRaWAN', level: 75, color: 'bg-gradient-to-r from-cyan-400 to-sky-500', icon: '📶' },
      ]
    },
    embedded: {
      title: 'Embedded Systems',
      icon: '🔌',
      description: 'Low-level programming for hardware devices',
      skills: [
        { name: 'C/C++', level: 88, color: 'bg-gradient-to-r from-gray-400 to-gray-600', icon: '🖥️' },
        { name: 'RTOS', level: 80, color: 'bg-gradient-to-r from-lime-400 to-green-500', icon: '⏱️' },
        { name: 'ARM Cortex', level: 82, color: 'bg-gradient-to-r from-amber-400 to-yellow-500', icon: '⚙️' },
        { name: 'FPGA/VHDL', level: 75, color: 'bg-gradient-to-r from-pink-400 to-rose-500', icon: '🧮' },
        { name: 'Device Drivers', level: 78, color: 'bg-gradient-to-r from-blue-400 to-indigo-500', icon: '💾' },
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: '📱',
      description: 'Building cross-platform mobile applications',
      skills: [
        { name: 'Flutter', level: 90, color: 'bg-gradient-to-r from-sky-400 to-blue-500', icon: '🦋' },
        { name: 'Android (Kotlin)', level: 85, color: 'bg-gradient-to-r from-green-400 to-emerald-500', icon: '🤖' },
        { name: 'React Native', level: 82, color: 'bg-gradient-to-r from-purple-400 to-indigo-500', icon: '⚛️' },
        { name: 'Firebase', level: 85, color: 'bg-gradient-to-r from-orange-400 to-amber-500', icon: '🔥' },
        { name: 'SwiftUI', level: 70, color: 'bg-gradient-to-r from-red-400 to-pink-500', icon: '🍏' },
      ]
    }
  };

  return (
    <section id="skills" className="py-16 px-4 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">My Tech Arsenal</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A multidisciplinary toolkit for solving complex problems across the stack
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {skillCategories[category].title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{skillCategories[activeCategory].icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{skillCategories[activeCategory].title}</h3>
                <p className="text-gray-300">{skillCategories[activeCategory].description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <div key={i} className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{skill.icon}</span>
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </div>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Related Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {getRelatedTech(activeCategory).map((tech, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 border border-gray-700"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function getRelatedTech(category) {
  const techMap = {
    fullstack: ['TypeScript', 'Webpack', 'Jest', 'Redux', 'TailwindCSS', 'SASS', 'REST'],
    uiux: ['Storybook', 'Styled Components', 'CSS Modules', 'PostCSS', 'Sketch', 'InVision'],
    iot: ['BLE', 'Zigbee', 'Z-Wave', 'PCB Design', 'ESP32', 'MicroPython'],
    embedded: ['FreeRTOS', 'Zephyr', 'I2C', 'SPI', 'UART', 'CAN', 'PWM'],
    mobile: ['Dart', 'Jetpack Compose', 'KMM', 'Firebase', 'Fastlane', 'AppCenter']
  };
  
  return techMap[category] || [];
}

export default Skills;