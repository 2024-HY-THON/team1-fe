import React from "react";
import profile from "../assets/profile.png";
import "./../styles/myPage.css";

const MyPageHeader = () => {
  return (
    <div className="mypage-header-wrapper">
      <div className="mypage-header">
        <div className="profile-icon">
          <img src={profile} alt="profile" className="profile-img" />
        </div>
        <p className="profile-name"></p>
        <p className="status-message">님의 이야기를 듣고 자라나요!</p>
      </div>
    </div>
  );
};

export default MyPageHeader;
