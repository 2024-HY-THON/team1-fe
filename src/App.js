import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import ChangeName from "./pages/menu/ChangeName"
import ChangePassword from "./pages/menu/ChangePassword"
import ChangeAddress from "./pages/menu/ChangeAddress"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<MyPage />} />
          <Route path="/mypage/change-name" element={<ChangeName />} />
          <Route path="/mypage/change-password" element={<ChangePassword />} />
          <Route path="/mypage/change-address" element={<ChangeAddress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
