import { useEffect, useRef } from 'react';
import './MemoryGallery.css';

export default function MemoryGallery() {
    const galleryRef = useRef(null);

    // 스크롤 시 각 추억들이 나타나는 페이드 인 효과 추가
    useEffect(() => {
        const handleScroll = () => {
            const memoryItems = galleryRef.current.querySelectorAll('.memory-item');
            memoryItems.forEach((item) => {
                const itemTop = item.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight * 0.8; // 화면 80% 지점에 도달하면 애니메이션 시작

                if (itemTop < triggerPoint) {
                    item.classList.add('fade-in');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // 초기 렌더링 시에도 페이드 인 효과 적용
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 💡 두 분의 추억 사진과 메시지를 여기에 넣어주세요!
    const memories = [
        {
            title: "첫 만남의 그 카페",
            date: "2025.01.18",
            // image: "/images/memory1.jpg", // 💡 실제 이미지 파일 경로로 바꿔주세요!
            text: "어색한 인사와 함께 시작된 우리의 이야기. 테이블 위에 있던 따뜻한 촛불처럼, 네가 참 따뜻해 보였어."
        },
        {
            title: "치열했던 루미큐브",
            date: "2025.01.18",
            // image: "/images/memory2.jpg",
            text: "보드게임 카페에서 네가 이기려고 집중하던 그 표정이 아직도 생생해. 승부욕마저도 귀여워 보였던 날."
        },
        {
            title: "우리의 첫 여행",
            date: "2025.03.24",
            // image: "/images/memory3.jpg",
            text: "끝없이 펼쳐진 바다와 네 환한 미소. 함께 걷던 모래사장의 떨림이 아직도 내 마음에 남아있어."
        },
        // 💡 추억을 더 추가하고 싶다면 이 형식을 복사해서 계속 넣어주세요!
    ];

    return (
        <div className="gallery-container fade-in-active" ref={galleryRef}>
            <header className="gallery-header">
                <h1>우리의 추억 여행</h1>
            </header>

            <div className="memory-list">
                {memories.map((memory, index) => (
                    <div key={index} className="memory-item">
                        <div className="polaroid-frame">
                            {/* 💡 이미지가 있다면 img 태그를 활성화하고 경로를 맞춰주세요! */}
                            {memory.image ? (
                                <img src={memory.image} alt={memory.title} />
                            ) : (
                                <div className="img-placeholder">📸 사진을 넣어주세요!</div>
                            )}
                            <div className="polaroid-caption">
                                <h3>{memory.title}</h3>
                                <p className="date">{memory.date}</p>
                            </div>
                        </div>
                        <p className="handwriting-text">{memory.text}</p>
                    </div>
                ))}
            </div>

            {/* 💡 최종 엔딩 메시지 (가장 중요한 부분!) */}
            <div className="final-message">
                <h2 className="final-title">🎉 Adventure Clear! 🎉</h2>
                <div className="paper-book">
                    <p>
                        모든 수수께끼를 다 풀었어!<br/> 우리의 추억들을 하나하나 소중히 기억해줘서 고마워.<br/>
                        사실, 진짜 보물은 지금 내 앞에 있는 너야!
                        <br/>
                        <b>오늘 저녁 7시, 우리가 처음 갔던 그 카페에서 기다릴게.</b>
                        <br/> 사랑해 ❤️
                    </p>
                </div>
                {/* 💡 다시하기 버튼이나 인트로로 돌아가는 버튼을 추가할 수도 있습니다. */}
            </div>
        </div>
    );
}