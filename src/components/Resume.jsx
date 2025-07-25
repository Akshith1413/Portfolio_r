import React from 'react';
import { FaUser, FaCode, FaPalette, FaBriefcase, FaStar, FaHeart, FaProjectDiagram, FaTrophy, FaGraduationCap, FaCertificate, FaGithub, FaLinkedin, FaGlobe, FaFileDownload } from 'react-icons/fa';

const Resume = () => {
  return (
    <div 
      className="min-h-screen p-4 md:p-8 bg-gray-900 flex flex-col items-start"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontStyle: 'italic',
        fontWeight: 100,
        color: '#f3f4f6' 
      }}
    >
      <div className="flex flex-col lg:flex-row w-full gap-6 md:gap-8">
        
        <div className="w-full lg:w-1/3 space-y-6 md:space-y-8">
          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaUser className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Personal Details</h2>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>Name</p>
                <p>Ravula Akshith</p>
              </div>
              
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>Date of birth</p>
                <p>27-01-2007</p>
              </div>
              
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>Email</p>
                <p>ravulaakshith1@email.com</p>
              </div>
              
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>Phone</p>
                <p>+91 7382744579</p>
              </div>
              
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>City</p>
                <p>Karimnagar,Telangana</p>
              </div>
            </div>
          </div>
          
          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaBriefcase className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Availability</h2>
            </div>
            <p>Ready to join immediately for internships or full-time roles (Remote/Hybrid/On-site)</p>
          </div>

          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaCode className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Key Skills</h2>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="font-bold" style={{ color: '#06b6d4' }}>Technical</p>
                <p>MERN Stack</p>
                <p>Python</p>
                <p>Java</p>
                <p>C, C++</p>
                <p>Haskell</p>
                <p>DSA</p>
              </div>
              
              <div className="mt-4 md:mt-6">
                <p className="font-bold" style={{ color: '#06b6d4' }}>Design</p>
                <p>Graphic Design</p>
                <p>Illustration</p>
                <p>Adobe Creative Suite</p>
                <p>Photoshop</p>
                <p>After Effects</p>
              </div>
            </div>
          </div>

          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaStar className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Strengths</h2>
            </div>
            
            <div className="space-y-2">
              <p>• Creative problem solver with strong analytical skills</p>
              <p>• Quick learner who adapts to new technologies</p>
              <p>• Excellent collaborator in team environments</p>
              <p>• Detail-oriented with a focus on clean code</p>
              <p>• Strong visual design sensibility</p>
              <p>• Effective communicator of technical concepts</p>
            </div>
          </div>

          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaHeart className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Passion</h2>
            </div>
            
            <div className="space-y-2">
              <p>• Creating beautiful, functional digital experiences</p>
              <p>• Solving real-world problems through code</p>
              <p>• Continuous learning and skill development</p>
              <p>• Mentoring others in tech and design</p>
              <p>• Open source contribution</p>
              <p>• Exploring the intersection of art and technology</p>
            </div>
          </div>

          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaGraduationCap className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Education</h2>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-base md:text-lg" style={{ color: '#06b6d4' }}>Amrita Vishwa Vidyapeetham</h3>
                <p>B.Tech in Computer Science Engineering</p>
                <p className="text-xs md:text-sm">2023 – 2027 (Pursuing)</p>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg" style={{ color: '#06b6d4' }}>Alphores Junior College, Telangana</h3>
                <p>Class 12 – MPC</p>
                <p className="text-xs md:text-sm">2021 – 2023</p>
              </div>
            </div>
          </div>

          
          <div className="p-4 md:p-6">
            <div className="flex items-center mb-4 md:mb-6">
              <FaCertificate className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Certifications</h2>
            </div>
            
            <div className="space-y-2">
              <p>• Google UI/UX Professional Certificate</p>
              <p>• Google Cybersecurity Professional Certificate</p>
            </div>
          </div>
        </div>

        
        <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaUser className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Biography</h2>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <p>
                <span className="font-bold" style={{ color: '#06b6d4' }}>Hello!</span> I'm Ravula Akshith, a passionate full stack developer dedicated to building seamless, user-centric digital experiences from the ground up. I specialize in crafting responsive front-end interfaces and robust back-end systems that bring ideas to life through code.</p>
