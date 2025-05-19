// src/components/IntroductionPage.tsx
import React from 'react';

interface IntroductionPageProps { onBack: () => void; }

const IntroductionPage: React.FC<IntroductionPageProps> = ({ onBack }) => (
  <div style={{ /* styles… */ }}>
    <h2>Introduction</h2>
    {/* …your paragraphs & list… */}
    <button onClick={onBack}>Back</button>
  </div>
);

export default IntroductionPage;
