import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Splash from "../pages/Splash";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import Main from "../pages/main";
import MyPage from "../pages/MyPage";
import ChangePassword from "../pages/menu/ChangePassword";
import ChangeName from "../pages/menu/ChangeName";
import ChangeAddress from "../pages/menu/ChangeAddress";

export default function Router() {
    const isAuthenticated = () => {
        return !!localStorage.getItem("token");
    };

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Splash />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/ch-pass" element={<ChangePassword />} />
                <Route exact path="/ch-na" element={<ChangeName />} />
                <Route exact path="/ch-add" element={<ChangeAddress />} />
                <Route
                    exact
                    path="/shop"
                    element={
                        <ProtectedRoute>
                            <Shop />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/main"
                    element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/mypage"
                    element={
                        <ProtectedRoute>
                            <MyPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}