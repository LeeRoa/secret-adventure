import { useState } from 'react';
import Intro from './components/Intro';
import SecretRoom from './components/SecretRoom';
import './App.css'; // CSS는 일단 공통으로 하나만 둡니다

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
      <>
        {!isGameStarted ? (
            <Intro onStart={() => setIsGameStarted(true)} />
        ) : (
            <SecretRoom />
        )}
      </>
  );
}

export default App;