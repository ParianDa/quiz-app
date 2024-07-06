import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Questions from './components/Questions';
import Startquiz from './components/Startquiz';
import About from './components/About';
import Support from './components/Support';
import UserLogin from './components/UserLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fireBaseConfig';

function MainApp({ isAuthenticated }) {
  return (
    <Routes>
      {/* Redirect to login if not authenticated */}
      {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      <Route path='/questions' element={<Questions />} />
      <Route path='/startquiz' element={<Startquiz />} />
      <Route path='/about' element={<About />} />
      <Route path='/support' element={<Support />} />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    });

    return () => unsubscribe();
  },[])

  const handleLogin = () => {
    // Perform authentication logic here
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Navbar onlogout={handleLogout} isAuthenticated={isAuthenticated}/>}
        <Routes>
          <Route path="/" element={<UserLogin onLogin={handleLogin} />} />
          <Route path="/*" element={<MainApp isAuthenticated={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
