import { useState, useEffect, useRef } from 'react';
import './SecretRoom.css';

export default function SecretRoom({ onEnd }) {
    const audioRef = useRef(null);

    useEffect(() => {
        // 🎵 방에 들어오자마자 재생할 새로운 BGM (경로는 본인의 파일명에 맞게 수정하세요)
        audioRef.current = new Audio('/sounds/room_bgm.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4; // 배경음이라 조금 더 잔잔하게 40%

        const playBgm = async () => {
            try {
                await audioRef.current.play();
            } catch (err) {
                console.log("자동 재생이 차단되었습니다. 클릭 후 재생됩니다.", err);
            }
        };

        playBgm();

        // 컴포넌트가 사라질 때(onEnd 실행 시) 음악 정지
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // --- 퀘스트 진행 상태 (순차적 해금 로직) ---
    const [isStartClicked, setIsStartClicked] = useState(false);       // 1. 지도 START
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);             // 2. 일기장 비밀번호 통과
    const [isDiaryRead, setIsDiaryRead] = useState(false);             // 3. 일기장 정독 완료 (📍 활성화)

    const [isMemoryChecked, setIsMemoryChecked] = useState(false);     // 4. 📍 첫 데이트 확인 완료 (🎲 활성화)
    const [isGameSolved, setIsGameSolved] = useState(false);           // 5. 보드게임 정답 통과
    const [isGameRead, setIsGameRead] = useState(false);               // 6. 보드게임 추억 정독 완료 (X 활성화)
    const [isFakeClicked, setIsFakeClicked] = useState(false);
    const [isFinalPointReached, setIsFinalPointReached] = useState(false); // 7. 지도의 X 클릭 (🎁 해금)

    // --- UI 모달 상태 ---
    const [isModalOpen, setIsModalOpen] = useState(false);             // 비밀번호 입력창
    const [showDetail, setShowDetail] = useState(false);               // 일기장 상세
    const [showMemory, setShowMemory] = useState(false);               // 📍 첫 데이트 모달
    const [showGamePuzzle, setShowGamePuzzle] = useState(false);       // 🎲 퀴즈 입력창
    const [showGameDetail, setShowGameDetail] = useState(false);       // 🎲 추억 상세
    const [messageModal, setMessageModal] = useState({ open: false, content: '' });

    const [password, setPassword] = useState('');
    const [gameAnswer, setGameAnswer] = useState('');

    const CORRECT_PASSWORD = '250118';
    const CORRECT_GAME = '튜링머신';

    const showAlert = (content) => {
        setMessageModal({ open: true, content });
    };

    // 🚩 [STEP 1] 지도 START 클릭
    const handleStartClick = () => {
        if (!isStartClicked) {
            setIsStartClicked(true);
            showAlert("모험이 시작되었어! 책상 위의 일기장을 먼저 확인해봐!");
        }
    };

    // 📖 [STEP 2] 일기장 클릭 (START 이후 가능)
    const handleDiaryClick = () => {
        if (!isStartClicked) {
            showAlert("지도의 START 지점을 먼저 눌러서 모험을 시작해줘!");
            return;
        }
        if (!isDiaryOpen) setIsModalOpen(true);
        else setShowDetail(true);
    };

    const handleConfirm = () => {
        if (password === CORRECT_PASSWORD) {
            setIsDiaryOpen(true);
            setIsModalOpen(false); // 맞았을 때 닫기
            setShowDetail(true);
            setPassword('');
        } else {
            // 💡 틀렸을 때도 일단 비밀번호 입력창을 닫고 알림창을 보여줍니다.
            setIsModalOpen(false);
            showAlert("음... 다시 한번 생각해봐! 🤔");
            setPassword('');
        }
    };

    const handleCloseDiary = () => {
        setShowDetail(false);
        setIsDiaryRead(true); // 💡 결과: 지도의 📍 활성화
    };

    // 📍 [STEP 3] 첫 데이트(📍) 클릭 (일기장 정독 후 가능)
    const handlePoint1Click = () => {
        if (isDiaryRead) {
            setShowMemory(true);
        } else {
            showAlert("이전 미션을 먼저 풀어야 해!");
        }
    };

    const handleCloseMemory = () => {
        setShowMemory(false);
        setIsMemoryChecked(true); // 💡 결과: 보드게임(🎲) 활성화
    };

    // 🎲 [STEP 4] 보드게임 클릭 (📍 확인 후 가능)
    const handleGameClick = () => {
        if (!isMemoryChecked) {
            showAlert("지도의 '첫 데이트' 지점을 먼저 확인해봐!");
            return;
        }
        if (isGameSolved) setShowGameDetail(true);
        else setShowGamePuzzle(true);
    };

    const handleGameConfirm = () => {
        if (gameAnswer.trim() === CORRECT_GAME) {
            setIsGameSolved(true);
            setShowGamePuzzle(false);
            setShowGameDetail(true);
        } else {
            showAlert("다시 생각해봐! 😂");
        }
    };

    const handleCloseGameDetail = () => {
        setShowGameDetail(false);
        setIsGameRead(true); // 💡 결과: 지도의 X 활성화
    };

    // ❌ [진짜 X 클릭]
    const handleFinalPointClick = () => {
        if (isGameRead) {
            setIsFinalPointReached(true);
            showAlert("정답이야! 마지막 목적지에 도착했어! 이제 보물상자를 열어봐! 🎁");
        } else {
            showAlert("이전 미션을 먼저 풀어야 해!");
        }
    };

    // 💣 [NEW: 가짜 X 클릭]
    const handleFakePointClick = () => {
        if (isGameRead) {
            setIsFakeClicked(true); // 상태를 꽝으로 변경!
            showAlert("앗! 꽝이야 😜 여긴 가짜 보물이 숨겨져 있어. 다른 'X'를 찾아봐!");
        } else {
            showAlert("이전 미션을 먼저 풀어야 해!");
        }
    };

    // 🎁 [STEP 6] 보물상자 클릭 (X 도달 후 가능)
    const handleChestClick = () => {
        if (isFinalPointReached) {
            if (audioRef.current) audioRef.current.pause();
            onEnd(); // 최종 엔딩 화면으로
        } else {
            showAlert("지도의 마지막 목적지(X)를 먼저 찾아야 상자가 열릴 것 같아!");
        }
    };

    return (
        <div className="container fade-in-active">
            <div className="main-content">
                <section className="room-area">
                    <div className="desk-background">
                        {/* 1. 일기장 */}
                        <div className={`placeholder-item diary ${isDiaryOpen ? 'open' : ''}`} onClick={handleDiaryClick}>
                            <img src={isDiaryOpen ? "/images/unlock_diary.png" : "/images/lock_diary.png"} className="item-image" alt="일기장" />
                        </div>

                        {/* 2. 보드게임 */}
                        <div className={`placeholder-item board-game ${isGameSolved ? 'solved' : ''}`} onClick={handleGameClick}>
                            <img src="/images/board_game.png" className="item-image" alt="보드게임" />
                        </div>

                        {/* 3. 보물상자 */}
                        <div className={`placeholder-item chest ${isFinalPointReached ? 'glow' : ''}`} onClick={handleChestClick}>
                            <img
                                /* 💡 조건부 렌더링: 진짜 X를 찾았으면 열린 상자, 아니면 잠긴 상자 */
                                src={isFinalPointReached ? "/images/unlock_box.png" : "/images/lock_box.png"}
                                className="item-image"
                                alt="보물상자"
                            />
                        </div>
                    </div>
                </section>

                {/* --- 오른쪽: 보물지도 영역 (이미지 기반) --- */}
                <section className="map-area">
                    <div className="map-container">
                        {/* 🗺️ 실제 지도 이미지 배치 */}
                        <img
                            src="/images/map.png"
                            alt="보물지도"
                            className="map-base-image"
                        />

                        {/* 📍 지도 위에 띄울 체크포인트들 */}
                        <div className="map-checkpoints">
                            {/* START: 처음부터 활성화(active) */}
                            <div
                                className={`checkpoint start ${isStartClicked ? 'cleared' : 'active'}`}
                                onClick={handleStartClick}
                            >
                                START
                            </div>

                            {/* 📍 첫 데이트: 일기장 확인 후 활성화 */}
                            <div
                                className={`checkpoint point1 ${isDiaryRead ? (isMemoryChecked ? 'cleared' : 'unlocked') : ''}`}
                                onClick={handlePoint1Click}
                            >
                                {!isDiaryRead ? "?" : (isMemoryChecked ? "❤️" : "?")}
                            </div>

                            {/* 💣 가짜 X 지점 */}
                            <div
                                className={`checkpoint end fake ${isGameRead && !isFakeClicked ? 'active' : ''} ${isFakeClicked ? 'clicked' : ''}`}
                                onClick={handleFakePointClick}
                            >
                                {/* 💡 FontAwesome 대신 <img> 사용 (로아님이 제공해주신 둥근 'X' 이미지 적용) */}
                                <img src="/images/xmark-round.png" alt="X" />
                            </div>

                            {/* 🎯 진짜 X 지점 */}
                            <div
                                className={`checkpoint end real ${isGameRead ? (isFinalPointReached ? 'cleared' : 'active') : ''}`}
                                onClick={handleFinalPointClick}
                            >
                                {/* 💡 FontAwesome 대신 <img> 사용 (로아님이 제공해주신 둥근 'X' 이미지 적용) */}
                                <img src="/images/xmark-round.png" alt="X" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="search-deco">
                    <img src="/images/search.png" alt="수색 중인 귀여운 짱구와 철수" />
                </div>
            </div>

            {/* --- 모달/상세창 구성 --- */}
            {messageModal.open && (
                <div className="modal-overlay" onClick={() => setMessageModal({ open: false, content: '' })}>
                    <div className="modal-content message-modal" onClick={(e) => e.stopPropagation()}>
                        <p className="message-text">{messageModal.content}</p>
                        <div className="modal-buttons">
                            <button onClick={() => setMessageModal({ open: false, content: '' })}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🔒 비밀번호 입력</h3>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={6} placeholder="틀리면 죽어" />
                        <div className="modal-buttons"><button onClick={handleConfirm}>확인</button></div>
                    </div>
                </div>
            )}

            {(showDetail || showGameDetail) && (
                <div className="diary-detail-overlay" onClick={showDetail ? handleCloseDiary : handleCloseGameDetail}>
                    <div className="diary-paper" onClick={(e) => e.stopPropagation()}>
                        <button className="close-diary" onClick={showDetail ? handleCloseDiary : handleCloseGameDetail}>X</button>
                        <div className="diary-content">
                            <div className="diary-left">
                                <div className="photo-frame"><div className="photo-placeholder">📸 {showDetail ? "우리의 첫 여행" : "보드게임 카페"}</div></div>
                                <div className="photo-frame second"><div className="photo-placeholder">📸 {showDetail ? "웃고 있는 우리" : "열중하는 모습"}</div></div>
                            </div>
                            <div className="diary-right">
                                <h2 className="handwriting-title">{showDetail ? "2026년 3월 24일" : "첫 데이트, 보드게임"}</h2>
                                <p className="handwriting-text">
                                    {showDetail ?
                                        "안녕? 드디어 일기장을 열었네!\n\n우리가 함께한 시간들이 벌써 이만큼이나 쌓였어. 처음 만났던 날의 떨림부터, 모든 순간이 나에겐 보물 같아.\n\n지도의 다음 목적지에도 네가 좋아할 선물을 준비했어. 어서 가보자! 사랑해 ❤️"
                                        :
                                        "그날 기억나? 튜링머신 하나 풀겠다고\n둘이 머리 맞대고 끙끙거렸던 거.\n\n네가 숫자 하나 맞힐 때마다 아이처럼 좋아하던 모습이 얼마나 예뻤는지 몰라.\n\n우리는 복잡한 논리 문제보다 더 완벽한 답을 찾은 것 같아. 바로 우리!"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showGamePuzzle && (
                <div className="modal-overlay" onClick={() => setShowGamePuzzle(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🎲 보드게임 퀴즈</h3>
                        <p>우리가 처음으로 함께 했던<br/>보드게임의 이름은?</p>
                        <input type="text" value={gameAnswer} onChange={(e) => setGameAnswer(e.target.value)} placeholder="정답 입력" />
                        <div className="modal-buttons"><button onClick={handleGameConfirm}>정답 확인</button></div>
                    </div>
                </div>
            )}

            {showMemory && (
                <div className="modal-overlay" onClick={handleCloseMemory}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>📍 첫 데이트의 기억</h3>
                        <p>"그날 보드게임 카페 기억나?<br/>네가 이기려고 집중하던 그 표정이 생각나!"</p>
                        <div className="modal-buttons"><button onClick={handleCloseMemory}>확인</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}