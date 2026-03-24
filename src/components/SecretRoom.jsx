import { useState } from 'react';
import './SecretRoom.css';

export default function SecretRoom() {
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isDiaryRead, setIsDiaryRead] = useState(false);
    const [showMemory, setShowMemory] = useState(false);
    const [showGamePuzzle, setShowGamePuzzle] = useState(false);
    const [isGameSolved, setIsGameSolved] = useState(false);
    const [showEnding, setShowEnding] = useState(false);

    const [password, setPassword] = useState('');
    const [gameAnswer, setGameAnswer] = useState('');

    const CORRECT_PASSWORD = '250118';
    const CORRECT_GAME = '튜링머신';

    const handleDiaryClick = () => {
        if (!isDiaryOpen) setIsModalOpen(true);
        else setShowDetail(true);
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

    const handleCloseDiary = () => {
        setShowDetail(false);
        setIsDiaryRead(true);
    };

    const handleChestClick = () => {
        if (isGameSolved) {
            setShowEnding(true); // 🎲 게임을 맞혔을 때만 엔딩 오픈!
        } else {
            alert("아직 상자가 꽉 잠겨있어. 보드게임의 비밀을 먼저 풀어줘! 🎲");
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
                        <div className={`placeholder-item diary ${isDiaryOpen ? 'open' : ''}`} onClick={handleDiaryClick}>
                            {isDiaryOpen ? "📖 우리의 추억" : "🔒 잠긴 일기장"}
                        </div>

                        <div
                            className={`placeholder-item board-game ${isGameSolved ? 'solved' : ''}`}
                            onClick={() => isDiaryRead ? setShowGamePuzzle(true) : alert("지도를 먼저 확인해봐! 🗺️")}
                        >
                            {isGameSolved ? "🎲 즐거웠던 게임" : "🎲 보드게임"}
                        </div>

                        {/* 💡 보물상자 클릭 이벤트 연결 */}
                        <div className={`placeholder-item chest ${isGameSolved ? 'glow' : ''}`} onClick={handleChestClick}>
                            {isGameSolved ? "🔓 열기!" : "🎁 보물상자"}
                        </div>
                    </div>
                </section>

                <section className="map-area">
                    <div className="map-background">
                        <h2>우리의 보물지도</h2>
                        <div className={`checkpoint start ${isDiaryOpen ? 'cleared' : ''}`}>START</div>
                        <div
                            className={`checkpoint point1 ${isDiaryRead ? 'unlocked' : ''}`}
                            onClick={() => isDiaryRead && setShowMemory(true)}
                        >
                            {isDiaryRead ? "📍 첫 데이트" : "?"}
                        </div>
                        {/* 💡 엔딩을 보면 마지막 목적지까지 클리어! */}
                        <div className={`checkpoint end ${showEnding ? 'cleared' : ''}`}>X</div>
                    </div>
                </section>
            </div>

            {/* 🔐 비밀번호 입력 모달 */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🔒 비밀번호 입력</h3>
                        <p>우리가 처음 만난 날은? (YYMMDD)</p>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={6} placeholder="날짜를 입력해줘❤️" />
                        <div className="modal-buttons">
                            <button onClick={handleConfirm}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 📖 일기장 상세 (로아님이 주신 스타일 그대로!) */}
            {showDetail && (
                <div className="diary-detail-overlay" onClick={handleCloseDiary}>
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

            {/* 📍 지도 클릭 추억 팝업 */}
            {showMemory && (
                <div className="modal-overlay" onClick={() => setShowMemory(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>📍 첫 데이트의 기억</h3>
                        <p>"그날 보드게임 카페 기억나?<br/>네가 이기려고 집중하던 그 표정이 생각나!"</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowMemory(false)}>추억 간직하기</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🎲 보드게임 퀴즈 팝업 */}
            {showGamePuzzle && (
                <div className="modal-overlay" onClick={() => setShowGamePuzzle(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🎲 보드게임 퀴즈</h3>
                        <p>우리가 처음으로 함께 했던<br/>보드게임의 이름은?</p>
                        <input type="text" value={gameAnswer} onChange={(e) => setGameAnswer(e.target.value)} placeholder="보드게임 이름을 입력해줘❤️" />
                        <div className="modal-buttons">
                            <button onClick={() => {
                                if(gameAnswer === CORRECT_GAME) {
                                    setIsGameSolved(true);
                                    setShowGamePuzzle(false);
                                } else alert("다시 생각해봐! 😂");
                            }}>정답 확인</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🎊 5. 최종 엔딩 모달 (편지/선물) */}
            {showEnding && (
                <div className="ending-overlay" onClick={() => setShowEnding(false)}>
                    <div className="ending-card" onClick={(e) => e.stopPropagation()}>
                        <div className="confetti-effect"></div> {/* CSS로 만드는 팡! 효과 */}
                        <h2 className="ending-title">🎉 Adventure Clear! 🎉</h2>
                        <div className="ending-letter">
                            <p>축하해! 모든 수수께끼를 다 풀었어.</p>
                            <p>우리의 추억들을 하나하나 소중히 기억해줘서 고마워.</p>
                            <hr />
                            <p className="final-message">
                                사실 진짜 보물은 지금 내 앞에 있는 너야!<br/>
                                <b>오늘 저녁 7시, 우리가 처음 갔던 그 카페에서 기다릴게.</b><br/>
                                사랑해 ❤️
                            </p>
                        </div>
                        <button className="close-btn" onClick={() => setShowEnding(false)}>모험 마치기</button>
                    </div>
                </div>
            )}
        </div>
    );
}