import styles from './main.module.css';
import { useState, useEffect } from 'react';
import Calendar from './calendar';
import DiaryWrite from './diaryWrite';

const Main = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [showDiaryWrite, setShowDiaryWrite] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true); // 툴팁 표시 상태

  useEffect(() => {
    // 페이지 로드 시 툴팁을 보이게 설정
    setShowTooltip(true);
  }, []);

  // 페이지의 어느 곳이든 클릭하면 툴팁이 사라지도록
  const handlePageClick = () => {
    setShowTooltip(false);
  };

  return (
    <div className={styles.main} onClick={handlePageClick}>
      <div className={styles.container}>
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
                  fill-opacity='0.5'
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
                  fill-rule='evenodd'
                  clip-rule='evenodd'
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
            <span className={styles.question}>
              ○○님은 오늘 어떤 하루를 보내셨나요?
            </span>
            <span className={styles.instruction}>
              말풍선을 눌러 알려주세요!
            </span>
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
              <g clip-path='url(#clip0_314_704)'>
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
                  fill-opacity='0.8'
                />
                <ellipse
                  cx='65.5'
                  cy='124'
                  rx='6.5'
                  ry='2'
                  fill='#F1FEB4'
                  fill-opacity='0.8'
                />
                <ellipse
                  cx='45'
                  cy='137'
                  rx='14'
                  ry='4'
                  fill='#F1FEB4'
                  fill-opacity='0.8'
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
                  color-interpolation-filters='sRGB'
                >
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
                  <stop stop-color='#CCEA7A' />
                  <stop offset='1' stop-color='#578127' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_314_704'
                  x1='78.2434'
                  y1='-26.4355'
                  x2='64.3454'
                  y2='622.072'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#EDF6A2' />
                  <stop offset='1' stop-color='#578127' />
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
          <div className={styles.plantImg}>
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
                fill-opacity='0.2'
              />
              <path
                d='M154.081 165.702C147.088 155.705 90.4014 122.513 50.1155 163.031C45.4785 167.695 41.1854 174.471 49.5333 185.678C57.8813 196.885 144.399 192.116 150.001 188.259C155.602 184.401 161.075 175.699 154.081 165.702Z'
                fill='url(#paint3_linear_327_454)'
                fill-opacity='0.2'
              />
              <ellipse
                cx='75.5004'
                cy='157.5'
                rx='4.5'
                ry='2.5'
                fill='#FFF7B6'
                fill-opacity='0.6'
              />
              <ellipse
                cx='37.766'
                cy='16'
                rx='11.3311'
                ry='5.94345'
                transform='rotate(23.7235 37.766 16)'
                fill='#FFF7B6'
                fill-opacity='0.6'
              />
              <ellipse
                cx='65.5004'
                cy='162.5'
                rx='3.5'
                ry='2.5'
                fill='#FFF7B6'
                fill-opacity='0.6'
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
                  <stop stop-color='#BACD3F' />
                  <stop offset='1' stop-color='#84A32D' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_327_454'
                  x1='146.139'
                  y1='9.73535'
                  x2='146.139'
                  y2='186.682'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#BACD3F' />
                  <stop offset='1' stop-color='#84A32D' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_327_454'
                  x1='89.2155'
                  y1='140.182'
                  x2='90.4179'
                  y2='190.729'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#E1924D' />
                  <stop offset='1' stop-color='#B96C49' />
                </linearGradient>
                <linearGradient
                  id='paint3_linear_327_454'
                  x1='64.0004'
                  y1='258.5'
                  x2='85.0004'
                  y2='126'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-opacity='0' />
                  <stop offset='1' stop-color='#FFE44B' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </main>
        {showCalendar && <Calendar onClose={() => setShowCalendar(false)} />}
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
              fill-rule='evenodd'
              clip-rule='evenodd'
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
    </div>
  );
};

export default Main;
