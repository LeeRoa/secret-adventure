import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './Intro.css';

// 🎵 2. 사운드 파일 경로 (public 폴더 안에 sounds 폴더를 만들고 넣어주세요)
const BGM_URL = '/sounds/main_bgm.mp3';
const CLICK_SFX_URL = '/sounds/button_click.mp3';

export default function Intro({ onStart }) {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [showGuide, setShowGuide] = useState(false); // 모달 표시 여부

    // 🎵 3. useSound 훅으로 배경음악과 효과음 준비
    const [playBgm, { stop: stopBgm }] = useSound(BGM_URL, { loop: true, volume: 0.5 });

    useEffect(() => {
        // 🌸 벚꽃 생성 로직 (기존과 동일)
        const createPetal = () => {
            const container = document.querySelector('.intro-container');
            if (!container) return;
            const petal = document.createElement('div');
            petal.className = 'sakura';
            const size = Math.random() * 10 + 10 + 'px';
            petal.style.left = Math.random() * window.innerWidth + 'px';
            petal.style.width = size;
            petal.style.height = size;
            petal.style.animationDuration = Math.random() * 3 + 5 + 's';
            petal.style.opacity = Math.random();
            container.appendChild(petal);
            setTimeout(() => petal.remove(), 8000);
        };
        const interval = setInterval(createPetal, 300);
        return () => clearInterval(interval);
    }, []);

    // 1. 첫 번째 버튼 클릭: 모달 열기 + 🎵 소리 재생
    const handleStartClick = () => {
        playBgm();   // 배경음악 시작!
        setShowGuide(true);
    };

    // 2. 모달 안의 '진짜 시작' 버튼 클릭: 페이드아웃 후 전환 + 🎵 효과음
    const handleFinalStart = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            onStart();
            // 💡 만약 본 게임 화면으로 넘어갈 때 이 배경음악을 끄고 싶다면
            // 아래 주석을 해제하세요.
            stopBgm();
        }, 1000 );
    };

    return (
        <div className={`intro-container ${isFadingOut ? 'fade-out-active' : ''}`}>
            <div className="content-wrapper">
                <header className="intro-logo">
                    <img src="/images/logo.png" alt="로고" />
                </header>

                <div className="envelope-wrapper character-card">
                    <img src="/images/envelope.jpg" alt="초대장 캐릭터" className="character-image" />
                    <div className="heart-text">💌 로아가 보내는 비밀 초대장</div>
                </div>

                <button className="start-button" onClick={handleStartClick}>
                    비밀 여행 시작하기
                </button>
            </div>

            {/* --- 안내 모달 레이어 --- */}
            {showGuide && (
                <div className="modal-overlay">
                    <div className="guide-modal">
                        <h3>🌸 로아의 비밀의 방 안내</h3>
                        <p>
                            알수없는 로아의 방에 오신 걸 환영해요!<br/>
                            이곳은 숨겨진 단서를 찾아 로아의 소중한 추억을<br/>
                            하나씩 완성해가는 <strong>힐링 퍼즐 여행</strong>입니다.
                        </p>
                        <ul className="guide-list">
                            <li>🔍 화면 곳곳을 터치해 숨은 아이템을 찾으세요.</li>
                            <li>🧩 획득한 단서로 잠긴 상자를 열 수 있습니다.</li>
                            <li>🎵 배경음악과 함께 천천히 즐겨보세요.</li>
                        </ul>
                        <button className="modal-start-button" onClick={handleFinalStart}>
                            여행 진짜 시작하기!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}