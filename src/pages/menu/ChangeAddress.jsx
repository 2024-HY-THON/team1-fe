import React, {useState, useEffect} from "react";
import "./../../styles/menuPage.css";

const ChangeAddress = () => {
    const [address, setAddress] = useState(""); // 현재 입력 중인 주소
    const [savedAddress, setSavedAddress] = useState(""); // 저장된 주소

    useEffect(() => {
        const storedAddress = localStorage.getItem("userAddress");
        if (storedAddress) {
            setSavedAddress(storedAddress);
        }
    }, []);

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
                <button >주소 설정</button>
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
