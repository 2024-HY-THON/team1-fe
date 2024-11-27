import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from '../pages/Login'

export default function Router() {
    return (
        <BrowserRouter>
            <Link to='/login'>
                login page
            </Link>

            <Routes>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}