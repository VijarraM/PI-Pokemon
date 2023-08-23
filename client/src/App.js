import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/Home/LandingPage';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
