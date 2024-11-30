import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './../pages/main.module.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleIconClick = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.navBar}>
            <div
                className={styles.iconContainer}
                onClick={() => handleIconClick("/main")}
            >
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={styles.icon}
                >
                    <path
                        d='M24 1.5C24 6.825 20.0344 11.2266 14.8969 11.9062C14.5641 9.40312 13.4625 7.14375 11.8359 5.37656C13.6312 2.17031 17.0625 0 21 0H22.5C23.3297 0 24 0.670312 24 1.5ZM0 4.5C0 3.67031 0.670312 3 1.5 3H3C8.79844 3 13.5 7.70156 13.5 13.5V22.5C13.5 23.3297 12.8297 24 12 24C11.1703 24 10.5 23.3297 10.5 22.5V15C4.70156 15 0 10.2984 0 4.5Z'
                        fill='#93BC30'
                    />
                </svg>
            </div>

            <div
                className={styles.iconContainer}
                onClick={() => handleIconClick("/song")}
            >
                <svg
                    width='22'
                    height='24'
                    viewBox='0 0 22 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={styles.icon}
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M21.3331 6.02263V1.22262C21.3361 1.04448 21.3037 0.867835 21.2384 0.705519C21.1731 0.543203 21.0765 0.399286 20.9556 0.284217C20.8348 0.16918 20.6928 0.0858089 20.5399 0.0401474C20.3869 -0.00551397 20.2269 -0.0123222 20.0713 0.0202161L7.30874 2.41182C7.05271 2.45488 6.81934 2.60121 6.65213 2.82355C6.48492 3.04588 6.39529 3.32904 6.39995 3.62023V15.0431C5.58655 14.5147 4.64091 14.3031 3.70971 14.441C2.77851 14.579 1.91379 15.0587 1.24965 15.8059C0.585518 16.5531 0.159088 17.5259 0.0365023 18.5735C-0.0860836 19.6211 0.102025 20.685 0.571653 21.6C1.04128 22.5151 1.76618 23.2303 2.63393 23.6346C3.50168 24.039 4.46377 24.1099 5.371 23.8364C6.27823 23.5629 7.07988 22.9603 7.65164 22.122C8.22339 21.2837 8.53329 20.2565 8.53326 19.1999V9.41504L19.1998 7.41584V12.6418C18.3865 12.1135 17.4409 11.9019 16.5097 12.0398C15.5786 12.1777 14.7139 12.6574 14.0497 13.4045C13.3856 14.1516 12.9591 15.1243 12.8364 16.1719C12.7138 17.2194 12.9018 18.2832 13.3713 19.1983C13.8408 20.1134 14.5656 20.8287 15.4332 21.2332C16.3008 21.6376 17.2629 21.7087 18.1701 21.4354C19.0773 21.1622 19.8791 20.5597 20.451 19.7216C21.0228 18.8835 21.3329 17.8565 21.3331 16.7999V6.02263Z'
                        fill='#C5C5C5'
                    />
                </svg>
            </div>

            <div
                className={styles.iconContainer}
                onClick={() => handleIconClick("/shop")}
            >
                <svg
                    width='27'
                    height='24'
                    viewBox='0 0 27 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={styles.icon}
                >
                    <path
                        d='M13.5 21H4.5V15H13.5M27 15V12L25.5 4.5H1.5L0 12V15H1.5V24H16.5V15H22.5V24H25.5V15M25.5 0H1.5V3H25.5V0Z'
                        fill='#C5C5C5'
                    />
                </svg>
            </div>

            <div
                className={styles.iconContainer}
                onClick={() => handleIconClick("/mypage")}
            >
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={styles.icon}
                >
                    <path
                        d='M9.88084 0C8.38338 0 6.94725 0.594865 5.88838 1.65373C4.82951 2.7126 4.23465 4.14873 4.23465 5.6462C4.23465 7.14366 4.82951 8.57979 5.88838 9.63866C6.94725 10.6975 8.38338 11.2924 9.88084 11.2924C11.3783 11.2924 12.8144 10.6975 13.8733 9.63866C14.9322 8.57979 15.527 7.14366 15.527 5.6462C15.527 4.14873 14.9322 2.7126 13.8733 1.65373C12.8144 0.594865 11.3783 0 9.88084 0ZM2.8358 12.7039C2.464 12.7023 2.09553 12.7741 1.75155 12.9152C1.40757 13.0563 1.09485 13.264 0.831353 13.5263C0.567857 13.7886 0.358772 14.1004 0.216104 14.4437C0.0734368 14.7871 -3.76441e-06 15.1552 1.44721e-10 15.527C1.44721e-10 17.914 1.17582 19.7137 3.01366 20.8867C4.82326 22.0399 7.26242 22.5848 9.88084 22.5848C11.2289 22.5848 12.5677 22.2989 13.6946 21.7948C14.8215 21.2907 15.7457 20.5641 16.289 19.7239C16.8323 18.8838 17.0269 17.9567 16.826 17.027C16.6252 16.0974 15.9627 15.2643 15.0667 14.8498C14.1707 14.4352 13.0796 14.4877 12.3296 14.9297C11.5796 15.3717 11.296 16.0774 11.5397 16.7781C11.7834 17.4789 12.5236 17.8901 13.2971 17.8901C14.5862 17.8901 15.527 17.1579 15.527 16.3026C15.527 15.7472 15.1579 15.2929 14.527 15.2929H9.88084C9.24993 15.2929 8.89084 15.7472 8.89084 16.3026C8.89084 16.8579 9.24993 17.3122 9.88084 17.3122C10.9443 17.3122 11.7026 16.5531 11.7026 15.6462C11.7026 14.9015 10.9443 14.1463 9.88084 14.1463C8.76379 14.1463 7.94413 14.7755 7.94413 15.6462C7.94413 16.3292 8.32858 16.9788 8.89788 17.4481C9.46717 17.9173 10.264 17.8918 10.8085 17.4015C11.3529 16.9113 11.352 16.156 10.8085 15.6659C10.264 15.1757 9.46717 15.1501 8.89788 15.6208C8.32858 16.0915 7.94413 16.7381 7.94413 17.4313C7.94413 18.5869 8.76379 19.2075 9.88084 19.2075C10.9443 19.2075 11.7026 18.4484 11.7026 17.5415C11.7026 16.8014 10.9443 16.068 9.88084 16.068C8.76379 16.068 7.94413 16.7973 7.94413 17.5415C7.94413 18.2677 8.22848 18.9521 8.67123 19.4418C9.11516 19.9317 9.83044 20.0515 10.5215 19.7489C11.2125 19.4464 11.3442 18.5665 10.9462 17.9735C10.5482 17.3805 9.66839 17.2483 9.03927 17.5257C8.41015 17.8032 8.16809 18.6258 8.5372 19.0452C8.90656 19.4647 9.86764 19.7111 10.7293 19.4581C11.591 19.2052 12.4268 18.6679 13.0375 17.9742C13.6482 17.2806 13.9359 16.3861 13.8808 15.5222C13.8241 14.6583 13.4277 13.9148 12.7554 13.4366C12.083 12.9583 11.0972 12.7491 10.1604 12.9606C9.22362 13.1721 8.47784 13.7735 8.47016 14.6423L8.89084 14.6578V15.2929L9.88084 15.2929C10.4476 15.2929 10.8827 15.728 10.8827 16.3026L10.8262 15.2929C11.6823 13.2044 14.1355 12.3227 15.1348 12.4051C16.0148 13.2616 16.7038 12.5198 16.7793 11.6053V13.4658V13.8872'
                        fill='#C5C5C5'
                    />
                </svg>
            </div>
        </div>
    );
};

export default NavBar;
