import { useState } from 'react';
import './App.css';
import Game from './Game';
import Controls from './Controls';
function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [winner, setWinner] = useState(false);
  const handleStart = () => {
    setHasStarted(!hasStarted);
    setWinner(false);
  }
  return (<div>
    {hasStarted && <Game hasWon={winner} onGameWin={() => setWinner(true)} />}
    <Controls hasStarted={hasStarted} hasWon={winner} onStart={handleStart} />
  </div>);
}

export default App;
