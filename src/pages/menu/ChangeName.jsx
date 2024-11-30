import React, {useState} from "react";

import "./../../styles/menuPage.css";
import {useNavigate} from 'react-router-dom'

const ChangeName = () => {
    const [newName, setNewName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChangeName = async () => {
        if (!newName) {
            setErrorMessage("새 이름을 입력해주세요.");
            setSuccessMessage("");
            return;
        }

        try {
            const token = localStorage.getItem('token' || "");
            const response = await fetch("http://localhost:8080/mypage/updateName", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({newName}),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");
                setSuccessMessage(data.message);
                setTimeout(() => {
                    navigate("/mypage");
                }, 1000);
            } else {
                setSuccessMessage("");
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Error updating name:", error);
            setSuccessMessage("");
            setErrorMessage("이름 변경에 실패했습니다.");
        }
    };
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
                <button onClick={handleChangeName}>이름 변경</button>

                {errorMessage && <p className="message-error">{errorMessage}</p>}
                {successMessage && <p className="message-success">{successMessage}</p>}
            </div>
        </div>
    );
};

export default ChangeName;
