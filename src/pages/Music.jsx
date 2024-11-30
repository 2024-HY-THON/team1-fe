import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './Music.module.css';
import headerline from '../assets/headerline.svg';
import image1 from '../assets/musicimg1.jpg';
import image2 from '../assets/musicimg2.jpg';
import image3 from '../assets/musicimg3.jpg';
import image4 from '../assets/musicimg4.jpg';
import image5 from '../assets/musicimg5.jpg';
import image6 from '../assets/musicimg6.jpg';
import music1 from '../assets/music1.mp3';
import music2 from '../assets/music2.mp3';
import music3 from '../assets/music3.mp3';
import music4 from '../assets/music4.mp3';
import music5 from '../assets/music5.mp3';
import music6 from '../assets/music6.mp3';

function Music() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null); // 현재 선택된 음악
  const [modalMusicInfo, setModalMusicInfo] = useState(null); // 모달에 표시될 음악 정보
  const audioRef = useRef(null); // 오디오 제어

  // 맞춤 추천 음악 데이터
  const recommendedMusic = [
    {
      image: image1,
      music: music1,
      title: 'Brisa Do Mar',
      artist: 'CTRL S',
      id: 1,
    },
    {
      image: image2,
      music: music2,
      title: 'Breathing Colors',
      artist: 'Ran Gerson',
      id: 2,
    },
    { image: image3, music: music3, title: 'Parody', artist: 'Egozi', id: 3 },
    {
      image: image4,
      music: music4,
      title: 'Misfit Toys',
      artist: 'Michael Shynes',
      id: 4,
    },
  ];

  // 인기 음악 데이터
  const popularMusic = [
    {
      image: image5,
      title: 'So Naughty',
      artist: "Where's LuLu?",
      music: music5,
      id: 5,
    },
    {
      image: image6,
      title: "Gettin' It",
      artist: 'Danny Shields',
      music: music6,
      id: 6,
    },
    {
      image: image1,
      title: 'Brisa Do Mar',
      artist: 'CTRL S',
      music: music1,
      id: 1,
    },
  ];

  // 모달 열기
  const openModal = (musicInfo) => {
    setModalMusicInfo(musicInfo);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMusicInfo(null);
  };

  // 음악 재생/정지 핸들러
  const handlePlayMusic = (music) => {
    if (selectedMusic === music) {
      audioRef.current.pause();
    } else {
      setSelectedMusic(music);
    }
  };

  // 음악이 선택될 때마다 새로운 오디오를 로드하고 재생하는 effect
  useEffect(() => {
    if (selectedMusic && audioRef.current) {
      audioRef.current.src = selectedMusic; // 새 음악 파일 로드
      audioRef.current.play(); // 재생
    }
  }, [selectedMusic]); // selectedMusic이 변경될 때마다 실행

  // 선택된 음악을 백엔드 서버로 보내는 함수
  const sendMusicToBackend = async (musicInfo) => {
    try {
      const token = localStorage.getItem('token');
      // 예시: POST 요청을 통해 음악 데이터를 서버로 전송
      const response = await axios.post(
        'https://localhost:8080/music/set',
        {
          title: musicInfo.title,
          artist: musicInfo.artist,
          id: musicInfo.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 서버 응답 처리
      console.log('Music sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending music to the backend:', error);
    }
  };

  // 확인 버튼 클릭 시 처리
  const handleConfirmSelection = async () => {
    if (modalMusicInfo) {
      setSelectedMusic(modalMusicInfo.music); // 음악 설정
      closeModal();

      // 선택된 음악을 백엔드 서버로 전송
      await sendMusicToBackend(modalMusicInfo);
    }
  };

  return (
    <div className={styles.musicPage}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>배경음악</h1>
        <div
          className='headerLine'
          style={{
            backgroundImage: `url(${headerline})`,
          }}
        ></div>
      </header>

      {/* 현재 배경음악 */}
      <section className={styles.currentMusic}>
        <h2 className={styles.sectionTitle}>현재 배경음악</h2>
        <div className={styles.currentMusicBox}>
          {/* 배경음악으로 설정된 앨범 커버를 크게 표시 */}
          <div
            className={styles.musicThumbnail}
            style={{
              backgroundImage: `url(${
                modalMusicInfo ? modalMusicInfo.image : ''
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <p className={styles.currentMusicTitle}>
            {modalMusicInfo ? modalMusicInfo.title : '선택된 음악 없음'}
          </p>
        </div>
      </section>

      {/* 맞춤 추천 음악 */}
      <section className={styles.recommendedMusic}>
        <h2 className={styles.sectionTitle}>○○님 맞춤 추천 음악</h2>
        <div className={styles.recommendedMusicGrid}>
          {recommendedMusic.map((item, index) => (
            <div
              key={index}
              className={styles.musicCard}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => openModal(item)} // 음악 클릭 시 모달 열기
            >
              <div className={styles.musicInfoOverlay}>
                <p>{item.title}</p>
                <p>{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 인기 음악 */}
      <section className={styles.popularMusic}>
        <h2 className={styles.sectionTitle}>인기 음악</h2>
        <div className={styles.popularMusicList}>
          {popularMusic.map((item, index) => (
            <div
              key={index}
              className={styles.popularMusicItem}
              onClick={() => openModal(item)} // 음악 클릭 시 모달 열기
            >
              <div
                className={styles.musicThumbnail}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className={styles.musicInfo}>
                <p className={styles.musicTitle}>{item.title}</p>
                <p className={styles.musicSubtitle}>{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 오디오 */}
      {selectedMusic && (
        <audio ref={audioRef} onEnded={() => setSelectedMusic(null)} />
      )}

      {/* 모달 */}
      {isModalOpen && modalMusicInfo && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>배경음악으로 설정하기</h3>
            <div
              className={styles.musicThumbnail}
              style={{
                backgroundImage: `url(${modalMusicInfo.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '150px',
                height: '150px',
                margin: '0 auto',
              }}
            ></div>
            <p className={styles.modalTitle}>{modalMusicInfo.title}</p>
            <p className={styles.modalArtist}>{modalMusicInfo.artist}</p>
            <button
              className={styles.modalButton}
              onClick={handleConfirmSelection} // Handle confirm and send to backend
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Music;
