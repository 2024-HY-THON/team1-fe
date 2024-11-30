import React, { useState, useEffect } from "react";
import "./../../styles/menuPage.css";
import {useNavigate} from 'react-router-dom'

const ChangeAddress = () => {
    const [address, setAddress] = useState(""); // 현재 입력 중인 주소
    const [savedAddress, setSavedAddress] = useState(""); // 저장된 주소
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지
    const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 컴포넌트 마운트 시 사용자 주소 불러오기
    useEffect(() => {
        const token = localStorage.getItem('token' || "");
        const fetchUserDetails = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/details", {
                    method: "GET",
                    headers: {
                        "Authorization": `${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setSavedAddress(data.address);
                    setLoading(false);
                } else {
                    setErrorMessage(data.message || "사용자 정보를 불러오지 못했습니다.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setErrorMessage("서버와의 연결에 실패했습니다.");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []); // 컴포넌트가 처음 마운트될 때만 실행

    // 주소 업데이트 핸들러
    const handleUpdateAddress = async () => {
        if (!address) {
            setErrorMessage("주소를 입력해주세요.");
            setSuccessMessage("");
            return;
        }

        try {
            const token = localStorage.getItem('token' || "");
            const response = await fetch("http://localhost:8080/mypage/updateAddress", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({ newAddress: address }),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");
                setSuccessMessage(data.message);
                setSavedAddress(address);
                setAddress("");
                setTimeout(() => {
                    navigate("/mypage");
                }, 1000);
            } else {
                setSuccessMessage("");
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Error updating address:", error);
            setSuccessMessage("");
            setErrorMessage("주소 업데이트에 실패했습니다.");
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="menu-page-container">
            <div className="menu-page-header">
                <h1>주소 설정 페이지</h1>
                <p>여기에서 주소를 설정할 수 있습니다.</p>
            </div>
            <div className="menu-page-form">
                <h2>주소 설정</h2>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="주소를 입력하세요"
                />
                <button onClick={handleUpdateAddress}>주소 설정</button>

                {errorMessage && <p className="message-error">{errorMessage}</p>}
                {successMessage && <p className="message-success">{successMessage}</p>}

                {savedAddress && (
                    <div className="menu-page-info">
                        <h3>저장된 주소:</h3>
                        <p>{savedAddress}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangeAddress;
