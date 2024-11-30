import React, { useState } from "react";
import "./FindId.css";

function FindId() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [message, setMessage] = useState(""); // 결과 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`찾은 아이디: ${data.username}`);
      } else {
        setMessage("입력한 정보로 아이디를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("오류:", error);
      setMessage("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="find-id-container">
      <h2>아이디 찾기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="등록된 이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">아이디 찾기</button>
      </form>
      {message && <div className="find-id-message">{message}</div>}
    </div>
  );
}

export default FindId;
