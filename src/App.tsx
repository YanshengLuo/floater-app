// src/App.tsx
import { useState } from 'react';
import CoverPage from './components/CoverPage';
import IntroductionPage from './components/IntroductionPage';
import TroxlerAdaptation from './components/TroxlerAdaptation';
import FloatingDots from './components/FloatingDots'
import './App.css';

type Page = 'cover' | 'introduction' | 'training1' | 'training2' | 'training3';

function App() {
  const [page, setPage] = useState<Page>('cover');
  const goBack = () => setPage('cover');

  return (
    <>
      {page === 'cover' && <CoverPage onNavigate={setPage} />}
      {page === 'introduction' && <IntroductionPage onBack={goBack} />}
      {page === 'training1' && (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#202020' }}>
          <button
            onClick={goBack}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              padding: '8px 12px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TroxlerAdaptation width={600} height={400} onComplete={() => alert('Trial complete!')} />
          </div>
        </div>
      )}
      {page === 'training2' && (
		<div style={{ position:'relative', minHeight:'100vh', backgroundColor:'#202020' }}>
		 <button onClick={goBack}>← Back</button>
		 <FloatingDots
			width={600}
			height={400}
			numDiscs={8}
			numTargets={2}
			speed={2}
			onComplete={() => alert('Block complete!')}
		 />
		</div>
)}
      {page === 'training3' && (
        <div style={{ padding: '40px', color: '#fff', minHeight: '100vh', backgroundColor: '#202020' }}>
          <button onClick={goBack}>← Back</button>
          <h2>Training 3: Motion Silencing (coming soon)</h2>
        </div>
      )}
    </>
  );
}

export default App;