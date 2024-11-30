import React from "react";
import MyPageHeader from "../components/MyPageHeader";
import MyPageContent from "../components/MyPageContent";
import "./../styles/myPage.css";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <MyPageHeader />
      <MyPageContent />
    </div>
  );
};

export default MyPage;
