import React, { useState} from "react";

import "./../../styles/menuPage.css";

const ChangeName = () => {
  const [newName, setNewName] = useState(""); //여기 백엔드에서 받아오기



  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <h1>이름 변경 페이지</h1>
        <p>여기에서 이름을 변경할 수 있습니다.</p>
      </div>
      <div className="menu-page-form">
        <h2>이름 변경</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새 이름을 입력하세요"
        />
        <button>이름 변경</button>
      </div>
    </div>
  );
};

export default ChangeName;
