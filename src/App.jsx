import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimationProvider } from './components/AnimationProvider';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CursorEffect from './components/CursorEffect';

// Lazy load main sections for better performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Timeline = lazy(() => import('./components/Timeline'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Certifications = lazy(() => import('./components/Certifications'));
function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  
  const handleNavigation = (section) => {
    
    setActiveSection(section);
    
    const element = document.getElementById(section);
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      window.history.replaceState(null, null, `#${section}`);
    }
  };

  useEffect(() => {
    if (loading) return;

    let ticking = false;
    
    const updateActiveSection = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'timeline', 'certifications', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY;
      const navbarHeight = 80;
      
      let currentSection = 'home';
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop - navbarHeight - 100; // 100px offset for better detection
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      const lastSection = document.getElementById('contact');
      if (lastSection) {
        const lastSectionTop = lastSection.offsetTop - navbarHeight - 100;
        if (scrollPosition >= lastSectionTop) {
          currentSection = 'contact';
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        
        const newHash = `#${currentSection}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, null, newHash);
        }
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    setTimeout(updateActiveSection, 100);

    const hash = window.location.hash.replace('#', '');
    const sections = ['home', 'about', 'projects', 'skills', 'timeline', 'certifications', 'testimonials', 'contact'];
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, activeSection]);

  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        
        setTimeout(() => {
          handleNavigation(hash);
        }, 500);
      }
    }
  }, [loading]);

  if (loading) {
    return <Loader setLoading={setLoading} />;
  }

  return (
    <AnimationProvider>
      
      <CursorEffect />
      <ScrollProgress />

      
      <Navbar activeSection={activeSection} onNavigate={handleNavigation} />

      
      <div className="bg-gray-950 text-white">
        <Suspense fallback={
          <div className="h-screen bg-gray-950 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
          </div>
        }>
          <section id="home" className="section-container min-h-screen">
            <Hero onExplore={() => handleNavigation('about')} />
          </section>

          <section id="about" className="section-container min-h-screen">
            <About />
          </section>

          <section id="projects" className="section-container min-h-screen">
            <Projects />
          </section>

          <section id="skills" className="section-container min-h-screen">
            <Skills />
          </section>

          <section id="timeline" className="section-container min-h-screen">
            <Timeline />
          </section>

          <section id="certifications" className="section-container min-h-screen">
            <Certifications />
          </section>

          <section id="testimonials" className="section-container min-h-screen">
            <Testimonials />
          </section>

          <section id="contact" className="section-container min-h-screen">
            <Contact />
          </section>

          <Footer />
        </Suspense>
      </div>

      
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient opacity-30" />
      </div>

      
    </AnimationProvider>
  );
}

export default App;