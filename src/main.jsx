import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './index.css'
const Resume = React.lazy(() => import('./components/Resume'))


gsap.registerPlugin(ScrollTrigger)


gsap.defaults({
  ease: 'power3.out',
  duration: 1.2
})


const animationPreferences = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  spring: {
    type: 'spring',
    damping: 10,
    stiffness: 100,
    mass: 0.5
  },
  gentle: {
    type: 'spring',
    damping: 20,
    stiffness: 100
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig
        reducedMotion={animationPreferences.reducedMotion ? 'always' : 'never'}
        transition={animationPreferences.spring}
      >
        
        
        <React.Suspense fallback={<div className="h-screen bg-black text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </React.Suspense>
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>
)