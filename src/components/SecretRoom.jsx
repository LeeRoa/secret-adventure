import { useState } from 'react';
import './SecretRoom.css';

export default function SecretRoom() {
    const [isDiaryOpen, setIsDiaryOpen] = useState(false); // 일기장이 열렸는지
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창이 떴는지
    const [password, setPassword] = useState(''); // 입력한 비밀번호

    // 💡 정답 설정 (예: 2024년 5월 20일 -> 240520)
    const CORRECT_PASSWORD = '250118';

    const handleDiaryClick = () => {
        if (!isDiaryOpen) {
            setIsModalOpen(true); // 닫혀있을 때만 모달 열기
        }
    };

    const handleConfirm = () => {
        if (password === CORRECT_PASSWORD) {
            alert("정답이야! 일기장이 열렸어. ✨");
            setIsDiaryOpen(true);
            setIsModalOpen(false);
            setPassword('');
        } else {
            alert("음... 다시 한번 생각해봐! 🤔");
            setPassword('');
        }
    };

    return (
        <div className="container fade-in-active">
            <header className="banner">
                <h1>OUR SECRET ADVENTURE</h1>
            </header>

            <div className="main-content">
                {/* 왼쪽: 비밀의 방 */}
                <section className="room-area">
                    <div className="desk-background">
                        <div
                            className={`placeholder-item diary ${isDiaryOpen ? 'open' : ''}`}
                            onClick={handleDiaryClick}
                        >
                            {isDiaryOpen ? "열린 일기장📖" : "잠긴 일기장🔒"}
                        </div>
                        <div className="placeholder-item candle">촛대</div>
                        <div className="placeholder-item chest">보물상자</div>
                    </div>
                </section>

                {/* 오른쪽: 보물지도 */}
                <section className="map-area">
                    <div className="map-background">
                        <h2>우리의 보물지도</h2>
                        <div className={`checkpoint start ${isDiaryOpen ? 'cleared' : ''}`}>START</div>
                        <div className="checkpoint point1">첫 만남</div>
                        <div className="checkpoint end">X</div>
                    </div>
                </section>
            </div>

            {/* 🔐 비밀번호 입력 모달창 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>🔒 비밀번호를 입력해줘</h3>
                        <p>우리가 처음 만난 날은 언제일까? (YYMMDD)</p>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="여기에 입력..."
                            maxLength={6}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleConfirm}>확인</button>
                            <button onClick={() => setIsModalOpen(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}