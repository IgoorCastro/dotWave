import { useEffect } from 'react';
import './App.css';
import RoutesApp from './routes';

function App() {
  useEffect(() => {
    document.title = 'dotWave';
  }, []);
  return (
    <RoutesApp />
  );
}

export default App;
