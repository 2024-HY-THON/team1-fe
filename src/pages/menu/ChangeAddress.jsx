import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangeAddress = () => {
  const [address, setAddress] = useState(""); // 현재 입력 중인 주소
  const [savedAddress, setSavedAddress] = useState(""); // 저장된 주소
  const navigate = useNavigate();

  // 페이지 로드 시 localStorage에서 저장된 주소를 불러오기
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setSavedAddress(storedAddress); // 저장된 주소 상태 업데이트
    }
  }, []);

  const handleAddressSubmit = () => {
    // 주소가 빈 값인 경우 처리
    if (!address.trim()) {
      console.log("주소를 입력해주세요.");
      return;
    }

    // 주소가 설정된 경우
    setSavedAddress(address); // 저장된 주소 상태 업데이트
    localStorage.setItem("userAddress", address); // 주소를 localStorage에 저장
    console.log("주소가 설정되었습니다:", address);
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <div>
      <h1>주소 설정 페이지</h1>
      <p>여기에서 주소를 설정할 수 있습니다.</p>

      {/* 주소 설정 섹션 */}
      <div>
        <h2>주소 설정</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소를 입력하세요"
        />
        <button onClick={handleAddressSubmit}>주소 설정</button>
      </div>

      {/* 저장된 주소 표시 섹션 */}
      {savedAddress && (
        <div style={{ marginTop: "20px" }}>
          <h3>저장된 주소:</h3>
          <p>{savedAddress}</p>
        </div>
      )}
    </div>
  );
};

export default ChangeAddress;
