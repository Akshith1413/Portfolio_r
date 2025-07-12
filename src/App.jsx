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

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Handle navigation and active section state
  const handleNavigation = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll listener for section detection
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'about', 'projects', 'skills', 'timeline', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, [loading]);

  if (loading) {
    return <Loader setLoading={setLoading} />;
  }

  return (
    <AnimationProvider>
      {/* Special Effects Components */}
      <CursorEffect />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigation} />

      {/* Main Content */}
      <div className="bg-gray-950 text-white">
        <Suspense fallback={<div className="h-screen bg-gray-950" />}>
          <section id="home">
            <Hero onExplore={() => handleNavigation('about')} />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="timeline">
            <Timeline />
          </section>

          <section id="testimonials">
            <Testimonials />
          </section>

          <section id="contact">
            <Contact />
          </section>

          <Footer />
        </Suspense>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient opacity-30" />
      </div>
    </AnimationProvider>
  );
}

export default App;