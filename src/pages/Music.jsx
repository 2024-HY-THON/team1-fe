import React, { useState } from "react";
import "./Music.css";
import headerline from "../assets/headerline.svg";
import image1 from "../assets/musicimg1.jpg";
import image2 from "../assets/musicimg2.jpg";
import image3 from "../assets/musicimg3.jpg";
import image4 from "../assets/musicimg4.jpg";
import image5 from "../assets/musicimg5.jpg";
import image6 from "../assets/musicimg6.jpg";

function Music() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 모달에 표시될 이미지

  // 추천 음악 이미지 배열
  const recommendedImages = [image1, image2, image3, image4, image5, image6];

  // 맞춤 추천 음악에서 4개만 표시
  const displayedRecommendedImages = recommendedImages.slice(0, 4);

  const openModal = (image) => {
    setSelectedImage(image); // 선택한 이미지 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // 선택된 이미지 초기화
  };

  return (
    <div className="music-page">
      {/* 헤더 */}
      <header className="header">
        <h1 className="header-title">배경음악</h1>
        <div
          className="header-line"
          style={{
            backgroundImage: `url(${headerline})`,
          }}
        ></div>
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
          {displayedRecommendedImages.map((image, index) => (
            <div
              key={index}
              className="music-card"
              onClick={() => openModal(image)}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* 인기 음악 */}
      <section className="popular-music">
        <h2 className="section-title">인기 음악</h2>
        <div className="popular-music-list">
          {recommendedImages.map((image, index) => (
            <div
              key={index}
              className="popular-music-item"
              onClick={() => openModal(image)}
            >
              <div
                className="music-thumbnail"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="music-info">
                <p className="music-title">PLAYPLAY</p>
                <p className="music-subtitle">ARTIST NAME</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>배경음악으로 설정하기</h3>
            <div
              className="music-thumbnail modal-thumbnail"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
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