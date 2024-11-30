import styles from './main.module.css';
import { useState, useEffect } from 'react';
import Calendar from './calendar';
import DiaryWrite from './diaryWrite';
import axios from 'axios';

const Main = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [showDiaryWrite, setShowDiaryWrite] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true); // 툴팁 표시 상태

  const [hasDiary, setHasDiary] = useState(false); // 일기 작성 여부 상태 추가

  const [exp, setExp] = useState(26); // 경험치 상태 추가

  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [prevExp, setPrevExp] = useState(0);

  const [name, setName] = useState('');

  // 일기 작성 여부 확인
  useEffect(() => {
    const checkDiary = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/diary/check', {
          headers: {
            Authorization: token,
          },
        });
        setHasDiary(response.data === 1);
      } catch (error) {
        console.error('일기 작성 여부 확인 실패:', error);
      }
    };

    checkDiary();
  }, []);

  useEffect(() => {
    // 페이지 로드 시 툴팁을 보이게 설정
    setShowTooltip(true);
  }, []);

  // 페이지의 어느 곳이든 클릭하면 툴팁이 사라지도록
  const handlePageClick = () => {
    setShowTooltip(false);
  };

  // 트리 정보 가져오기
  useEffect(() => {
    const fetchTreeInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/tree/info', {
          headers: {
            Authorization: token,
          },
        });
        setExp(response.data.exp);
        setName(response.data.name); // 이름 설정
      } catch (error) {
        console.error('트리 정보 조회 실패:', error);
      }
    };

    fetchTreeInfo();
  }, []);

  // 트리 레벨과 게이지 계산
  const getTreeLevel = (exp) => {
    if (exp >= 30) return 4;
    if (exp >= 20) return 3;
    if (exp >= 10) return 2;
    return 1;
  };

  const getGaugePercentage = (exp) => {
    return ((exp % 10) / 10) * 100;
  };

  const getGaugeMessage = (exp) => {
    const level = getTreeLevel(exp);
    if (level === 4) return '축하합니다! 행복나무로 다 자랐어요!';

    const remainingDiaries = 10 - (exp % 10);
    const nextTreeName =
      level === 1 ? '묘목' : level === 2 ? '성목' : '행복나무';

    return (
      <>
        하루일기 <span className={styles.highlight}>{remainingDiaries}편</span>{' '}
        더 작성하면
        <span className={styles.highlight}>
          {' '}
          Lv. {level + 1} {nextTreeName}
        </span>
        으로 성장해요!
      </>
    );
  };

  // 경험치 변화 감지 및 레벨업 모달 표시
  useEffect(() => {
    if (prevExp === 0) {
      setPrevExp(exp);
      return;
    }

    const prevLevel = getTreeLevel(prevExp);
    const currentLevel = getTreeLevel(exp);

    if (currentLevel > prevLevel) {
      setShowLevelUpModal(true);
    }

    setPrevExp(exp);
  }, [exp, prevExp]);

  return (
    <div className={"main"} onClick={handlePageClick}>
      <div className={"container"}>
        <header className={styles.header}>
          <div className={styles.dateContainer}>
            <div className={styles.date}>2024년 11월 30일 (토요일)</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              className={styles.calendarIcon}
              onClick={() => setShowCalendar(true)}
            >
              <path
                d='M18.7 2.2H16.5V1.1C16.5 0.808262 16.3841 0.528472 16.1778 0.322183C15.9715 0.115892 15.6917 0 15.4 0C15.1083 0 14.8285 0.115892 14.6222 0.322183C14.4159 0.528472 14.3 0.808262 14.3 1.1V2.2H7.7V1.1C7.7 0.808262 7.58411 0.528472 7.37782 0.322183C7.17153 0.115892 6.89174 0 6.6 0C6.30826 0 6.02847 0.115892 5.82218 0.322183C5.61589 0.528472 5.5 0.808262 5.5 1.1V2.2H3.3C2.42479 2.2 1.58542 2.54768 0.966548 3.16655C0.347678 3.78542 0 4.62479 0 5.5V18.7C0 19.5752 0.347678 20.4146 0.966548 21.0335C1.58542 21.6523 2.42479 22 3.3 22H18.7C19.5752 22 20.4146 21.6523 21.0335 21.0335C21.6523 20.4146 22 19.5752 22 18.7V5.5C22 4.62479 21.6523 3.78542 21.0335 3.16655C20.4146 2.54768 19.5752 2.2 18.7 2.2ZM19.8 18.7C19.8 18.9917 19.6841 19.2715 19.4778 19.4778C19.2715 19.6841 18.9917 19.8 18.7 19.8H3.3C3.00826 19.8 2.72847 19.6841 2.52218 19.4778C2.31589 19.2715 2.2 18.9917 2.2 18.7V11H19.8V18.7ZM19.8 8.8H2.2V5.5C2.2 5.20826 2.31589 4.92847 2.52218 4.72218C2.72847 4.51589 3.00826 4.4 3.3 4.4H5.5V5.5C5.5 5.79174 5.61589 6.07153 5.82218 6.27782C6.02847 6.48411 6.30826 6.6 6.6 6.6C6.89174 6.6 7.17153 6.48411 7.37782 6.27782C7.58411 6.07153 7.7 5.79174 7.7 5.5V4.4H14.3V5.5C14.3 5.79174 14.4159 6.07153 14.6222 6.27782C14.8285 6.48411 15.1083 6.6 15.4 6.6C15.6917 6.6 15.9715 6.48411 16.1778 6.27782C16.3841 6.07153 16.5 5.79174 16.5 5.5V4.4H18.7C18.9917 4.4 19.2715 4.51589 19.4778 4.72218C19.6841 4.92847 19.8 5.20826 19.8 5.5V8.8Z'
                fill='#578127'
              />
            </svg>
            {showTooltip && (
              <div className={styles.tooltip}>
                한 달간 모인 감정일기를
                <br />한 눈에 볼 수 있어요!
              </div>
            )}
          </div>
          <div className={styles.songInfo}>
            <div className={styles.musicIconContainer}>
              <svg
                className={styles.largeCircle}
                xmlns='http://www.w3.org/2000/svg'
                width='23'
                height='23'
                viewBox='0 0 23 23'
                fill='none'
              >
                <circle
                  cx='11.5'
                  cy='11.5'
                  r='11.5'
                  fill='#578127'
                  fillOpacity='0.5'
                />
              </svg>
              <svg
                className={styles.mediumCircle}
                xmlns='http://www.w3.org/2000/svg'
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
              >
                <circle cx='8.5' cy='8.5' r='8.5' fill='#578127' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='8'
                height='9'
                viewBox='0 0 8 9'
                fill='none'
                className={styles.musicNote}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.99993 2.25849V0.458482C8.00103 0.391679 7.98889 0.325438 7.9644 0.26457C7.93991 0.203701 7.90368 0.149732 7.85833 0.106581C7.81305 0.0634423 7.7598 0.0321783 7.70245 0.0150553C7.6451 -0.00206774 7.58507 -0.00462082 7.52674 0.00758103L2.74078 0.904433C2.64477 0.920579 2.55725 0.975455 2.49455 1.05883C2.43185 1.14221 2.39823 1.24839 2.39998 1.35758V5.64115C2.09496 5.44302 1.74034 5.36367 1.39114 5.41539C1.04194 5.46711 0.717671 5.64702 0.46862 5.92721C0.219569 6.2074 0.0596581 6.57221 0.0136884 6.96506C-0.0322814 7.35792 0.0382592 7.75686 0.21437 8.10002C0.39048 8.44317 0.662319 8.71136 0.987723 8.86299C1.31313 9.01462 1.67391 9.04122 2.01412 8.93866C2.35433 8.83609 2.65496 8.6101 2.86936 8.29574C3.08377 7.98137 3.19998 7.59619 3.19997 7.19995V3.53064L7.19994 2.78094V4.74069C6.89493 4.54258 6.54033 4.46322 6.19115 4.51493C5.84197 4.56664 5.5177 4.74652 5.26865 5.02668C5.01959 5.30683 4.85967 5.67161 4.81367 6.06444C4.76767 6.45728 4.83816 6.85621 5.01423 7.19937C5.19029 7.54253 5.46208 7.81075 5.78745 7.96243C6.11282 8.11411 6.47358 8.14078 6.81379 8.03829C7.154 7.93581 7.45465 7.7099 7.66911 7.3956C7.88357 7.0813 7.99985 6.69617 7.99993 6.29995V2.25849Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className={styles.musicTextContainer}>
              <span className={styles.musicName}>수고했어, 오늘도</span>
              <span className={styles.musicSinger}>옥상달빛</span>
            </div>
          </div>
        </header>
        <main className={styles.content}>
          <div
            className={styles.questionBox}
            onClick={() => setShowDiaryWrite(true)}
          >
            {hasDiary ? (
              <>
                <span className={styles.question}>
                  오늘의 일기를 작성하셨네요!
                </span>
                <span className={styles.instruction}>
                  작성한 일기를 다시 보러 가볼까요?
                </span>
              </>
            ) : (
              <>
                <span className={styles.question}>
                  {name}님은 오늘 어떤 하루를 보내셨나요?
                </span>
                <span className={styles.instruction}>
                  말풍선을 눌러 알려주세요!
                </span>
              </>
            )}
          </div>
          {showDiaryWrite && (
            <DiaryWrite onClose={() => setShowDiaryWrite(false)} />
          )}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='37'
            height='33'
            viewBox='0 0 37 33'
            fill='#FFF'
            className={styles.questionBoxPlus}
          >
            <path
              d='M22.0477 30.2271C20.4968 32.8321 16.7247 32.8321 15.1738 30.2271L1.04905 6.50279C-0.538386 3.83649 1.38294 0.456524 4.48602 0.456523L32.7355 0.456521C35.8386 0.456521 37.7599 3.83648 36.1725 6.50279L22.0477 30.2271Z'
              fill='white'
            />
          </svg>

          <div className={styles.groundImg}>
            <svg
              width='375'
              height='317'
              viewBox='0 0 375 317'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_314_704)'>
                <rect
                  width='375'
                  height='812'
                  transform='translate(0 -416)'
                  fill='#F6F6F6'
                />
                <path
                  d='M237.612 52.3848C356.077 -8.97112 395.132 -9.95018 456.176 52.3849L520 583H-76V122.956C-8.99976 74.0367 116.608 115.055 237.612 52.3848Z'
                  fill='url(#paint0_linear_314_704)'
                />
                <g filter='url(#filter0_d_314_704)'>
                  <path
                    d='M49.772 50.7453C-74.1817 4.31027 -226.051 16.7362 -300 83.7025V622H422V127.777C340.835 75.2229 201.729 107.671 49.772 50.7453Z'
                    fill='url(#paint1_linear_314_704)'
                  />
                </g>
                <ellipse
                  cx='35'
                  cy='106'
                  rx='14'
                  ry='4'
                  fill='#F1FEB4'
                  fillOpacity='0.8'
                />
                <ellipse
                  cx='65.5'
                  cy='124'
                  rx='6.5'
                  ry='2'
                  fill='#F1FEB4'
                  fillOpacity='0.8'
                />
                <ellipse
                  cx='45'
                  cy='137'
                  rx='14'
                  ry='4'
                  fill='#F1FEB4'
                  fillOpacity='0.8'
                />
              </g>
              <defs>
                <filter
                  id='filter0_d_314_704'
                  x='-303.6'
                  y='-0.6'
                  width='773.2'
                  height='650.2'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dx='22' dy='2' />
                  <feGaussianBlur stdDeviation='12.8' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0.885903 0 0 0 0 1 0 0 0 0 0.779167 0 0 0 0.07 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_314_704'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_314_704'
                    result='shape'
                  />
                </filter>
                <linearGradient
                  id='paint0_linear_314_704'
                  x1='207.766'
                  y1='-20.5911'
                  x2='222.352'
                  y2='582.992'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#CCEA7A' />
                  <stop offset='1' stopColor='#578127' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_314_704'
                  x1='78.2434'
                  y1='-26.4355'
                  x2='64.3454'
                  y2='622.072'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#EDF6A2' />
                  <stop offset='1' stopColor='#578127' />
                </linearGradient>
                <clipPath id='clip0_314_704'>
                  <rect
                    width='375'
                    height='812'
                    fill='white'
                    transform='translate(0 -416)'
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            className={`${
              getTreeLevel(exp) >= 3 ? styles.plantImgLevel3 : styles.plantImg
            }`}
          >
            {getTreeLevel(exp) === 1 && (
              <svg
                width='204'
                height='195'
                viewBox='0 0 204 195'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M101.058 112.719C95.5214 51.6069 62.8501 -6.49566 25.766 0.587653C16.5219 2.35334 9.30262 9.59653 5.1864 18.0598C-11.1144 51.5759 14.2078 71.0398 36.9109 76.0873C52.8095 79.622 84.3446 86.8414 91.1481 113.536C91.9694 116.759 95.52 118.767 98.4942 117.28C100.203 116.425 101.23 114.622 101.058 112.719Z'
                  fill='url(#paint0_linear_327_454)'
                />
                <path
                  d='M91.583 106.426C105.627 22.6631 161.258 -2.25466 192.857 14.7986C211.165 27.5888 208.953 82.3525 170.833 89.6254C161.987 91.313 147.16 90.2233 133.409 90.4357C112.856 90.7531 104.17 109.626 106.043 130.096L107.695 148.15C107.791 149.195 108.02 150.223 108.376 151.21L109.823 155.221C113.411 165.162 102.202 173.9 93.4365 167.995C90.2382 165.841 88.412 162.16 88.631 158.31L91.583 106.426Z'
                  fill='url(#paint1_linear_327_454)'
                />
                <path
                  d='M154.081 165.702C147.088 155.705 90.4014 122.513 50.1155 163.031C45.4785 167.695 41.1854 174.471 49.5333 185.678C57.8813 196.885 144.399 192.116 150.001 188.259C155.602 184.401 161.075 175.699 154.081 165.702Z'
                  fill='url(#paint2_linear_327_454)'
                />
                <path
                  d='M154.081 165.702C147.088 155.705 90.4014 122.513 50.1155 163.031C45.4785 167.695 41.1854 174.471 49.5333 185.678C57.8813 196.885 144.399 192.116 150.001 188.259C155.602 184.401 161.075 175.699 154.081 165.702Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M154.081 165.702C147.088 155.705 90.4014 122.513 50.1155 163.031C45.4785 167.695 41.1854 174.471 49.5333 185.678C57.8813 196.885 144.399 192.116 150.001 188.259C155.602 184.401 161.075 175.699 154.081 165.702Z'
                  fill='url(#paint3_linear_327_454)'
                  fillOpacity='0.2'
                />
                <ellipse
                  cx='75.5004'
                  cy='157.5'
                  rx='4.5'
                  ry='2.5'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='37.766'
                  cy='16'
                  rx='11.3311'
                  ry='5.94345'
                  transform='rotate(23.7235 37.766 16)'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='65.5004'
                  cy='162.5'
                  rx='3.5'
                  ry='2.5'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_327_454'
                    x1='50.6594'
                    y1='1.6475e-06'
                    x2='83.5004'
                    y2='86.5'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_327_454'
                    x1='146.139'
                    y1='9.73535'
                    x2='146.139'
                    y2='186.682'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_327_454'
                    x1='89.2155'
                    y1='140.182'
                    x2='90.4179'
                    y2='190.729'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E1924D' />
                    <stop offset='1' stopColor='#B96C49' />
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_327_454'
                    x1='64.0004'
                    y1='258.5'
                    x2='85.0004'
                    y2='126'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopOpacity='0' />
                    <stop offset='1' stopColor='#FFE44B' />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {getTreeLevel(exp) === 2 && (
              <svg
                width='199'
                height='247'
                viewBox='0 0 199 247'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100.611 175.978C95.5541 135.83 71.3245 97.4089 46.1388 112.992C43.7447 114.473 41.7911 116.63 40.4581 119.11C30.0265 138.516 46.7154 150.303 59.3104 155.949C69.5342 160.533 89.7205 165.164 97.5534 177.144C98.6084 178.594 100.835 177.757 100.611 175.978Z'
                  fill='url(#paint0_linear_314_832)'
                />
                <path
                  d='M107.197 148.075C115.439 74.1384 110.08 -18.2013 39.9554 16.2478C36.9052 17.7461 33.9354 19.6361 31.4324 21.9347C8.00956 43.445 15.6645 73.2281 35.3507 87.2954C50.8259 98.3535 100.524 113.168 99.0749 147.095C99.0099 148.615 99.6749 150.11 100.94 150.956C103.457 152.64 106.862 151.085 107.197 148.075Z'
                  fill='url(#paint1_linear_314_832)'
                />
                <path
                  d='M98.9357 143.507C111.028 71.3863 149.517 55.1554 178.271 66.1529C182.311 67.6982 186.026 70.0987 188.838 73.3852C204.62 91.8259 201.684 126.296 169.432 132.449C161.339 133.993 147.624 133.841 134.845 134.831C115.414 136.338 107.549 154.435 109.75 173.8L112.099 194.474V204.402C112.099 212.049 103.063 216.105 97.349 211.023C95.2842 209.187 94.1942 206.492 94.4017 203.737L98.9357 143.507Z'
                  fill='url(#paint2_linear_314_832)'
                />
                <path
                  d='M80.505 151.344C81.8876 153.189 96.6316 171.617 96.6316 171.617L97.0923 163.323C97.0923 163.323 84.1908 149.964 82.8088 148.579C81.4267 147.194 79.1223 149.498 80.505 151.344Z'
                  fill='url(#paint3_linear_314_832)'
                />
                <path
                  d='M95.9977 76.4703C96.2955 80.6727 97.1204 110.821 97.1204 110.821L91.6402 105.175C91.6402 105.175 92.0261 80.0295 92.2843 76.4324C92.5424 72.8353 95.6999 72.2679 95.9977 76.4703Z'
                  fill='url(#paint4_linear_314_832)'
                />
                <ellipse
                  cx='67.5724'
                  cy='22.2669'
                  rx='9.84404'
                  ry='5.94471'
                  transform='rotate(2.62305 67.5724 22.2669)'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='50.5249'
                  cy='27.3146'
                  rx='4.02649'
                  ry='2.0397'
                  transform='rotate(2.62305 50.5249 27.3146)'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <path
                  d='M115.028 210.806H92.4509C92.4509 210.806 97.0585 176.71 98.4408 140.31C98.6006 136.101 97.8217 129.709 96.1712 122.314C93.8906 112.096 74.0541 77.6215 72.6719 74.3954C71.2898 71.1692 75.4368 69.3259 77.2795 72.0916C79.1223 74.8572 104.431 119.115 104.431 119.115C108.611 124.617 113.68 125.999 120.13 122.314C120.13 122.314 141.786 109.412 147.776 105.265C153.766 101.118 156.07 106.647 153.305 108.951C150.541 111.255 133.492 122.314 123.356 133.832C115.909 142.294 113.656 148.083 111.803 159.201C108.483 179.119 115.028 210.806 115.028 210.806Z'
                  fill='url(#paint5_linear_314_832)'
                />
                <path
                  d='M155.322 220.194C148.877 210.981 96.6396 180.395 59.5153 217.733C55.2423 222.03 51.2861 228.275 58.9789 238.602C66.6717 248.929 146.4 244.535 151.561 240.98C156.723 237.425 161.766 229.406 155.322 220.194Z'
                  fill='url(#paint6_linear_314_832)'
                />
                <path
                  d='M155.322 220.194C148.877 210.981 96.6396 180.395 59.5153 217.733C55.2423 222.03 51.2861 228.275 58.9789 238.602C66.6717 248.929 146.4 244.535 151.561 240.98C156.723 237.425 161.766 229.406 155.322 220.194Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M155.322 220.194C148.877 210.981 96.6396 180.395 59.5153 217.733C55.2423 222.03 51.2861 228.275 58.9789 238.602C66.6717 248.929 146.4 244.535 151.561 240.98C156.723 237.425 161.766 229.406 155.322 220.194Z'
                  fill='url(#paint7_linear_314_832)'
                  fillOpacity='0.2'
                />
                <ellipse
                  cx='82.9081'
                  cy='212.636'
                  rx='4.14684'
                  ry='2.3038'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='73.6926'
                  cy='217.243'
                  rx='3.22532'
                  ry='2.3038'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_314_832'
                    x1='70.779'
                    y1='108.104'
                    x2='70.779'
                    y2='184.59'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_314_832'
                    x1='79.1249'
                    y1='10.01'
                    x2='106.768'
                    y2='127.381'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.737596' stopColor='#90AC31' />
                    <stop offset='1' stopColor='#799B1A' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_314_832'
                    x1='147.393'
                    y1='65.4706'
                    x2='147.393'
                    y2='228.53'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_314_832'
                    x1='85.8207'
                    y1='156.45'
                    x2='91.8953'
                    y2='190.576'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_314_832'
                    x1='95.504'
                    y1='86.1704'
                    x2='119.791'
                    y2='122.934'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_314_832'
                    x1='100.094'
                    y1='120.26'
                    x2='144.257'
                    y2='320.721'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_314_832'
                    x1='95.5468'
                    y1='196.676'
                    x2='96.6548'
                    y2='243.257'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E1924D' />
                    <stop offset='1' stopColor='#B96C49' />
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_314_832'
                    x1='72.3105'
                    y1='305.709'
                    x2='91.6624'
                    y2='183.608'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopOpacity='0' />
                    <stop offset='1' stopColor='#FFE44B' />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {getTreeLevel(exp) === 3 && (
              <svg
                width='214'
                height='279'
                viewBox='0 0 214 279'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M115.997 110.688C127.249 48.8087 107.993 -15.4073 61.0964 12.6391C44.07 26.1073 44.0656 55.1966 60.2209 64.7077C72.5619 71.9732 109.148 84.1029 108.571 109.501C108.537 110.988 109.235 112.427 110.522 113.174C112.729 114.454 115.541 113.198 115.997 110.688Z'
                  fill='url(#paint0_linear_314_831)'
                />
                <path
                  d='M106.46 115.763C95.2083 53.8839 114.464 -10.3321 161.36 17.7143C181.052 32.682 178.391 60.2718 162.236 69.7829C149.895 77.0484 113.309 89.1781 113.886 114.576C113.92 116.063 113.222 117.503 111.935 118.249C109.728 119.529 106.916 118.274 106.46 115.763Z'
                  fill='url(#paint1_linear_314_831)'
                />
                <path
                  d='M125.506 109.455C130.543 61.4871 158.537 18.3653 187.019 49.1024C198.291 64.3576 190.395 84.0924 176.457 87.6159C165.81 90.3075 136.27 91.3613 131.228 110.18C130.933 111.282 130.109 112.191 129.002 112.463C127.102 112.93 125.302 111.401 125.506 109.455Z'
                  fill='url(#paint2_linear_314_831)'
                />
                <path
                  d='M110.862 113.589C101.338 57.9192 46.2772 21.8448 27.6638 64.1089C25.7369 68.4842 24.8844 73.4277 25.9557 78.087C30.9986 100.019 59.7346 100.465 75.8469 100.992C85.684 101.313 90.6588 106.156 96.4287 117.724C99.4892 123.861 108.505 123.507 110.607 116.98C110.959 115.888 111.055 114.72 110.862 113.589Z'
                  fill='url(#paint3_linear_314_831)'
                />
                <path
                  d='M96.1425 131.937C73.5076 91.7398 38.6058 65.5764 13.6457 97.8777C8.69098 104.29 6.39548 112.708 8.51852 120.528C13.6974 139.605 31.6453 144.75 51.1478 139.664C62.1999 136.782 76.8857 126.307 87.6291 136.252C90.3097 138.734 95.8015 138.067 96.5379 134.489C96.7168 133.62 96.578 132.71 96.1425 131.937Z'
                  fill='url(#paint4_linear_314_831)'
                />
                <path
                  d='M135.077 109.598C82.6913 75.7996 18.3274 130.625 50.8376 175.123C69.7082 194.692 104.871 189.386 110.347 156.17C112.223 144.794 113.793 126.924 129.148 124.465C134.467 123.613 139.295 118.987 138.001 113.758C137.582 112.061 136.545 110.545 135.077 109.598Z'
                  fill='url(#paint5_linear_314_831)'
                />
                <path
                  d='M131.653 118.902C104.833 81.0523 70.9107 24.2687 104.124 12.4392C111.757 9.72032 120.674 11.4961 126.428 17.2022C139.95 30.6124 133.392 50.6461 127.491 64.2852C122.083 76.7862 119.678 95.4813 136.336 115.116C137.101 116.018 137.311 117.281 136.834 118.363C135.895 120.495 132.999 120.803 131.653 118.902Z'
                  fill='url(#paint6_linear_314_831)'
                />
                <path
                  d='M122.64 149.774C122.42 103.908 141.334 16.4628 90.6584 29.966C82.4816 32.1448 75.3959 37.8978 72.2006 45.7334C61.6343 71.6442 85.6781 86.5757 98.3752 95.6258C115.271 107.668 113.397 99.9781 119.214 118.841C120.349 122.523 121.058 126.347 121.317 130.191L122.64 149.774Z'
                  fill='url(#paint7_linear_314_831)'
                />
                <path
                  d='M122.322 102.389C129.66 44.0307 220.519 58.3582 197.469 127.534C191.058 146.771 162.888 154.039 153.787 142.91C147.519 135.245 133.103 130.317 124.558 116.364C122.019 112.22 121.631 107.2 122.322 102.389Z'
                  fill='url(#paint8_linear_314_831)'
                />
                <path
                  d='M116.108 111.124C149.305 87.3093 181.042 125.213 167.399 159.001C158.68 180.595 123.749 183.394 114.649 172.264C108.952 165.298 109.975 169.19 106.874 161.452C104.57 155.701 103.448 149.531 103.448 143.336L103.448 140.977C103.448 129.577 106.845 117.769 116.108 111.124Z'
                  fill='url(#paint9_linear_314_831)'
                />
                <path
                  d='M109.739 50.3237C110.088 54.168 113.029 86.4435 113.029 86.4435L105.33 74.2126C105.33 74.2126 106.245 52.7692 106.246 50.3238C106.246 47.8784 109.39 46.4795 109.739 50.3237Z'
                  fill='url(#paint10_linear_314_831)'
                />
                <path
                  d='M91.2755 59.0576C93.4901 61.7462 116.436 113.223 116.436 113.223L125.169 102.739C125.169 102.739 95.9345 58.2811 93.7181 56.2613C91.5017 54.2415 89.0609 56.3691 91.2755 59.0576Z'
                  fill='url(#paint11_linear_314_831)'
                />
                <path
                  d='M148.42 81.3695C146.205 84.0581 108.932 140.078 108.932 140.078L106.141 123.655C106.141 123.655 143.758 79.5467 145.975 77.5269C148.191 75.5071 150.634 78.681 148.42 81.3695Z'
                  fill='url(#paint12_linear_314_831)'
                />
                <path
                  d='M144.973 146.101C142.704 147.124 122.926 158.478 122.926 158.478L127.128 147.935C127.128 147.935 142.96 143.722 144.442 143.201C145.924 142.68 147.242 145.078 144.973 146.101Z'
                  fill='url(#paint13_linear_314_831)'
                />
                <path
                  d='M53.6719 104.88C55.8741 107.579 70.806 127.603 70.806 127.603L64.0518 126.925C64.0518 126.925 52.3071 109.681 50.7611 107.111C49.2151 104.542 51.4698 102.181 53.6719 104.88Z'
                  fill='url(#paint14_linear_314_831)'
                />
                <ellipse
                  cx='176.238'
                  cy='82.3099'
                  rx='9.84391'
                  ry='5.50827'
                  transform='rotate(29.3181 176.238 82.3099)'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <path
                  d='M95.6034 167.12C99.5441 184.307 89.4772 242.416 89.4772 242.416L88.2519 255.102H126.235C126.235 255.102 109.026 192.775 116.024 175.714C123.023 158.653 124.421 155.507 124.421 155.507L125.469 153.411C125.819 152.712 126.168 152.362 126.867 150.965L127.915 148.868C127.915 148.868 138.894 132.746 140.529 130.7C142.165 128.654 138.897 127.017 137.672 128.654C136.447 130.291 111.491 156.206 111.491 156.206L110.093 140.831L107.997 124.057C107.997 124.057 106.222 104.919 105.405 102.464C104.589 100.008 100.913 100.008 100.913 104.101C100.913 108.193 99.6876 147.478 99.6876 147.478C99.6876 147.478 88.8549 136.279 81.3088 131.109C77.9444 128.804 71.0898 125.371 68.1588 124.406C65.2277 123.441 63.2664 122.659 60.1213 121.697C60.1213 121.697 44.9596 118.423 42.1008 117.605C39.242 116.786 38.0184 120.879 40.4671 121.697C42.9158 122.515 64.0954 127.76 74.7742 136.02C86.8445 145.356 91.6628 149.933 95.6034 167.12Z'
                  fill='url(#paint15_linear_314_831)'
                />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='url(#paint16_linear_314_831)'
                />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='url(#paint17_linear_314_831)'
                  fillOpacity='0.2'
                />
                <ellipse
                  cx='85.6912'
                  cy='247.171'
                  rx='3.5'
                  ry='2'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='77.1912'
                  cy='251.171'
                  rx='3'
                  ry='2'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_314_831'
                    x1='82.137'
                    y1='2.79555'
                    x2='112.54'
                    y2='107.632'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.52875' stopColor='#84A220' />
                    <stop offset='1' stopColor='#5E7C0B' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_314_831'
                    x1='129.033'
                    y1='11.1673'
                    x2='127.566'
                    y2='84.5678'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.520797' stopColor='#93AE32' />
                    <stop offset='1' stopColor='#657C07' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_314_831'
                    x1='164.634'
                    y1='37.3257'
                    x2='157.961'
                    y2='114.504'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.735961' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_314_831'
                    x1='49.155'
                    y1='50.8269'
                    x2='105.9'
                    y2='105.535'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.648502' stopColor='#84A32D' />
                    <stop offset='0.869411' stopColor='#779428' />
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_314_831'
                    x1='30.9961'
                    y1='86.4618'
                    x2='62.5059'
                    y2='181.796'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_314_831'
                    x1='74.4492'
                    y1='109.03'
                    x2='125.819'
                    y2='179.969'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_314_831'
                    x1='87.9777'
                    y1='23.3518'
                    x2='160.743'
                    y2='92.5383'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_314_831'
                    x1='110.489'
                    y1='50.0435'
                    x2='127.913'
                    y2='109.516'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_314_831'
                    x1='198.213'
                    y1='100.971'
                    x2='125.486'
                    y2='127.65'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint9_linear_314_831'
                    x1='165.084'
                    y1='130.741'
                    x2='92.3566'
                    y2='157.42'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint10_linear_314_831'
                    x1='109.78'
                    y1='61.5086'
                    x2='113.483'
                    y2='114.349'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint11_linear_314_831'
                    x1='102.123'
                    y1='75.8883'
                    x2='119.414'
                    y2='158.736'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint12_linear_314_831'
                    x1='134.749'
                    y1='99.2237'
                    x2='117.963'
                    y2='190.664'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint13_linear_314_831'
                    x1='137.261'
                    y1='148.313'
                    x2='101.796'
                    y2='163.321'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint14_linear_314_831'
                    x1='57.7603'
                    y1='111.879'
                    x2='91.9043'
                    y2='124.206'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint15_linear_314_831'
                    x1='73.5197'
                    y1='155.343'
                    x2='117.153'
                    y2='378.383'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint16_linear_314_831'
                    x1='97.3211'
                    y1='232.391'
                    x2='98.3478'
                    y2='275.553'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E1924D' />
                    <stop offset='1' stopColor='#B96C49' />
                  </linearGradient>
                  <linearGradient
                    id='paint17_linear_314_831'
                    x1='75.79'
                    y1='333.422'
                    x2='93.7218'
                    y2='220.281'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopOpacity='0' />
                    <stop offset='1' stopColor='#FFE44B' />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {getTreeLevel(exp) === 4 && (
              <svg
                width='213'
                height='279'
                viewBox='0 0 213 279'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M115.377 110.096C126.568 48.5476 107.416 -15.325 60.7697 12.5714C43.8345 25.9676 43.8301 54.9013 59.899 64.3615C72.174 71.5882 108.564 83.653 107.991 108.915C107.957 110.395 108.651 111.826 109.931 112.568C112.126 113.842 114.923 112.593 115.377 110.096Z'
                  fill='url(#paint0_linear_386_492)'
                />
                <path
                  d='M105.89 115.144C94.6992 53.5954 113.852 -10.2771 160.498 17.6192C180.084 32.5069 177.437 59.9492 161.368 69.4094C149.093 76.636 112.703 88.7009 113.277 113.963C113.31 115.442 112.616 116.874 111.337 117.616C109.142 118.89 106.344 117.641 105.89 115.144Z'
                  fill='url(#paint1_linear_386_492)'
                />
                <path
                  d='M124.835 108.869C129.845 61.1579 157.69 18.2667 186.019 48.8394C197.231 64.013 189.377 83.6423 175.513 87.147C164.923 89.8242 135.541 90.8723 130.526 109.59C130.233 110.686 129.414 111.59 128.312 111.861C126.422 112.326 124.632 110.805 124.835 108.869Z'
                  fill='url(#paint2_linear_386_492)'
                />
                <path
                  d='M110.269 112.981C100.796 57.6091 46.0296 21.7277 27.5157 63.7657C25.5991 68.1176 24.7512 73.0347 25.8168 77.669C30.8327 99.4838 59.4149 99.9277 75.4412 100.452C85.2257 100.771 90.1738 105.588 95.9128 117.094C98.957 123.198 107.925 122.846 110.016 116.354C110.365 115.268 110.461 114.106 110.269 112.981Z'
                  fill='url(#paint3_linear_386_492)'
                />
                <path
                  d='M95.628 131.231C73.1141 91.2487 38.399 65.2251 13.5724 97.3537C8.64412 103.731 6.36089 112.105 8.47257 119.883C13.6238 138.858 31.4756 143.975 50.8739 138.917C61.8669 136.05 76.4741 125.631 87.16 135.523C89.8264 137.991 95.2888 137.328 96.0212 133.77C96.1992 132.905 96.0611 132 95.628 131.231Z'
                  fill='url(#paint4_linear_386_492)'
                />
                <path
                  d='M134.354 109.012C82.2492 75.3942 18.2294 129.926 50.5658 174.186C69.3355 193.651 104.31 188.373 109.757 155.335C111.623 144.02 113.184 126.245 128.457 123.799C133.748 122.952 138.55 118.351 137.263 113.149C136.846 111.462 135.815 109.954 134.354 109.012Z'
                  fill='url(#paint5_linear_386_492)'
                />
                <path
                  d='M130.948 118.266C104.272 80.6189 70.5315 24.139 103.567 12.3727C111.16 9.6684 120.029 11.4347 125.751 17.1102C139.201 30.4488 132.679 50.3753 126.81 63.9415C121.43 76.3756 119.038 94.9707 135.607 114.501C136.368 115.398 136.576 116.654 136.102 117.73C135.168 119.851 132.288 120.157 130.948 118.266Z'
                  fill='url(#paint6_linear_386_492)'
                />
                <path
                  d='M121.984 148.973C121.766 103.352 140.578 16.3739 90.1735 29.805C82.0405 31.9721 74.9926 37.6943 71.8144 45.488C61.3046 71.2603 85.2198 86.1119 97.849 95.1136C114.654 107.092 112.79 99.4426 118.576 118.205C119.706 121.867 120.41 125.671 120.668 129.494L121.984 148.973Z'
                  fill='url(#paint7_linear_386_492)'
                />
                <path
                  d='M121.667 101.842C128.966 43.7954 219.34 58.0462 196.412 126.852C190.037 145.986 162.016 153.216 152.964 142.146C146.73 134.522 132.391 129.62 123.891 115.742C121.366 111.62 120.981 106.627 121.667 101.842Z'
                  fill='url(#paint8_linear_386_492)'
                />
                <path
                  d='M53.3849 104.319C55.5753 107.003 70.4274 126.92 70.4274 126.92L63.7093 126.245C63.7093 126.245 52.0275 109.093 50.4897 106.538C48.9519 103.982 51.1946 101.634 53.3849 104.319Z'
                  fill='url(#paint9_linear_386_492)'
                />
                <ellipse
                  cx='175.296'
                  cy='81.8688'
                  rx='9.79127'
                  ry='5.47882'
                  transform='rotate(29.3181 175.296 81.8688)'
                  fill='#FFF7B6'
                  fillOpacity='0.5'
                />
                <ellipse
                  cx='187.11'
                  cy='94.8089'
                  rx='4.12242'
                  ry='2.79613'
                  transform='rotate(28.8141 187.11 94.8089)'
                  fill='#FFF7B6'
                  fillOpacity='0.5'
                />
                <circle cx='39.277' cy='99.1644' r='3.23083' fill='#FFF7B6' />
                <circle cx='35.2089' cy='102.64' r='3.23083' fill='#FFF7B6' />
                <circle cx='36.4054' cy='107.507' r='3.23083' fill='#FFF7B6' />
                <circle cx='42.1486' cy='107.507' r='3.23083' fill='#FFF7B6' />
                <circle cx='43.3461' cy='102.64' r='3.23083' fill='#FFF7B6' />
                <circle cx='39.2776' cy='103.928' r='2.4331' fill='#FFCC00' />
                <circle cx='95.5858' cy='31.0375' r='3.23083' fill='#FFF7B6' />
                <circle cx='91.5177' cy='34.5135' r='3.23083' fill='#FFF7B6' />
                <circle cx='92.714' cy='39.3798' r='3.23083' fill='#FFF7B6' />
                <circle cx='98.4574' cy='39.3798' r='3.23083' fill='#FFF7B6' />
                <circle cx='99.6549' cy='34.5135' r='3.23083' fill='#FFF7B6' />
                <circle cx='95.5864' cy='35.8013' r='2.4331' fill='#FFCC00' />
                <circle cx='55.9611' cy='47.7216' r='3.23083' fill='#FFF7B6' />
                <circle cx='51.8929' cy='51.1971' r='3.23083' fill='#FFF7B6' />
                <circle cx='53.0892' cy='56.0634' r='3.23083' fill='#FFF7B6' />
                <circle cx='58.8326' cy='56.0634' r='3.23083' fill='#FFF7B6' />
                <circle cx='60.0302' cy='51.1971' r='3.23083' fill='#FFF7B6' />
                <circle cx='55.9617' cy='52.4849' r='2.4331' fill='#FFCC00' />
                <circle cx='76.1207' cy='77.6141' r='3.23083' fill='#FFF7B6' />
                <circle cx='72.0531' cy='81.0902' r='3.23083' fill='#FFF7B6' />
                <circle cx='73.2491' cy='85.9559' r='3.23083' fill='#FFF7B6' />
                <circle cx='78.9926' cy='85.9559' r='3.23083' fill='#FFF7B6' />
                <circle cx='80.1903' cy='81.0902' r='3.23083' fill='#FFF7B6' />
                <circle cx='76.1216' cy='82.3774' r='2.4331' fill='#FFCC00' />
                <circle cx='146.333' cy='28.952' r='3.23083' fill='#FFF7B6' />
                <circle cx='142.265' cy='32.4281' r='3.23083' fill='#FFF7B6' />
                <circle cx='143.461' cy='37.2943' r='3.23083' fill='#FFF7B6' />
                <circle cx='149.205' cy='37.2943' r='3.23083' fill='#FFF7B6' />
                <circle cx='150.402' cy='32.4281' r='3.23083' fill='#FFF7B6' />
                <circle cx='146.334' cy='33.7158' r='2.4331' fill='#FFCC00' />
                <circle cx='78.9015' cy='156.168' r='3.23083' fill='#FFF7B6' />
                <circle cx='74.8339' cy='159.644' r='3.23083' fill='#FFF7B6' />
                <circle cx='76.0302' cy='164.511' r='3.23083' fill='#FFF7B6' />
                <circle cx='81.7731' cy='164.511' r='3.23083' fill='#FFF7B6' />
                <circle cx='82.9708' cy='159.644' r='3.23083' fill='#FFF7B6' />
                <circle cx='78.9021' cy='160.932' r='2.4331' fill='#FFCC00' />
                <ellipse
                  cx='165.458'
                  cy='96.5856'
                  rx='8.35814'
                  ry='10.3171'
                  transform='rotate(31.5424 165.458 96.5856)'
                  fill='url(#paint10_linear_386_492)'
                />
                <g filter='url(#filter0_d_386_492)'>
                  <ellipse
                    cx='150.565'
                    cy='91.441'
                    rx='8.35814'
                    ry='10.3171'
                    transform='rotate(-15.6816 150.565 91.441)'
                    fill='url(#paint11_linear_386_492)'
                  />
                </g>
                <path
                  d='M109.152 50.0544C109.499 53.8781 112.424 85.9809 112.424 85.9809L104.766 73.8155C104.766 73.8155 105.677 52.4867 105.677 50.0544C105.677 47.6221 108.805 46.2307 109.152 50.0544Z'
                  fill='url(#paint12_linear_386_492)'
                />
                <path
                  d='M155.101 108.455C153.235 106.438 135.88 95.1191 133.445 92.5619C131.011 90.0046 135.439 87.9891 138.069 90.5354C140.699 93.0817 156.283 105.315 157.624 107.259C158.964 109.202 156.967 110.472 155.101 108.455Z'
                  fill='url(#paint13_linear_386_492)'
                />
                <path
                  d='M191.086 106.314C187.909 106.747 142.68 106.332 138.58 106.835C134.48 107.338 135.92 112.194 140.216 111.833C144.512 111.472 190.083 110.057 192.671 109.328C195.258 108.599 194.264 105.88 191.086 106.314Z'
                  fill='url(#paint14_linear_386_492)'
                />
                <path
                  d='M133.38 97.1926C136.547 98.7012 172.274 120.158 176.311 122.154C180.348 124.149 183.809 123.383 179.723 121.149C175.637 118.914 135.126 94.8536 132.223 93.95C129.321 93.0464 130.214 95.684 133.38 97.1926Z'
                  fill='url(#paint15_linear_386_492)'
                />
                <path
                  d='M151.413 108.924C155.827 109.603 175.675 116.157 179.112 116.637C182.548 117.117 184.805 119.749 181.863 119.757C179.724 119.762 157.3 111.734 143.472 107.012C137.076 105.274 130.056 103.108 133.064 103.694C134.308 103.936 138.285 105.241 143.472 107.012C146.775 107.91 149.911 108.693 151.413 108.924Z'
                  fill='url(#paint16_linear_386_492)'
                />
                <path
                  d='M149.036 106.819C153.247 108.304 171.538 118.419 174.827 119.527C178.115 120.635 179.846 123.64 176.953 123.103C174.227 122.596 153.355 109.186 147.35 106.209C144.196 105.036 142.72 104.312 146.425 105.786C146.673 105.884 146.984 106.027 147.35 106.209C147.872 106.402 148.439 106.609 149.036 106.819Z'
                  fill='url(#paint17_linear_386_492)'
                />
                <path
                  d='M143.956 100.627C147.862 102.791 164.217 115.806 167.276 117.445C170.334 119.085 171.541 122.335 168.778 121.325C166.174 120.372 147.822 103.679 142.395 99.7453C139.479 98.0641 138.144 97.1057 141.553 99.1745C141.781 99.313 142.064 99.5054 142.395 99.7453C142.877 100.023 143.402 100.32 143.956 100.627Z'
                  fill='url(#paint18_linear_386_492)'
                />
                <path
                  d='M129.062 103.717C132.26 103.963 176.968 114.658 181.082 115.03C185.196 115.402 184.943 111.235 180.667 110.682C176.391 110.129 131.545 101.911 128.862 102.078C126.179 102.246 125.864 103.472 129.062 103.717Z'
                  fill='url(#paint19_linear_386_492)'
                />
                <path
                  d='M148.246 109.093C151.427 108.685 187.913 106.248 192.017 105.778C196.121 105.308 192.669 102.689 188.37 103.016C184.072 103.342 160.375 102.877 157.782 103.585C155.189 104.294 145.065 109.501 148.246 109.093Z'
                  fill='url(#paint20_linear_386_492)'
                />
                <path
                  d='M195.988 109.875C193.291 110.577 181.112 110.396 172.029 110.428C169.024 110.882 166.756 111.296 166.029 111.613C163.355 112.782 158.789 111.723 162.011 110.834C163.139 110.523 167.134 110.445 172.029 110.428C180.083 109.211 193.431 107.709 196.581 107.028C200.906 106.093 200.137 108.795 195.988 109.875Z'
                  fill='url(#paint21_linear_386_492)'
                />
                <path
                  d='M157.977 109.622C155.541 108.351 135.39 103.53 132.237 101.94C129.084 100.351 132.291 98.9408 135.624 100.454C138.958 101.967 157.749 108.246 159.665 109.625C161.582 111.004 160.412 110.894 157.977 109.622Z'
                  fill='url(#paint22_linear_386_492)'
                />
                <path
                  d='M152.131 109.095C154.768 108.323 175.472 107.529 178.875 106.586C182.277 105.642 179.514 101.638 175.949 102.472C172.385 103.305 152.73 105.795 150.581 106.773C148.432 107.752 149.493 109.867 152.131 109.095Z'
                  fill='url(#paint23_linear_386_492)'
                />
                <path
                  d='M164.939 108.452C162.564 107.071 142.653 101.337 139.576 99.6054C136.499 97.8741 139.137 96.9721 142.398 98.6356C145.659 100.299 165.149 105.104 167 106.569C168.852 108.034 167.315 109.833 164.939 108.452Z'
                  fill='url(#paint24_linear_386_492)'
                />
                <path
                  d='M148.33 110.27C151.073 110.419 179.056 116.751 182.578 116.994C186.101 117.236 176.634 112.347 172.995 111.948C169.356 111.548 149.993 107.357 147.641 107.565C145.289 107.773 145.586 110.12 148.33 110.27Z'
                  fill='url(#paint25_linear_386_492)'
                />
                <path
                  d='M181.125 107.06C177.948 107.494 132.719 107.079 128.619 107.582C124.519 108.085 125.341 109.788 129.637 109.427C133.933 109.066 180.123 110.804 182.71 110.075C185.298 109.345 184.303 106.627 181.125 107.06Z'
                  fill='url(#paint26_linear_386_492)'
                />
                <path
                  d='M139.897 103.903C136.719 104.336 131.588 103.184 127.488 103.687C123.388 104.19 124.21 105.893 128.506 105.533C132.802 105.172 139.743 105.492 142.33 104.763C144.918 104.034 143.075 103.469 139.897 103.903Z'
                  fill='url(#paint27_linear_386_492)'
                />
                <path
                  d='M137.589 104.331C134.715 105.754 136.193 104.274 132.467 106.057C128.74 107.84 130.061 109.192 134.019 107.482C137.976 105.771 137.949 105.887 140.169 104.371C142.39 102.856 140.462 102.907 137.589 104.331Z'
                  fill='url(#paint28_linear_386_492)'
                />
                <path
                  d='M132.391 102.539C129.923 100.491 131.876 101.241 128.733 98.5602C125.589 95.8799 124.89 97.6368 128.061 100.558C131.232 103.478 131.116 103.501 133.403 104.914C135.69 106.327 134.859 104.587 132.391 102.539Z'
                  fill='url(#paint29_linear_386_492)'
                />
                <path
                  d='M136.364 112.467C139.86 110.266 138.562 111.907 141.253 110.162C142.612 109.281 142.706 109.584 142.613 109.935C143.152 109.574 143.269 109.539 142.816 110.042C142.251 110.672 142.522 110.28 142.613 109.935C141.792 110.485 139.992 111.79 137.738 113.091C134.004 115.245 132.868 114.667 136.364 112.467Z'
                  fill='url(#paint30_linear_386_492)'
                />
                <path
                  d='M134.85 110.255C138.948 109.738 137.079 110.677 140.255 110.233C141.858 110.008 141.816 110.322 141.583 110.601C142.223 110.502 142.345 110.519 141.722 110.785C140.943 111.116 141.354 110.875 141.583 110.601C140.606 110.753 138.424 111.175 135.831 111.401C131.536 111.776 130.751 110.772 134.85 110.255Z'
                  fill='url(#paint31_linear_386_492)'
                />
                <path
                  d='M115.487 110.529C148.507 86.8422 180.074 124.543 166.504 158.151C157.832 179.629 123.088 182.413 114.036 171.343C108.37 164.414 109.387 168.285 106.303 160.589C104.011 154.868 102.895 148.732 102.895 142.569L102.895 140.223C102.895 128.884 106.274 117.139 115.487 110.529Z'
                  fill='url(#paint32_linear_386_492)'
                />
                <path
                  d='M90.7873 58.742C92.99 61.4161 115.813 112.618 115.813 112.618L124.5 102.19C124.5 102.19 95.4213 57.9696 93.2168 55.9606C91.0123 53.9516 88.5845 56.0678 90.7873 58.742Z'
                  fill='url(#paint33_linear_386_492)'
                />
                <path
                  d='M147.626 80.9339C145.424 83.6081 108.349 139.328 108.349 139.328L105.574 122.993C105.574 122.993 142.99 79.1208 145.194 77.1118C147.399 75.1028 149.829 78.2597 147.626 80.9339Z'
                  fill='url(#paint34_linear_386_492)'
                />
                <path
                  d='M144.197 145.319C141.941 146.337 122.268 157.629 122.268 157.629L126.448 147.143C126.448 147.143 142.196 142.952 143.67 142.434C145.143 141.916 146.454 144.301 144.197 145.319Z'
                  fill='url(#paint35_linear_386_492)'
                />
                <path
                  d='M95.0923 166.226C99.0119 183.321 88.9988 241.119 88.9988 241.119L87.7801 253.737H125.56C125.56 253.737 108.443 191.743 115.404 174.773C122.365 157.804 123.756 154.675 123.756 154.675L124.798 152.59C125.146 151.895 125.494 151.547 126.189 150.157L127.232 148.071C127.232 148.071 138.152 132.035 139.778 130C141.404 127.965 138.155 126.337 136.936 127.965C135.717 129.593 110.895 155.37 110.895 155.37L109.505 140.077L107.419 123.393C107.419 123.393 105.654 104.357 104.842 101.915C104.029 99.473 100.373 99.473 100.373 103.543C100.373 107.614 99.1547 146.688 99.1547 146.688C99.1547 146.688 88.3798 135.55 80.8742 130.407C77.5278 128.115 70.7097 124.7 67.7944 123.74C64.8791 122.781 62.9282 122.002 59.7999 121.046C59.7999 121.046 44.7193 117.789 41.8758 116.975C39.0323 116.161 37.8152 120.232 40.2509 121.046C42.6865 121.86 63.7528 127.076 74.3744 135.292C86.3802 144.578 91.1727 149.131 95.0923 166.226Z'
                  fill='url(#paint36_linear_386_492)'
                />
                <circle cx='157.456' cy='131.837' r='3.23083' fill='#FFF7B6' />
                <circle cx='153.388' cy='135.313' r='3.23083' fill='#FFF7B6' />
                <circle cx='154.584' cy='140.179' r='3.23083' fill='#FFF7B6' />
                <circle cx='160.328' cy='140.179' r='3.23083' fill='#FFF7B6' />
                <circle cx='161.525' cy='135.313' r='3.23083' fill='#FFF7B6' />
                <circle cx='157.457' cy='136.601' r='2.4331' fill='#FFCC00' />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='url(#paint37_linear_386_492)'
                />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M152.71 254.182C146.738 245.646 98.3337 217.304 63.9338 251.902C59.9743 255.884 56.3084 261.67 63.4367 271.24C70.565 280.809 144.442 276.738 149.225 273.443C154.008 270.149 158.681 262.719 152.71 254.182Z'
                  fill='url(#paint38_linear_386_492)'
                  fillOpacity='0.2'
                />
                <ellipse
                  cx='85.6912'
                  cy='247.171'
                  rx='3.5'
                  ry='2'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <ellipse
                  cx='77.1912'
                  cy='251.171'
                  rx='3'
                  ry='2'
                  fill='#FFF7B6'
                  fillOpacity='0.6'
                />
                <defs>
                  <filter
                    id='filter0_d_386_492'
                    x='138.362'
                    y='80.3482'
                    width='24.4064'
                    height='27.7467'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='2.78068' />
                    <feGaussianBlur stdDeviation='1.8422' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_386_492'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_386_492'
                      result='shape'
                    />
                  </filter>
                  <linearGradient
                    id='paint0_linear_386_492'
                    x1='81.6979'
                    y1='2.78051'
                    x2='111.938'
                    y2='107.056'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.52875' stopColor='#84A220' />
                    <stop offset='1' stopColor='#5E7C0B' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_386_492'
                    x1='128.343'
                    y1='11.1072'
                    x2='126.884'
                    y2='84.1152'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.520797' stopColor='#93AE32' />
                    <stop offset='1' stopColor='#657C07' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_386_492'
                    x1='163.754'
                    y1='37.1257'
                    x2='157.116'
                    y2='113.892'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.735961' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_386_492'
                    x1='48.8919'
                    y1='50.5547'
                    x2='105.334'
                    y2='104.97'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='0.648502' stopColor='#84A32D' />
                    <stop offset='0.869411' stopColor='#779428' />
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_386_492'
                    x1='30.8299'
                    y1='85.9989'
                    x2='62.1712'
                    y2='180.823'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_386_492'
                    x1='74.0511'
                    y1='108.447'
                    x2='125.146'
                    y2='179.006'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_386_492'
                    x1='87.5072'
                    y1='23.227'
                    x2='159.883'
                    y2='92.0435'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_386_492'
                    x1='109.898'
                    y1='49.7751'
                    x2='127.229'
                    y2='108.93'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_386_492'
                    x1='197.153'
                    y1='100.431'
                    x2='124.814'
                    y2='126.968'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint9_linear_386_492'
                    x1='57.4514'
                    y1='111.28'
                    x2='91.4129'
                    y2='123.541'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint10_linear_386_492'
                    x1='155.016'
                    y1='82.2456'
                    x2='173.777'
                    y2='104.173'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.0264266' stopColor='#FFF9CC' />
                    <stop offset='1' stopColor='#CDAE78' />
                  </linearGradient>
                  <linearGradient
                    id='paint11_linear_386_492'
                    x1='144.368'
                    y1='73.4277'
                    x2='152.14'
                    y2='102.325'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#FFF9CC' />
                    <stop offset='1' stopColor='#CDAE78' />
                  </linearGradient>
                  <linearGradient
                    id='paint12_linear_386_492'
                    x1='109.193'
                    y1='61.1795'
                    x2='112.875'
                    y2='113.737'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint13_linear_386_492'
                    x1='194.373'
                    y1='130.524'
                    x2='126.206'
                    y2='119.211'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint14_linear_386_492'
                    x1='225.164'
                    y1='116.246'
                    x2='147.123'
                    y2='80.1373'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint15_linear_386_492'
                    x1='108.877'
                    y1='66.9966'
                    x2='145.121'
                    y2='144.995'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint16_linear_386_492'
                    x1='211.324'
                    y1='137.384'
                    x2='145.045'
                    y2='75.7495'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint17_linear_386_492'
                    x1='202.64'
                    y1='145.881'
                    x2='148.921'
                    y2='73.0387'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint18_linear_386_492'
                    x1='190.322'
                    y1='148.055'
                    x2='149.457'
                    y2='67.2977'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint19_linear_386_492'
                    x1='98.4246'
                    y1='87.5869'
                    x2='167.106'
                    y2='139.329'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint20_linear_386_492'
                    x1='105.517'
                    y1='95.6773'
                    x2='183.267'
                    y2='132.41'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint21_linear_386_492'
                    x1='114.964'
                    y1='108.966'
                    x2='187.07'
                    y2='143.756'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint22_linear_386_492'
                    x1='202.379'
                    y1='117.196'
                    x2='134.379'
                    y2='129.473'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint23_linear_386_492'
                    x1='107.1'
                    y1='107.853'
                    x2='171.395'
                    y2='133.168'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint24_linear_386_492'
                    x1='208.955'
                    y1='118.04'
                    x2='140.466'
                    y2='127.206'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint25_linear_386_492'
                    x1='106.277'
                    y1='94.1184'
                    x2='158.488'
                    y2='139.381'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint26_linear_386_492'
                    x1='215.204'
                    y1='116.993'
                    x2='137.162'
                    y2='80.8839'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint27_linear_386_492'
                    x1='214.073'
                    y1='113.097'
                    x2='136.032'
                    y2='76.9883'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint28_linear_386_492'
                    x1='217.538'
                    y1='87.3928'
                    x2='132.059'
                    y2='78.0268'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint29_linear_386_492'
                    x1='180.354'
                    y1='168.708'
                    x2='154.179'
                    y2='86.7983'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint30_linear_386_492'
                    x1='218.718'
                    y1='84.131'
                    x2='132.729'
                    y2='84.6697'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint31_linear_386_492'
                    x1='221.463'
                    y1='119.376'
                    x2='143.302'
                    y2='83.5258'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint32_linear_386_492'
                    x1='164.201'
                    y1='130.041'
                    x2='91.863'
                    y2='156.578'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#BACD3F' />
                    <stop offset='1' stopColor='#84A32D' />
                  </linearGradient>
                  <linearGradient
                    id='paint33_linear_386_492'
                    x1='101.576'
                    y1='75.4826'
                    x2='118.775'
                    y2='157.888'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint34_linear_386_492'
                    x1='134.029'
                    y1='98.6926'
                    x2='117.333'
                    y2='189.643'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint35_linear_386_492'
                    x1='136.527'
                    y1='147.519'
                    x2='101.251'
                    y2='162.447'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint36_linear_386_492'
                    x1='73.1267'
                    y1='154.512'
                    x2='116.527'
                    y2='376.359'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#A1613F' />
                    <stop offset='1' stopColor='#331D12' />
                  </linearGradient>
                  <linearGradient
                    id='paint37_linear_386_492'
                    x1='97.3211'
                    y1='232.391'
                    x2='98.3478'
                    y2='275.553'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E1924D' />
                    <stop offset='1' stopColor='#B96C49' />
                  </linearGradient>
                  <linearGradient
                    id='paint38_linear_386_492'
                    x1='75.79'
                    y1='333.422'
                    x2='93.7218'
                    y2='220.281'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopOpacity='0' />
                    <stop offset='1' stopColor='#FFE44B' />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        </main>
        {showCalendar && <Calendar onClose={() => setShowCalendar(false)} />}
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeMessage}>{getGaugeMessage(exp)}</div>
          <div className={styles.gaugeBarOuter}>
            <div
              className={styles.gaugeBarInner}
              style={{ width: `${getGaugePercentage(exp)}%` }}
            ></div>
          </div>
        </div>
        <div className={styles.navBar}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
          >
            <path
              d='M24 1.5C24 6.825 20.0344 11.2266 14.8969 11.9062C14.5641 9.40312 13.4625 7.14375 11.8359 5.37656C13.6312 2.17031 17.0625 0 21 0H22.5C23.3297 0 24 0.670312 24 1.5ZM0 4.5C0 3.67031 0.670312 3 1.5 3H3C8.79844 3 13.5 7.70156 13.5 13.5V22.5C13.5 23.3297 12.8297 24 12 24C11.1703 24 10.5 23.3297 10.5 22.5V15C4.70156 15 0 10.2984 0 4.5Z'
              fill='#93BC30'
            />
          </svg>
          <svg
            width='22'
            height='24'
            viewBox='0 0 22 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M21.3331 6.02263V1.22262C21.3361 1.04448 21.3037 0.867835 21.2384 0.705519C21.1731 0.543203 21.0765 0.399286 20.9556 0.284217C20.8348 0.16918 20.6928 0.0858089 20.5399 0.0401474C20.3869 -0.00551397 20.2269 -0.0123222 20.0713 0.0202161L7.30874 2.41182C7.05271 2.45488 6.81934 2.60121 6.65213 2.82355C6.48492 3.04588 6.39529 3.32904 6.39995 3.62023V15.0431C5.58655 14.5147 4.64091 14.3031 3.70971 14.441C2.77851 14.579 1.91379 15.0587 1.24965 15.8059C0.585518 16.5531 0.159088 17.5259 0.0365023 18.5735C-0.0860836 19.6211 0.102025 20.685 0.571653 21.6C1.04128 22.5151 1.76618 23.2303 2.63393 23.6346C3.50168 24.039 4.46377 24.1099 5.371 23.8364C6.27823 23.5629 7.07988 22.9603 7.65164 22.122C8.22339 21.2837 8.53329 20.2565 8.53326 19.1999V9.41504L19.1998 7.41584V12.6418C18.3865 12.1135 17.4409 11.9019 16.5097 12.0398C15.5786 12.1777 14.7139 12.6574 14.0497 13.4045C13.3856 14.1516 12.9591 15.1243 12.8364 16.1719C12.7138 17.2194 12.9018 18.2832 13.3713 19.1983C13.8408 20.1134 14.5656 20.8287 15.4332 21.2332C16.3008 21.6376 17.2629 21.7087 18.1701 21.4354C19.0773 21.1622 19.8791 20.5597 20.451 19.7216C21.0228 18.8835 21.3329 17.8565 21.3331 16.7999V6.02263Z'
              fill='#C5C5C5'
            />
          </svg>
          <svg
            width='27'
            height='24'
            viewBox='0 0 27 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
          >
            <path
              d='M13.5 21H4.5V15H13.5M27 15V12L25.5 4.5H1.5L0 12V15H1.5V24H16.5V15H22.5V24H25.5V15M25.5 0H1.5V3H25.5V0Z'
              fill='#C5C5C5'
            />
          </svg>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
          >
            <path
              d='M9.88084 0C8.38338 0 6.94725 0.594865 5.88838 1.65373C4.82951 2.7126 4.23465 4.14873 4.23465 5.6462C4.23465 7.14366 4.82951 8.57979 5.88838 9.63866C6.94725 10.6975 8.38338 11.2924 9.88084 11.2924C11.3783 11.2924 12.8144 10.6975 13.8733 9.63866C14.9322 8.57979 15.527 7.14366 15.527 5.6462C15.527 4.14873 14.9322 2.7126 13.8733 1.65373C12.8144 0.594865 11.3783 0 9.88084 0ZM2.8358 12.7039C2.464 12.7023 2.09553 12.7741 1.75155 12.9152C1.40757 13.0563 1.09485 13.264 0.831353 13.5263C0.567857 13.7886 0.358772 14.1004 0.216104 14.4437C0.0734368 14.7871 -3.76441e-06 15.1552 1.44721e-10 15.527C1.44721e-10 17.914 1.17582 19.7137 3.01366 20.8867C4.82326 22.0399 7.26242 22.5848 9.88084 22.5848C11.2289 22.5848 12.5289 22.4408 13.7203 22.143L11.1371 19.317C10.3054 18.4085 9.85566 17.2145 9.88115 15.9831C9.90665 14.7516 10.4055 13.5773 11.274 12.7039H2.8358ZM17.6429 14.1197L16.7565 13.4238C16.0892 12.8994 15.249 12.6453 14.403 12.7119C13.5569 12.7786 12.7669 13.1611 12.19 13.7836C11.613 14.406 11.2915 15.2228 11.2891 16.0715C11.2868 16.9202 11.6039 17.7387 12.1774 18.3643L17.1221 23.7705C17.1882 23.8428 17.2687 23.9006 17.3584 23.9401C17.448 23.9796 17.545 24 17.6429 24C17.7409 24 17.8379 23.9796 17.9275 23.9401C18.0172 23.9006 18.0977 23.8428 18.1638 23.7705L23.1099 18.3643C23.6834 17.7387 24.0005 16.9202 23.9982 16.0715C23.9958 15.2228 23.6743 14.406 23.0973 13.7836C22.5204 13.1611 21.7304 12.7786 20.8843 12.7119C20.0383 12.6453 19.1981 12.8994 18.5308 13.4238L17.6429 14.1197Z'
              fill='#C5C5C5'
            />
          </svg>
        </div>
      </div>

      {showLevelUpModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.levelUpModal}>
            <div className={styles.modalContent}>
              <h2>{`${name}님의 하루일기로\n새싹에서 묘목으로 성장했어요!`}</h2>
              <button
                className={styles.confirmButton}
                onClick={() => setShowLevelUpModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
