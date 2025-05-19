// src/components/CoverPage.tsx
import React from 'react';
import coverImage from '../assets/cover.jpeg';  // cover image

interface CoverPageProps {
  onNavigate: (page: 'readme' | 'training1' | 'training2' | 'training3') => void;
}

const buttonStyle: React.CSSProperties = {
  display: 'block',
  margin: '10px auto',
  padding: '10px 20px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  background: 'none',
  border: '2px solid #fff',
  color: '#fff',
  borderRadius: '4px'
};

const CoverPage: React.FC<CoverPageProps> = ({ onNavigate }) => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#202020',
    color: '#fff',
    textAlign: 'center',
    padding: '60px 20px'
  }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Sensory Adaptation Training for Floaters</h1>
    {/* Cover Image */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
      <img
        src={coverImage}
        alt="Microscope and eye"
        style={{ maxWidth: '80%', height: 'auto', borderRadius: '8px' }}
      />
    </div>
    {/* Attribution Caption */}
    <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '40px' }}>
      Attribution: <a href="https://www.vecteezy.com/free-photos/woman" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}>
        Woman Stock photos by Vecteezy
      </a>
    </div>
    {/* Navigation Buttons */}
    <button style={buttonStyle} onClick={() => onNavigate('readme')}>Read Me</button>
    <button style={buttonStyle} onClick={() => onNavigate('training1')}>Training 1</button>
    <button style={buttonStyle} onClick={() => onNavigate('training2')}>Training 2</button>
    <button style={buttonStyle} onClick={() => onNavigate('training3')}>Training 3</button>
  </div>
);

export default CoverPage;
