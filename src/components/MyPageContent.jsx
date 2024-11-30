import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow.png";
import "./../styles/myPage.css";

const MyPageContent = () => {
  return (
    <div className="mypage-content-container">
      <div className="menu-footer-wrapper">
        <div className="mypage-menu">
          <ul>
            <li>
              <Link to="/mypage/change-name">
                <span>이름</span>
                <span className="menu-icon">
                  <img src={arrow} alt="arrow" className="arrow-img" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/mypage/change-password">
                <span>비밀번호 변경</span>
                <span className="menu-icon">
                  <img src={arrow} alt="arrow" className="arrow-img" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/mypage/change-address">
                <div className="menu-content">
                  <span>주소 설정</span>
                  <span className="menu-description">
                    주소를 설정하면 하루 만에 배송돼요
                  </span>
                </div>
                <span className="menu-icon">
                  <img src={arrow} alt="arrow" className="arrow-img" />
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mypage-footer">
          <div className="footer-section">
            <span>문의 및 알림</span>
            <ul className="footer-list">
              <div className="footer-list-left">
                <li>고객센터</li>
                <li>공지사항</li>
                <li>쿠폰 사용내역</li>
              </div>
              <div className="footer-list-right">
                <li>자주 묻는 질문</li>
                <li>약관 및 정책</li>
                <li>문의 내역</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageContent;
