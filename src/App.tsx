import './App.css'
import TroxlerAdaptation from './components/TroxlerAdaptation';

function App() {
  const handleComplete = () => {
    alert('Adaptation + mask complete!')
  }

  return (
    <div className="App" style={{ textAlign: 'center', padding: 20 }}>
      <h1>Troxler Adaptation Demo</h1>
      <TroxlerAdaptation
        width={600}
        height={400}
        discCount={10}
        discDiameterPx={20}
        eccentricityPx={100}
        blurPx={4}
        adaptDurationMs={30000}
        maskDurationMs={500}
        onComplete={handleComplete}
      />
    </div>
  )
}

export default App