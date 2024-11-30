import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";
import Title from "../assets/splash-title.svg"; 
import Subtitle from "../assets/splash-subtitle.svg"; 
import Tree from "../assets/splash-img.svg"; 

function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <img src={Title} alt="Title" className="splash-title" />
            <img src={Subtitle} alt="Subtitle" className="splash-subtitle" />
            <img src={Tree} alt="Tree" className="splash-image" />
        </div>
    );
}

export default Splash;