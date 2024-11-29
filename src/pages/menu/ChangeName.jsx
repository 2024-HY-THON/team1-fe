import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../../components/NameContext";

const ChangeName = () => {
  const { name, setName } = useContext(NameContext); // Context에서 이름 가져오기
  const [newName, setNewName] = useState(name); // 입력된 새 이름 상태
  const navigate = useNavigate();

  // 페이지 로드 시 localStorage에서 저장된 이름을 불러오기
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName); // Context의 상태 업데이트
      setNewName(storedName); // 입력 필드 초기값 설정
    }
  }, [setName]);

  const handleNameChange = () => {
    if (!newName.trim()) {
      console.log("이름을 입력해주세요.");
      return;
    }

    setName(newName); // Context 상태 업데이트
    localStorage.setItem("userName", newName); // 이름을 localStorage에 저장
    console.log("이름이 설정되었습니다:", newName);
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <div>
      <h1>이름 변경 페이지</h1>
      <p>여기에서 이름을 변경할 수 있습니다.</p>
      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새 이름을 입력하세요"
        />
        <button onClick={handleNameChange}>이름 변경</button>
      </div>
    </div>
  );
};

export default ChangeName;
