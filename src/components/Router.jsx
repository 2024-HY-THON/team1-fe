import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Shop from '../pages/Shop';
import Main from '../pages/main';
import MyPage from '../pages/MyPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path={'/register'} element={<Register />} />
        <Route exact path={'/shop'} element={<Shop />} />
        <Route exact path={'/main'} element={<Main />} />
        <Route exact path={'/mypage'} element={<MyPage />} />
        <Route exact path={'/music'} element={<Music />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
