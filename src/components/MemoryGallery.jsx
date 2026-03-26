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
            text: "자기랑 첫 여행으로 제주도가서 찍은 인생네컷 사진이야. 먼 거리를 운전하느라 고생도했고 나를 위해 완벽한 코스까지 짜준 자기가 너무 고마웠어.",
            img: "/images/love/4.jpg"
        },
        {
            id: 5,
            title: "롯데월드 교복 데이트",
            date: "2025.03.15",
            text: "자기랑 교복 대여하고 롯데월드에서 데이트한 날이야. 자기랑 이렇게 이쁜 교복을 입고 이색 데이트를 해서 너무 행복했어. 우리 아직 고딩 같지 않니?😋",
            img: "/images/love/5.jpg"
        },
        {
            id: 6,
            title: "1년 전 준서 생일파티",
            date: "2025.03.29",
            text: "자기와 같이 생일을 보내고 다음날에 진접 팸들이랑 다산에서 파티했던 날이야. 자기가 이렇게 활짝 웃는 모습을 보니까 나도 행복해지네.",
            img: "/images/love/6.jpg"
        },
        {
            id: 7,
            title: "콜드플레이 내한공연",
            date: "2025.04.25",
            text: "콜드플레이 내한공연 티켓이 생겨서 함께 공연을 보러 갔던 날이야. 게스트도 많았고, 노래도 좋았고, 무엇보다 너랑 함께 있어서 행복했던 순간이었어.",
            img: "/images/love/7.jpg"
        },
        {
            id: 8,
            title: "처음 캠핑간 날",
            date: "2025.05.05",
            text: "용규랑 셋이 같이 캠핑간 날이야. 이때 자기가 깔깔이 입고 장작 패겠다고 난리치던게 너무 웃겼어. 캠핑의 즐거움을 알게해줘서 고마워",
            img: "/images/love/8.gif"
        },
        {
            id: 9,
            title: "익선동 데이트",
            date: "2025.05.18",
            text: "익선동에서 맛도리 디저트 먹고 근처 오락실에서 잠시 코노를 갔던 날. 헤드셋이 있는 코인노래방은 처음이었어! 자기는 노래부를 때 제일 설레더라❤️",
            img: "/images/love/9.jpg"
        },
        {
            id: 10,
            title: "부산 여행",
            date: "2025.06.14",
            text: "친구 결혼식때문에 함께 내려와준 날이야. 먼 길 같이 동행해줘서 너무 고마워 자기야. 같이 부산에서 즉흥 여행도 하고 너에 대해서 많이 알아간 시간이었어.",
            img: "/images/love/10.jpg"
        },
        {
            id: 11,
            title: "처음 경험한 빠지",
            date: "2025.07.12",
            text: "용규랑 셋이서 간 가평 빠지 여행이야. 이때 너네가 열심히 고기 굽고 더워서 선풍기 쐐러 간 모습이 너무 웃겨서 찍었던 게 생각나. 너네 둘이 개그 콤비야😂",
            img: "/images/love/11.jpg"
        },
        {
            id: 12,
            title: "후쿠오카 여행",
            date: "2025.08.05",
            text: "후쿠오카에서 수족관을 가려고 기차를 기다릴 때 너를 몰래 도촬했어. 파란 하늘과 생기있는 너의 모습이 너무 잘 어울리더라. 자기가 너무 이뻐보였어.",
            img: "/images/love/12.jpg"
        },
        {
            id: 13,
            title: "을왕리 드라이브",
            date: "2025.09.05",
            text: "밤에 바다보고 싶어서 다같이 을왕리를 갔던 날이야. 나한테 휴대폰을 보여주는 자기가 너무 귀여웠어. 근데 투명 네일 바르는 법은 왜 보여주는 거야?",
            img: "/images/love/13.jpg"
        },
        {
            id: 14,
            title: "성수 나들이한 날",
            date: "2025.09.21",
            text: "성수 데이트하러 간 날 젠틀 몬스터 팝업스토어에서 둘이 찰칵✨ 젠틀 몬스터가 가장 잘 어울리는 남자 이.준.서.",
            img: "/images/love/14.jpg"
        },
        {
            id: 15,
            title: "집에서 팩하기",
            date: "2025.09.22",
            text: "같이 집에서 팩하고 누워있을 때 찍은 너야. 팩 떨어질까봐 말도 못하고 눈은 왜자꾸 감는거야? 잘 붙어있는지 확인하는 저 손짓도 귀여워서 미치겠어😑",
            img: "/images/love/15.jpg"
        },
        {
            id: 16,
            title: "홍대 데이트",
            date: "2025.09.27",
            text: "홍대로 서로의 마음을 확인하고 더 좋은 관계로 발전하기 위해 4233에 방문했던 날이야. 이때의 너와 내가 했던 모든 것들이 너무 뜻 깊은 날이었어. 사랑해 준서야.",
            img: "/images/love/16.jpg"
        },
        {
            id: 17,
            title: "그냥 귀여운 테토남 이준서",
            date: "2025.10.07",
            text: "콧물이 너무 난다고 콧구멍을 그냥 무식하게 두 개 다 막아버린 테토 이준서. 멋지다. 준서야👏👏",
            img: "/images/love/17.jpg"
        },
        {
            id: 18,
            title: "T1이 경기 이긴 날",
            date: "2025.10.31",
            text: "이 때 롤드컵이었나? 5:3 기적적으로 이긴 날이 맞는진 모르겠는데, T1이 이겼다고 바닥에서 비보잉 하던 너가 너무 웃기고 귀여웠어.",
            img: "/images/love/18.jpg"
        },
        {
            id: 19,
            title: "코엑스 데이트",
            date: "2025.11.23",
            text: "자기가 코엑스에 대형 트리가 설치됐다고 보러가자고 해서 보러간 날이야. 항상 맛집 찾아서 맛있는거 먹여주고 좋은거만 찾아서 보여주고 나를 위해 신경써줘서 고마워.",
            img: "/images/love/19.jpg"
        },
        {
            id: 20,
            title: "용규 집에서 파자마 파티",
            date: "2025.11.30",
            text: "용규 집 비어서 닌텐도 들고 용규, 영해랑 모였던 날이야. 딸기 데리고 가서 자기가 딸기 귀여워하는 모습이 너무 귀여워서 몰래 도촬했어.",
            img: "/images/love/20.jpg"
        },
        {
            id: 21,
            title: "친구들과 즉흥 청주 여행",
            date: "2025.12.25",
            text: "용규, 영해랑 넷이서 즉흥 우정 여행을 다녀왔지. 밤에 잘 곳 없어서 차에서 오들오들 떨며 찜질방이 오픈되기 까지 기다린 추억.. 짜릿했고 너무 재밌었어🤩",
            img: "/images/love/21.jpg"
        },
        {
            id: 22,
            title: "영해의 사진 전시회 방문",
            date: "2025.12.28",
            text: "영해의 대학 사진 동아리에서 사진전을 열어서 축하해주러 간 날이야. 자기도 한 사진 하는데 나중에 자기한테 카메라 꼭 사줄 거야.",
            img: "/images/love/22.jpg"
        },
        {
            id: 23,
            title: "이준서 개만취",
            date: "2026.01.01",
            text: "새해 기념 친한 언니, 오빠들이랑 모여서 다 같이 술마신 날에 술이 떡이 돼서 명석오빠, 용규가 챙기고 용규는 심지어 업고 너를 데려갔던 날.. 정말 용규같은 친구 없다.",
            img: "/images/love/23.jpg"
        },
        {
            id: 24,
            title: "강릉 1주년 기념 여행",
            date: "2026.01.18",
            text: "자기랑 1주년 기념으로 강릉으로 여행간 날이야. 도깨비 촬영지에서 도깨비같이 있으니까 너 참 무척이나 공유같다. 잘생긴 이준서.",
            img: "/images/love/24.jpg"
        },
        {
            id: 25,
            title: "베트남 호치민 여행",
            date: "2026.02.28",
            text: "베트남 호치민에서 무이네 사막을 갔던 날. 일출을 보기 위해서 새벽부터 달린 보람이 있었어. 자기는 뒷태도 미남이네😘",
            img: "/images/love/25.jpg"
        },
        {
            id: 26,
            title: "지금 내 옆에 있는 너",
            date: "2026.03.26",
            text: "수염을 안깎아도, 세수를 안하고 머리를 안감아도, 너라는 자체를 사랑하고 있어. 항상 언제나 내 옆에서 행복하게 해줘서 고마워. 나의 선물은 여기까지야.",
            img: "/images/love/26.jpg"
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
                        모든 미션을 완료하고 이 글을 끝까지 읽어줘서 고마워.<br/>
                        지도를 따라 추억을 만들어온 이 여정처럼,<br/>
                        앞으로도 우리만의 보물을 찾아가자.<br/>
                        항상 내 옆에서 웃게해주는 네가 나한테는 가장 큰 선물이야.
                        나도 너를 항상 웃게 만들어 줄게.
                        <br/>생일 너무 축하해 준서야.
                        <br/><br/>
                        <b>사랑해 이준서❤️</b>
                    </p>
                </div>
            </footer>
        </div>
    );
}