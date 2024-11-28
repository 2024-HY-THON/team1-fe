import React, {useState} from 'react';
import "./Register.css";

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState("")
    const [isUsernameChecked, setIsUsernameChecked] = useState(false); //테스트 끝나면 false로 바꿀것
    const [isSendEmail, setIsSendEmail] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState("");


    const isFormValid = () => {
        return (
            name.trim() &&
            username.trim() &&
            password &&
            confirmPassword &&
            email.trim() &&
            isUsernameChecked &&
            isEmailVerified
        );
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    passwordVerify: confirmPassword,
                    name,
                    email,
                }),
            });

            if (response.ok) {
                alert("회원가입 완료!");
                setName("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setEmail("");
                setEmailCode("");
                setIsUsernameChecked(false);
                setIsSendEmail(false);
                setIsEmailVerified(false);
            } else if (response.status === 409) {
                alert("이미 등록된 사용자입니다.");
            } else if (response.status === 400) {
                alert("잘못된 요청입니다.");
            } else {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        } catch (error) {
            alert("서버와의 통신에 실패했습니다.");
        }
    };

    const handleUsernameCheck = async () => {
        if (!username.trim()) {
            setUsernameError("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/usernameVerify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username })
            });

            if (response.ok) {
                setIsUsernameChecked(true);
                setUsernameError("");
                console.log("ok")
            } else if (response.status === 409) {
                setIsUsernameChecked(false);
                setUsernameError("이미 사용 중인 아이디입니다.");
            } else {
                setIsUsernameChecked(false);
                setUsernameError("아이디 확인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            setIsUsernameChecked(false);
            setUsernameError("서버와의 통신에 실패했습니다.");
        }
    };

    const handleEmailVerification = () => {
        if (isTimerActive) return;
        setIsSendEmail(true);
        setIsTimerActive(true);
        setTimer(60);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleEmailVertCheck = () => {
        setIsTimerActive(false)
        setIsEmailVerified(true);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    return (
        <div className={"container"}>
            <div className={"register-banner-container"}>
                <div className={"register-banner"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <path d="M9 1L1 9L9 17" stroke="#ACCD5E" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <p className={"register-text"}>회원가입</p>
                </div>
            </div>
            <div className={"banner-underline"}/>
            <div className={"register-contents-wrapper"}>
                <div className={"register-conents-container"}>
                    <div className={"register-contents-block"}>
                        <p className={"register-contents-text"}>이름</p>
                        <div className={"register-contents-input"}>
                            <div className={"register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"이름을 입력하세요."} value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className={"register-contents-block"}>
                        <p className={"register-contents-text"}>아이디</p>
                        <div className={"register-contents-input2"}>
                            <div className={"register-contents-input2-out register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"아이디를 입력해주세요"}
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <button className={`register-contents-button ${isUsernameChecked ? "active" : ''}`}
                                    disabled={isUsernameChecked}
                                    onClick={handleUsernameCheck}>
                                <p className={"register-contents-button-text"}>중복확인</p>
                            </button>
                        </div>
                        {usernameError && (
                            <p className={"error-text"}>{usernameError}</p>
                        )}
                    </div>
                    <div className={"register-contents-block"}>
                        <p className={"register-contents-text"}>비밀번호</p>
                        <div className={"register-contents-input"}>
                            <div className={"register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"비밀번호"} value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       type={password}/>
                            </div>
                        </div>
                        <div className={"register-contents-input"}>
                            <div className={"register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"비밀번호 확인"}
                                       value={confirmPassword}
                                       onChange={handleConfirmPasswordChange}
                                       type={password}/>
                            </div>
                        </div>
                        {passwordError && (
                            <p className={"error-text"}>비밀번호를 확인해주세요.</p>
                        )}
                    </div>
                    <div className={"register-contents-block"}>
                        <p className={"register-contents-text"}>이메일 인증</p>
                        <div className={"register-contents-input2"}>
                            <div className={"register-contents-input2-out register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"이메일을 입력해주세요"}
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <button
                                className={`register-contents-button ${isEmailVerified ? "active" : !isTimerActive ? 'inactive' : 'active'}`}
                                onClick={handleEmailVerification}
                                disabled={isTimerActive || isEmailVerified}
                            >
                                <p className={"register-contents-button-text"}>{isTimerActive ? `${timer}s` : "인증번호 받기"}</p>
                            </button>
                        </div>
                        {isSendEmail ? <div className={"register-contents-input2"}>
                            <div className={"register-contents-input2-out register-contents-input-out"}>
                                <input className={"register-contents-input-in"} placeholder={"인증번호를 입력해주세요"}
                                       value={emailCode}
                                       onChange={(e) => setEmailCode(e.target.value)}/>
                            </div>
                            <button className={`register-contents-button ${isEmailVerified ? "active" : ''}`}
                                    disabled={isEmailVerified}
                                    onClick={handleEmailVertCheck}>
                                <p className={"register-contents-button-text"}>인증</p>
                            </button>
                        </div>
                        :
                        ""}

                    </div>
                </div>

            </div>
            <button className={`register-submit-container ${isFormValid() ? 'active' : ''}`}
                    disabled={!isFormValid()}
                    onClick={handleSubmit}>
                <p className={"register-submit-text"}>가입하기</p>
            </button>
        </div>

    );
}

export default Register;
