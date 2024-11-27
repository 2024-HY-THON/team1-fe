import React, {useState} from 'react';
import "./Login.css"

function Login() {
    const [autoLogin, setAutoLogin] = useState(false);
    const handleAutoLoginClick = () => {
        setAutoLogin(!autoLogin);
    };

    return (
        <div className={"container"}>
            <div className={"login-logo"}>
                temp
            </div>
            <div className={"login-container"}>
                <div className={"input-form"}>
                </div>
                <div className={"input-form"}>
                </div>
                <div className={"login-status"}>
                    <div className={"auto-login-box"} onClick={handleAutoLoginClick}>
                        {autoLogin ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none" className="auto-login-box on">
                                <rect x="0.65" y="0.65" width="18.7" height="18.7" rx="3.35" stroke="#D1D1D1"
                                      strokeWidth="1.3"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none" className="auto-login-box off">
                                <rect width="20" height="20" rx="4" fill="#ACCD5E"/>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M15.3313 6.25484C15.4943 6.41788 15.5859 6.63898 15.5859 6.86952C15.5859 7.10006 15.4943 7.32115 15.3313 7.48419L8.81478 14.0007C8.72866 14.0869 8.62642 14.1552 8.51389 14.2018C8.40136 14.2484 8.28075 14.2724 8.15895 14.2724C8.03715 14.2724 7.91654 14.2484 7.80401 14.2018C7.69148 14.1552 7.58924 14.0869 7.50312 14.0007L4.26542 10.7636C4.18238 10.6834 4.11615 10.5875 4.07058 10.4814C4.02502 10.3753 4.00104 10.2613 4.00003 10.1458C3.99903 10.0304 4.02103 9.91589 4.06474 9.80905C4.10846 9.7022 4.17301 9.60513 4.25465 9.5235C4.33628 9.44186 4.43335 9.37731 4.5402 9.33359C4.64704 9.28988 4.76153 9.26788 4.87697 9.26888C4.99241 9.26989 5.10649 9.29387 5.21257 9.33944C5.31864 9.385 5.41457 9.45123 5.49477 9.53427L8.15866 12.1982L14.1014 6.25484C14.1821 6.17405 14.278 6.10996 14.3835 6.06623C14.489 6.02251 14.6021 6 14.7164 6C14.8306 6 14.9437 6.02251 15.0492 6.06623C15.1547 6.10996 15.2506 6.17405 15.3313 6.25484Z"
                                      fill="#F9F9F9"/>
                            </svg>
                        )}
                        <text className={"auto-login-text"}> 자동로그인</text>
                    </div>
                </div>
                <button className={"login-button"}>
                    <text className={"login-button-text"}>
                        로그인
                    </text>
                </button>
                <div className={"login-services-container"}>
                    <div className={"login-services"}>
                        <text>아이디 찾기</text>
                        <div className={"login-services-bar"}/>
                        <text>비밀번호 찾기</text>
                        <div className={"login-services-bar"}/>
                        <text>회원가입</text>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