<p>
My journey in development began with curiosity and a drive to understand how things work behind the screen. Over the years, that curiosity evolved into a deep commitment to creating efficient, scalable, and intuitive web applications. Whether it's designing a sleek UI or engineering a complex API, I love the challenge of turning problems into elegant technical solutions.
              </p>
              <p>
              When I'm not coding, you'll find me exploring the latest in tech, refining my skills, or collaborating with clients and teams to transform ideas into functional, engaging products.</p>
            </div>
          </div>
          
          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaBriefcase className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Work Experience</h2>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-lg md:text-xl" style={{ color: '#06b6d4' }}>Intel IoT Club — Full Stack Developer</h3>
                  <p className="text-xs md:text-sm">Dec 2024 – Present (8 months)</p>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Designed and developed internal IoT-focused web application to support club operations and student engagement.</li>
                  <li>Built full-stack features using the MERN stack, with responsive front-end design and API-driven back-end.</li>
                  <li>Led UI/UX efforts for both website and app interfaces, ensuring intuitive navigation and mobile responsiveness.</li>
                  <li>Collaborated with technical leads to deliver scalable, maintainable code for real-world IoT use cases.</li>
                </ul>
              </div>
              
              
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-lg md:text-xl" style={{ color: '#06b6d4' }}>Learnflu — Web Development Intern</h3>
                  <p className="text-xs md:text-sm">May 2024 – Jul 2024 (3 months)</p>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Crafted modern user interfaces using React.js and Figma mockups.</li>
                  <li>Participated in agile sprints, building modular components and refining user flows.</li>
                  <li>Improved user experience and accessibility across multiple web pages.</li>
                </ul>
              </div>
            </div>
          </div>

          
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center mb-4 md:mb-6">
              <FaTrophy className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Key Achievements</h2>
            </div>
            
            <div className="space-y-2">
              <p>• District level cricketer</p>
              <p>• Top 20 Selection, Cisco-NSRC ThingQbator Innovation Program (2025)</p>
            </div>
          </div>

          
          <div className="p-4 md:p-6">
            <div className="flex items-center mb-4 md:mb-6">
              <FaProjectDiagram className="mr-2" style={{ color: '#06b6d4' }} />
              <h2 className="text-xl md:text-2xl" style={{ color: '#06b6d4' }}>Projects</h2>
            </div>
            
            <div className="space-y-6 md:space-y-8">
             
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-lg md:text-xl" style={{ color: '#06b6d4' }}>aSafetyGuide.com — Full Stack Developer</h3>
                  <p className="text-xs md:text-sm">🔗 www.asafetyguide.com</p>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Built and launched a public safety awareness platform from scratch using the MERN stack.</li>
                  <li>Selected as one of the Top 20 Teams at the Cisco-NSRC ThingQbator Incubator.</li>
                  <li>Integrated real-time data presentation and content management features.</li>
                </ul>
              </div>
              
              
              <div>
                <h3 className="text-lg md:text-xl mb-2" style={{ color: '#06b6d4' }}>DevConnect – Developer Portfolio & Networking Platform</h3>
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>What it does:</p>
                <p className="mb-2">A social platform where developers can showcase portfolios, follow each other, and collaborate on projects.</p>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Tech Highlights:</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>React + Tailwind for front-end UI</li>
                  <li>Node.js + Express + MongoDB for back-end</li>
                  <li>User authentication (JWT)</li>
                  <li>Profile CRUD + project showcase</li>
                  <li>"Follow" feature + notifications</li>
                </ul>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Why it helps:</p>
                <p>Employers love to see devs building tools for other devs. This shows you can think product-wise and build scalable systems.</p>
              </div>
              
             
              <div>
                <h3 className="text-lg md:text-xl mb-2" style={{ color: '#06b6d4' }}>TaskNest – Team Task & Productivity Manager</h3>
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>What it does:</p>
                <p className="mb-2">A Trello-like app for organizing tasks, with boards, deadlines, labels, and team collaboration.</p>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Tech Highlights:</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>Drag-and-drop Kanban interface (e.g., using react-beautiful-dnd)</li>
                  <li>Real-time updates with Socket.io</li>
                  <li>Role-based access (Admin/Member)</li>
                  <li>Notifications and due-date reminders</li>
                </ul>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Why it helps:</p>
                <p>Demonstrates frontend interactivity, state management, back-end logic, and real-time communication—all in one.</p>
              </div>

             
              <div>
                <h3 className="text-lg md:text-xl mb-2" style={{ color: '#06b6d4' }}>QuickShop – E-commerce Web App</h3>
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>What it does:</p>
                <p className="mb-2">An end-to-end shopping platform with product listings, cart, checkout, and admin panel.</p>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Tech Highlights:</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>MongoDB for product/inventory DB</li>
                  <li>Secure login with user/admin roles</li>
                  <li>Stripe/PayPal payment integration</li>
                  <li>Dynamic product filtering/search</li>
                </ul>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Why it helps:</p>
                <p>Shows full-stack mastery: routing, payment gateway integration, product management—ideal for startups & SaaS jobs.</p>
              </div>

             
              <div>
                <h3 className="text-lg md:text-xl mb-2" style={{ color: '#06b6d4' }}>HealthTrackr – Personal Health Dashboard</h3>
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>What it does:</p>
                <p className="mb-2">Lets users log health metrics (water intake, steps, heart rate, sleep) and visualize trends with charts.</p>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Tech Highlights:</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>Chart.js or Recharts for data viz</li>
                  <li>Backend for user-specific data storage</li>
                  <li>JWT-based authentication</li>
                  <li>Responsive UI with dark mode</li>
                </ul>
                
                <p className="font-bold mb-1" style={{ color: '#06b6d4' }}>Why it helps:</p>
                <p>Great to showcase data visualization, user tracking, and front-end polish. Health tech is hot in hiring too.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-full mt-6 md:mt-8 p-4 md:p-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <a href="https://github.com/Akshith1413" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaGithub size={20} style={{ color: '#06b6d4' }} />
          </a>
          <a href="https://www.linkedin.com/in/ravula-akshith-94278b300/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaLinkedin size={20} style={{ color: '#06b6d4' }} />
          </a>
          <a href="https://portfolio-five-theta-93.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaGlobe size={20} style={{ color: '#06b6d4' }} />
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <span className="text-base md:text-lg">Ravula Akshith</span>
          <button 
  className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors text-sm sm:text-base"
  onClick={() => {
    const link = document.createElement('a');
    link.href = '/certs/Ravula Akshith.pdf';
    link.download = 'Ravula_Akshith_Resume.pdf'; // The filename you want for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
>
  <FaFileDownload />
  Download Resume
</button>
        </div>
      </div>
    </div>
  );
};

export default Resume;