import { useState } from 'react';
import './SecretRoom.css';

export default function SecretRoom() {
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isDiaryRead, setIsDiaryRead] = useState(false);
    const [password, setPassword] = useState('');

    const CORRECT_PASSWORD = '250118';

    const handleDiaryClick = () => {
        if (!isDiaryOpen) {
            setIsModalOpen(true);
        } else {
            setShowDetail(true);
        }
    };

    const handleCloseDiary = () => {
        setShowDetail(false);
        setIsDiaryRead(true); // 💡 일기장을 닫는 순간 "읽음"으로 표시 -> 지도 업데이트 트리거
    };

    const handleConfirm = () => {
        if (password === CORRECT_PASSWORD) {
            setIsDiaryOpen(true);
            setIsModalOpen(false);
            setShowDetail(true);
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
                <section className="room-area">
                    <div className="desk-background">
                        <div
                            className={`placeholder-item diary ${isDiaryOpen ? 'open' : ''}`}
                            onClick={handleDiaryClick}
                        >
                            {isDiaryOpen ? "📖 우리의 추억" : "🔒 잠긴 일기장"}
                        </div>
                        {/* 촛대, 보물상자 등 다른 소품 영역들 */}
                        <div className="placeholder-item candle">🕯️ 촛대</div>
                        <div className="placeholder-item chest">🎁 보물상자</div>
                    </div>
                </section>

                <section className="map-area">
                    <div className="map-background">
                        <h2>우리의 보물지도</h2>
                        {/* START는 일기장 비밀번호만 맞히면 바로 클리어 */}
                        <div className={`checkpoint start ${isDiaryOpen ? 'cleared' : ''}`}>START</div>

                        {/* 💡 일기장을 닫는 순간 'unlocked' 클래스가 붙으며 애니메이션 시작 */}
                        <div className={`checkpoint point1 ${isDiaryRead ? 'unlocked' : ''}`}>
                            {isDiaryRead ? "📍 첫 만남의 장소" : "?"}
                        </div>

                        <div className="checkpoint end">X</div>
                    </div>
                </section>
            </div>

            {/* 🔐 비밀번호 입력 모달창 */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🔒 비밀번호 입력</h3>
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

            {/* 📖 펴진 일기장 상세 보기 */}
            {showDetail && (
                <div className="diary-detail-overlay" onClick={() => setShowDetail(false)}>
                    <div className="diary-paper" onClick={(e) => e.stopPropagation()}>
                        <button className="close-diary" onClick={handleCloseDiary}>X</button>

                        <div className="diary-content">
                            <div className="diary-left">
                                <div className="photo-frame">
                                    <div className="photo-placeholder">📸 우리의 첫 여행 사진</div>
                                </div>
                                <div className="photo-frame second">
                                    <div className="photo-placeholder">📸 웃고 있는 우리</div>
                                </div>
                            </div>

                            <div className="diary-right">
                                <h2 className="handwriting-title">2026년 3월 24일</h2>
                                <p className="handwriting-text">
                                    안녕? 드디어 일기장을 열었네!<br/><br/>
                                    우리가 함께한 시간들이 벌써 이만큼이나 쌓였어.
                                    처음 만났던 날의 떨림부터, 같이 웃고 울었던
                                    모든 순간이 나에겐 보물 같아.<br/><br/>
                                    지도의 다음 목적지에도 네가 좋아할 선물을 준비했어.
                                    어서 가보자! 사랑해 ❤️
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}