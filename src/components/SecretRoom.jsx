import { useState } from 'react';
import './SecretRoom.css';

export default function SecretRoom() {
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);

    const handleDiaryClick = () => {
        alert("일기장을 클릭했어요! (여기에 비밀번호 입력창이 뜰 예정)");
        setIsDiaryOpen(true);
    };

    return (
        <div className="container fade-in-active">
            <header className="banner">
                <h1>OUR SECRET ADVENTURE</h1>
            </header>
            <div className="main-content">
                <section className="room-area">
                    <div className="desk-background">
                        <div
                            className={`placeholder-item diary ${isDiaryOpen ? 'open' : ''}`}
                            onClick={handleDiaryClick}
                        >
                            일기장<br/>(클릭!)
                        </div>
                        <div className="placeholder-item candle">촛대</div>
                        <div className="placeholder-item chest">보물상자<br/>(최종)</div>
                    </div>
                </section>
                <section className="map-area">
                    <div className="map-background">
                        <h2>우리의 보물지도</h2>
                        <div className="checkpoint start">START</div>
                        <div className="checkpoint point1">첫 만남</div>
                        <div className="checkpoint point2">100일</div>
                        <div className="checkpoint end">X (보물)</div>
                    </div>
                </section>
            </div>
        </div>
    );
}