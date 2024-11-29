import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../../components/NameContext";

const ChangeName = () => {
  const { name, setName } = useContext(NameContext); // Context에서 이름 가져오기
  const [newName, setNewName] = useState(name); // 입력된 새 이름 상태
  const navigate = useNavigate();

  const handleNameChange = () => {
    setName(newName); // 이름 업데이트
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
