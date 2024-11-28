import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/main';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
