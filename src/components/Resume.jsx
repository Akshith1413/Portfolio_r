// src/components/BiographyRow.jsx
import React from 'react';

const Resume = () => {
  return (
    <div 
      className="min-h-screen p-8 bg-gray-900 flex flex-row items-start gap-8"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontStyle: 'italic',
        fontWeight: 100,
        color: '#f3f4f6' // gray-100
      }}
    >
      {/* Personal Details - Left Column */}
      <div className="w-1/3 p-6 border-r border-gray-700">
        <h2 className="text-2xl mb-6" style={{ color: '#06b6d4' }}>Personal Details</h2>
        
        <div className="space-y-4">
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

      {/* Biography - Right Column */}
      <div className="w-2/3 p-6">
        <h2 className="text-2xl mb-6" style={{ color: '#06b6d4' }}>Biography</h2>
        
        <div className="space-y-4">
          <p>
            <span className="font-bold" style={{ color: '#06b6d4' }}>Hello!</span> I'm Emma Lesley, a creative illustrator and designer dedicated to creating imaginable worlds for my clients and their customers. I have a passion for bringing stories to life through my art. I have been drawing and painting since I was a child, and my love for art has only grown stronger over the years.
          </p>
          <p>
            When I'm not immersed in the world of illustration, you can find me exploring new art, sketching ideas, or collaborating with clients to make their visions a reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resume;