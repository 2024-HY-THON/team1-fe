import React, { useState } from "react";
import "./Music.css";

function Music() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="music-page">
      {/* 헤더 */}
      <header className="header">
        <h1 className="header-title">배경음악</h1>
      </header>

      {/* 현재 배경음악 */}
      <section className="current-music">
        <h2 className="section-title">현재 배경음악</h2>
        <div className="current-music-box">
          <p className="current-music-title">PLAYPLAY</p>
        </div>
      </section>

      {/* 맞춤 추천 음악 */}
      <section className="recommended-music">
        <h2 className="section-title">○○님 맞춤 추천 음악</h2>
        <div className="recommended-music-grid">
          <div className="music-card" onClick={openModal}></div>
          <div className="music-card" onClick={openModal}></div>
          <div className="music-card" onClick={openModal}></div>
          <div className="music-card" onClick={openModal}></div>
        </div>
      </section>

      {/* 인기 음악 */}
      <section className="popular-music">
        <h2 className="section-title">인기 음악</h2>
        <div className="popular-music-list">
          <div className="popular-music-item" onClick={openModal}>
            <div className="music-thumbnail"></div>
            <div className="music-info">
              <p className="music-title">PLAYPLAY</p>
              <p className="music-subtitle">ARTIST NAME</p>
            </div>
          </div>
          <div className="popular-music-item" onClick={openModal}>
            <div className="music-thumbnail"></div>
            <div className="music-info">
              <p className="music-title">PLAYPLAY</p>
              <p className="music-subtitle">ARTIST NAME</p>
            </div>
          </div>
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>배경음악으로 설정하기</h3>
            <div className="music-thumbnail modal-thumbnail"></div>
            <p className="modal-title">PLAYPLAY</p>
            <p className="modal-artist">ARTIST NAME</p>
            <button className="modal-button" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Music;
