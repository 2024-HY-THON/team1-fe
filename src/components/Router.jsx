import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from '../pages/Login'
import Register from '../pages/Register'
import Shop from "../pages/Shop"

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

            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path={"/register"} element={<Register/>}/>
                <Route exact path={"/shop"} element={<Shop/>}/>
            </Routes>
        </BrowserRouter>
    );
}