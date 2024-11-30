import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import Main from "../pages/main";
import MyPage from "../pages/MyPage";
import ChangePassword from '../pages/menu/ChangePassword'
import ChangeName from '../pages/menu/ChangeName'
import ChangeAddress from '../pages/menu/ChangeAddress'

export default function Router() {
    const isAuthenticated = () => {
        return !!localStorage.getItem("token");
    };

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <RouterContent isAuthenticated={isAuthenticated} ProtectedRoute={ProtectedRoute} />
        </BrowserRouter>
    );
}

function RouterContent({ ProtectedRoute }) {
    const location = useLocation();
    const hideNavRoutes = ["/login", "/register"];

    return (
        <>
            {!hideNavRoutes.includes(location.pathname) && (
                <nav>
                    <Link to="/shop">Shop</Link>
                    <Link to="/main">Main</Link>
                    <Link to="/mypage">My Page</Link>
                </nav>
            )}

            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/ch-pass" element={<ChangePassword />} />
                <Route exact path="/ch-na" element={<ChangeName />} />
                <Route exact path="/ch-add" element={<ChangeAddress/>} />

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
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}
