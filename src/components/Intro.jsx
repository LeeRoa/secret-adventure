import { useState, useEffect } from 'react';
import './Intro.css';

export default function Intro({ onStart }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // 🌸 벚꽃 생성 로직 (Sakura-js의 핵심 로직을 리액트 버전으로 재구성)
        const createPetal = () => {
            const petal = document.createElement('div');
            petal.className = 'sakura';

            // 랜덤한 위치, 크기, 애니메이션 속도 설정
            const size = Math.random() * 10 + 10 + 'px';
            petal.style.left = Math.random() * window.innerWidth + 'px';
            petal.style.width = size;
            petal.style.height = size;
            petal.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5~8초 사이
            petal.style.opacity = Math.random();

            document.querySelector('.intro-container').appendChild(petal);

            // 애니메이션이 끝나면 요소 제거
            setTimeout(() => {
                petal.remove();
            }, 8000);
        };

        // 0.3초마다 꽃잎 하나씩 생성
        const interval = setInterval(createPetal, 300);

        return () => clearInterval(interval); // 화면 넘어가면 중지
    }, []);

    const handleClick = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            onStart();
        }, 1000);
    };

    return (
        <div className={`intro-container ${isFadingOut ? 'fade-out-active' : ''}`}>
            <div className="content-wrapper">
                <header className="intro-logo">
                    <img src="/images/logo.png" alt="로고" />
                </header>

                {/* 💌 초대장 캐릭터 카드 영역 (수정됨) */}
                {/* 💡 envelope-wrapper character-card로 기준점을 잡습니다 */}
                <div className="envelope-wrapper character-card">
                    {/* 💡 이미지는 기준점 안에 꽉 차게 배치합니다 */}
                    <img src="/images/envelope.jpg" alt="초대장 캐릭터" className="character-image" />

                    {/* 💡 중요: 텍스트를 이미지 하트 영역 위에 absolute로 띄웁니다 */}
                    <div className="heart-text">💌 로아가 보내는 비밀 초대장</div>
                </div>

                {/* 버튼은 카드 영역 밖에 배치해서 깔끔하게 만듭니다 */}
                <button className="start-button" onClick={handleClick}>
                    비밀 여행 시작하기
                </button>
            </div>
        </div>
    );
}