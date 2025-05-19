// src/App.tsx
import { useState } from 'react'
import CoverPage from './components/CoverPage'
import ReadMePage from './components/ReadMePage'
import TroxlerAdaptation from './components/TroxlerAdaptation'
import './App.css'

type Page = 'cover' | 'readme' | 'training1' | 'training2' | 'training3'

function App() {
  const [page, setPage] = useState<Page>('cover')
  const goBack = () => setPage('cover')

  return (
    <>
      {page === 'cover' && <CoverPage onNavigate={setPage} />}

      {page === 'readme' && <ReadMePage onBack={goBack} />}

      {page === 'training1' && (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#202020' }}>
          {/* Back button */}
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

          {/* Troxler Adaptation Module */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TroxlerAdaptation
              width={600}
              height={400}
              onComplete={() => alert('Trial complete!')}
            />
          </div>
        </div>
      )}

      {page === 'training2' && (
        <div style={{ padding: '40px', color: '#fff', minHeight: '100vh', backgroundColor: '#202020' }}>
          <button onClick={goBack}>← Back</button>
          <h2>Training 2: MIB Module (coming soon)</h2>
        </div>
      )}

      {page === 'training3' && (
        <div style={{ padding: '40px', color: '#fff', minHeight: '100vh', backgroundColor: '#202020' }}>
          <button onClick={goBack}>← Back</button>
          <h2>Training 3: Motion Silencing (coming soon)</h2>
        </div>
      )}
    </>
  )
}

export default App
