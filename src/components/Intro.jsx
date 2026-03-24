import { useState } from 'react';
import './Intro.css';

export default function Intro({ onStart }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleClick = () => {
        setIsFadingOut(true);
        // 1초 뒤에 App.jsx에서 넘겨준 게임 시작 함수를 실행합니다.
        setTimeout(() => {
            onStart();
        }, 1000);
    };

    return (
        <div className={`intro-container ${isFadingOut ? 'fade-out-active' : ''}`}>
            <div className="envelope-wrapper">
                <div className="placeholder-envelope">
                    💌 로아가 보내는 비밀 초대장
                </div>
                <button className="start-button" onClick={handleClick}>
                    비밀 여행 시작하기
                </button>
            </div>
        </div>
    );
}