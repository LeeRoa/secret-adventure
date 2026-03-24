import { useState } from 'react';
import './SecretRoom.css';

export default function SecretRoom({ onEnd }) {
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isDiaryRead, setIsDiaryRead] = useState(false);
    const [showMemory, setShowMemory] = useState(false);
    const [showGamePuzzle, setShowGamePuzzle] = useState(false);
    const [showGameDetail, setShowGameDetail] = useState(false); // 💡 보드게임 상세 내용 상태 추가
    const [isGameSolved, setIsGameSolved] = useState(false);

    const [password, setPassword] = useState('');
    const [gameAnswer, setGameAnswer] = useState('');

    const CORRECT_PASSWORD = '250118';
    const CORRECT_GAME = '튜링머신';

    // --- 일기장 관련 함수 ---
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

    // --- 보드게임 관련 함수 ---
    const handleGameClick = () => {
        if (isGameSolved) {
            setShowGameDetail(true); // 이미 풀었다면 바로 내용 보기
        } else if (isDiaryRead) {
            setShowGamePuzzle(true);
        } else {
            alert("지도를 먼저 확인해봐! 🗺️");
        }
    };

    const handleGameConfirm = () => {
        if (gameAnswer.trim() === CORRECT_GAME) {
            setIsGameSolved(true);
            setShowGamePuzzle(false);
            setShowGameDetail(true); // 💡 정답을 맞히면 바로 상세 페이지 오픈!
        } else {
            alert("다시 생각해봐! 😂");
        }
    };

    // --- 보물상자 ---
    const handleChestClick = () => {
        if (isGameSolved) {
            onEnd();
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
                            className={`placeholder-item board-game ${isGameSolved ? 'open' : ''}`} //Solved 대신 open으로 스타일 통일
                            onClick={handleGameClick}
                        >
                            {isGameSolved ? "🎲 즐거웠던 게임" : "🎲 보드게임"}
                        </div>

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
                        <div className="checkpoint end">X</div>
                    </div>
                </section>
            </div>

            {/* 🔐 모달 1: 일기장 비밀번호 */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🔒 비밀번호 입력</h3>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={6} placeholder="날짜를 입력해줘❤️" />
                        <div className="modal-buttons"><button onClick={handleConfirm}>확인</button></div>
                    </div>
                </div>
            )}

            {/* 📖 상세 1: 일기장 (기존 스타일 유지) */}
            {showDetail && (
                <div className="diary-detail-overlay" onClick={handleCloseDiary}>
                    <div className="diary-paper" onClick={(e) => e.stopPropagation()}>
                        <button className="close-diary" onClick={handleCloseDiary}>X</button>
                        <div className="diary-content">
                            <div className="diary-left">
                                <div className="photo-frame"><div className="photo-placeholder">📸 우리의 첫 여행 사진</div></div>
                                <div className="photo-frame second"><div className="photo-placeholder">📸 웃고 있는 우리</div></div>
                            </div>
                            <div className="diary-right">
                                <h2 className="handwriting-title">2026년 3월 24일</h2>
                                <p className="handwriting-text">
                                    안녕? 드디어 일기장을 열었네!<br/><br/>
                                    우리가 함께한 시간들이 벌써 이만큼이나 쌓였어.
                                    처음 만났던 날의 떨림부터, 모든 순간이 나에겐 보물 같아.<br/><br/>
                                    지도의 다음 목적지에도 네가 좋아할 선물을 준비했어.
                                    어서 가보자! 사랑해 ❤️
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🎲 모달 2: 보드게임 퀴즈 */}
            {showGamePuzzle && (
                <div className="modal-overlay" onClick={() => setShowGamePuzzle(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🎲 보드게임 퀴즈</h3>
                        <p>우리가 처음으로 함께 했던<br/>보드게임의 이름은?</p>
                        <input type="text" value={gameAnswer} onChange={(e) => setGameAnswer(e.target.value)} placeholder="보드게임 이름을 입력해줘❤️" />
                        <div className="modal-buttons"><button onClick={handleGameConfirm}>정답 확인</button></div>
                    </div>
                </div>
            )}

            {/* 🎲 상세 2: 보드게임 추억 (일기장과 동일한 스타일) */}
            {showGameDetail && (
                <div className="diary-detail-overlay" onClick={() => setShowGameDetail(false)}>
                    <div className="diary-paper" onClick={(e) => e.stopPropagation()}>
                        <button className="close-diary" onClick={() => setShowGameDetail(false)}>X</button>
                        <div className="diary-content">
                            <div className="diary-left">
                                <div className="photo-frame"><div className="photo-placeholder">📸 보드게임 카페에서</div></div>
                                <div className="photo-frame second"><div className="photo-placeholder">📸 튜링머신 하던 날</div></div>
                            </div>
                            <div className="diary-right">
                                <h2 className="handwriting-title">첫 데이트, 보드게임</h2>
                                <p className="handwriting-text">
                                    그날 기억나? 튜링머신 하나 풀겠다고<br/>
                                    둘이 머리 맞대고 끙끙거렸던 거.<br/><br/>
                                    네가 숫자 하나 맞힐 때마다 아이처럼 좋아하던
                                    모습이 얼마나 예뻤는지 몰라.<br/><br/>
                                    우리는 복잡한 논리 문제보다
                                    더 완벽한 답을 찾은 것 같아. 바로 우리!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 📍 모달 3: 지도 추억 힌트 */}
            {showMemory && (
                <div className="modal-overlay" onClick={() => setShowMemory(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>📍 첫 데이트의 기억</h3>
                        <p>"그날 보드게임 카페 기억나?<br/>네가 이기려고 집중하던 그 표정이 생각나!"</p>
                        <div className="modal-buttons"><button onClick={() => setShowMemory(false)}>추억 간직하기</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}