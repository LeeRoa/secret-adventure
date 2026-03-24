import { useEffect, useState } from 'react';
import './MemoryGallery.css';

export default function MemoryGallery() {
    // 💡 여기에 두 분의 실제 추억을 데이터로 넣으세요!
    const memories = [
        {
            id: 1,
            title: "우리의 시작",
            date: "2025.01.18",
            text: "어색하게 인사하던 그날의 우리가 생각나.\n지금은 세상에서 가장 가까운 사이가 되었네.",
            img: "/images/memory1.jpg" // public/images 폴더에 사진을 넣으면 됩니다!
        },
        {
            id: 2,
            title: "첫 번째 여행",
            date: "2025.03.24",
            text: "바다 냄새와 네 웃음소리가 가득했던 날.\n함께 찍은 이 사진은 내가 제일 아끼는 사진이야.",
            img: "/images/memory2.jpg"
        },
        // ... 추억을 계속 추가하세요!
    ];

    return (
        <div className="gallery-wrapper fade-in-active">
            <header className="gallery-header">
                <h1>Our Treasure Memories</h1>
                <p>우리가 함께한 소중한 순간들</p>
            </header>

            <div className="memory-scroll-area">
                {memories.map((m) => (
                    <div key={m.id} className="memory-card">
                        <div className="polaroid">
                            <img src={m.img} alt={m.title} onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Photo'} />
                            <div className="polaroid-info">
                                <span>{m.title}</span>
                                <span>{m.date}</span>
                            </div>
                        </div>
                        <div className="memory-comment">
                            <p className="handwriting-text">{m.text}</p>
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