import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function Router() {
    return (
        <BrowserRouter>
            <Link to='/login'>
                login page
            </Link>
            <Link to={"/register"}>
                register page
            </Link>

            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path={"/register"} element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    );
}