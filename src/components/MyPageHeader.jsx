import React, {useEffect, useState} from "react";
import profile from "../assets/profile.png";
import "./../styles/myPage.css";

const MyPageHeader = () => {
    const [userDetails, setUserDetails] = useState(null);

    const getUserDetails = async () => {
        try {
            const token = localStorage.getItem('token' || "");
            const response = await fetch("http://localhost:8080/user/details", {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const data = await response.json();
            setUserDetails(data.name)
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await getUserDetails();
        };
        fetchData();
    }, []);
  return (
    <div className="mypage-header-wrapper">
      <div className="mypage-header">
        <div className="profile-icon">
          <img src={profile} alt="profile" className="profile-img" />
        </div>
        <p className="profile-name"></p>
        <p className="status-message">{userDetails}님의 이야기를 듣고 자라나요!</p>
      </div>
    </div>
  );
};

export default MyPageHeader;
