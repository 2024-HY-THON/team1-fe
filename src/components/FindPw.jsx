import React, { useState } from "react";
import "./FindPw.css";

function FindPw() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [message, setMessage] = useState(""); // 결과 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/find-pw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("비밀번호 재설정 링크를 이메일로 보냈습니다.");
      } else {
        setMessage("입력한 정보로 계정을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("오류:", error);
      setMessage("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="find-pw-container">
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="등록된 이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">비밀번호 찾기</button>
      </form>
      {message && <div className="find-pw-message">{message}</div>}
    </div>
  );
}

export default FindPw;
