import { useState } from 'react';
import Intro from './components/Intro';
import SecretRoom from './components/SecretRoom';
// 💡 새로운 추억 갤러리 컴포넌트 임포트
import MemoryGallery from './components/MemoryGallery';

function App() {
    // scene 상태: 'INTRO', 'ROOM', 'GALLERY'
    const [scene, setScene] = useState('INTRO');

    // 인트로 -> 어드벤처 전환
    const startAdventure = () => {
        setScene('ROOM');
    };

    // 💡 어드벤처 -> 추억 갤러리 전환 함수 추가
    const goToGallery = () => {
        setScene('GALLERY');
    };

    return (
        <div className="App">
            {scene === 'INTRO' && <Intro onStart={startAdventure} />}
            {scene === 'ROOM' && <SecretRoom onEnd={goToGallery} />} {/* onEnd 전달 */}
            {/* 💡 추억 갤러리 화면으로 전환될 때 렌더링 */}
            {scene === 'GALLERY' && <MemoryGallery />}
        </div>
    );
}

export default App;