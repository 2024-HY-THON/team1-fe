import React from "react";
import MyPageHeader from "../components/MyPageHeader";
import MyPageContent from "../components/MyPageContent";
import "./../styles/myPage.css";

const MyPage = () => {
  return (
      <div className={"main"}>
          <div className="container">
              <MyPageHeader/>
              <MyPageContent/>
          </div>
      </div>

  );
};

export default MyPage;
