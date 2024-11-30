import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from '../pages/Login'
import Register from '../pages/Register'
import Shop from "../pages/Shop"
import Main from "../pages/main"
import MyPage from '../pages/MyPage'

export default function Router() {
    return (
        <BrowserRouter>
            <Link to='/login'>
                login page
            </Link>
            <Link to={"/register"}>
                register page
            </Link>
            <Link to={"/shop"}>
                shop
            </Link>
            <Link to={"/main"}>
                main
            </Link>
            <Link to={"/mypage"}>
                mypage
            </Link>

            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path={"/register"} element={<Register/>}/>
                <Route exact path={"/shop"} element={<Shop/>}/>
                <Route exact path={"/main"} element={<Main/>}/>
                <Route exact path={"/mypage"} element={<MyPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}