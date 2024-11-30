import React, {useState} from "react";
import "./../../styles/menuPage.css";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const correctCurrentPassword = "password123";

    const handleChangePassword = () => {
        if (currentPassword !== correctCurrentPassword) {
            setErrorMessage("현재 비밀번호가 올바르지 않습니다.");
            setSuccessMessage("");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            setSuccessMessage("");
            return;
        }
        if (newPassword.length < 8) {
            setErrorMessage("새 비밀번호는 8자 이상이어야 합니다.");
            setSuccessMessage("");
            return;
        }

        setErrorMessage("");
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="menu-page-container">
            <div className="menu-page-header">
                <h1>비밀번호 변경 페이지</h1>
                <p>여기에서 비밀번호를 변경할 수 있습니다.</p>
            </div>
            <div className="menu-page-form">
                <h2>비밀번호 변경</h2>
                <label>현재 비밀번호</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호를 입력하세요"
                />
                <label>새 비밀번호</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호를 입력하세요"
                />
                <label>새 비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호를 다시 입력하세요"
                />

                <button onClick={handleChangePassword}>비밀번호 변경</button>
                {errorMessage && <p className="message-error">{errorMessage}</p>}
                {successMessage && <p className="message-success">{successMessage}</p>}
            </div>
        </div>
    );
};

export default ChangePassword;
