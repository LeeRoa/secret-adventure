import { useEffect, useRef } from 'react'; // 🎵 useRef 추가
import './MemoryGallery.css';

export default function MemoryGallery() {
    const audioRef = useRef(null); // 🎵 오디오 객체 저장
    const sakuraContainerRef = useRef(null); // ⭐ 벚꽃을 담을 전용 유리창

    useEffect(() => {
        // 🎵 엔딩용 감동적인 BGM 설정
        audioRef.current = new Audio('/sounds/ending_bgm.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        const playBgm = async () => {
            try {
                await audioRef.current.play();
            } catch (err) {
                console.log("자동 재생이 차단되었습니다. 클릭 후 재생됩니다.", err);
            }
        };

        playBgm();

        // 🎵 컴포넌트 언마운트 시 음악 정지
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // 🌸 2. 벚꽃 내리는 효과용 useEffect (스크롤 완벽 대응 버전)
    useEffect(() => {
        const createPetal = () => {
            if (!sakuraContainerRef.current) return;

            const petal = document.createElement('div');
            petal.className = 'sakura';

            const size = Math.random() * 10 + 10 + 'px';
            petal.style.left = Math.random() * 100 + 'vw'; // 화면 가로 전체에서 랜덤
            petal.style.width = size;
            petal.style.height = size;
            petal.style.animationDuration = Math.random() * 3 + 6 + 's'; // 6~9초로 조금 더 여유롭게

            sakuraContainerRef.current.appendChild(petal);

            setTimeout(() => {
                if (petal.parentNode) petal.remove();
            }, 9000); // 애니메이션 시간에 맞춰 삭제 시간도 연장
        };

        const interval = setInterval(createPetal, 300);
        return () => clearInterval(interval);
    }, []);

    const memories = [
        {
            id: 1,
            title: "처음찍은 인생네컷",
            date: "2025.01.20",
            text: "아직은 어색하고 두근거렸던 우리 둘의 인생네컷이야. 이때의 우리는 너무 풋풋했는데, 언제 이렇게 가까워진걸까?",
            img: "/images/love/1.jpg"
        },
        {
            id: 2,
            title: "쇼플릭스 관람하러 간 날",
            date: "2025.01.30",
            text: "나에게 뮤지컬 펍이 있다는 걸 처음 경험시켜준 날이야. 내가 세상의 주인공이 된 것만 같은 기분을 느끼게 해줘서 고마워.",
            img: "/images/love/2.jpg"
        },
        {
            id: 3,
            title: "함께 만든 커플링",
            date: "2025.02.22",
            text: "홍대가서 같이 서로의 커플링을 맞춘 날이야. 반지 안쪽 각인 '해오름달 열여드레'가 너무 이뻤어. 근데 너의 손은 왜 이렇게 이쁜거니? 😒",
            img: "/images/love/3.jpg"
        },
        {
            id: 4,
            title: "첫 제주도 여행",
            date: "2025.03.02",
            text: "너와의 첫 여행으로 제주도가서 찍은 인생네컷 사진이야. 먼 거리를 운전하느라 고생도했고 나를 위해 완벽한 코스까지 짜준 자기가 너무 고마웠어.",
            img: "/images/love/4.jpg"
        },
        {
            id: 5,
            title: "첫 제주도 여행",
            date: "2025.03.02",
            text: "너와의 첫 여행으로 제주도가서 찍은 인생네컷 사진이야. 먼 거리를 운전하느라 고생도했고 나를 위해 완벽한 코스까지 짜준 자기가 너무 고마웠어.",
            img: "/images/love/4.jpg"
        },
    ];

    return (
        <div className="gallery-wrapper fade-in-active">
            <div ref={sakuraContainerRef} className="sakura-container"></div>
            <header className="gallery-header">
                <h1>Our Treasure Memories</h1>
                <p>우리가 함께한 소중한 순간들</p>
            </header>

            <div className="memory-scroll-area">
                {memories.map((m) => (
                    <div key={m.id} className="memory-card">
                        <div className="polaroid">
                            <div className="polaroid-photo"> {/* 📸 정사각형 영역으로 감싸기 */}
                                <img
                                    src={m.img}
                                    alt={m.title}
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Photo'}
                                    className="contained-image"
                                />
                            </div>
                            <div className="polaroid-info">
                                <span>{m.title}</span>
                                <span>{m.date}</span>
                            </div>
                        </div>
                        <div className="memory-comment">
                            <p className="handwriting-text ending-text">{m.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="final-letter">
                <div className="letter-paper">
                    <h2>To. 사랑하는 준서에게</h2>
                    <p>
                        모든 미션을 완료해줘서 고마워.<br/>
                        지도를 따라온 이 여정처럼,<br/>
                        앞으로도 우리만의 보물을 찾아가자.<br/><br/>
                        <b>사랑해 ❤️</b>
                    </p>
                </div>
            </footer>
        </div>
    );
}