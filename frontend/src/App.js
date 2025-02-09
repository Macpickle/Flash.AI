import { BrowserRouter, Route, Routes } from 'react-router-dom';

// routes
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Registry/Login';
import Register from './pages/Registry/Register';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';

//util
import Authentication from './util/Authentication';

import { useEffect } from 'react';

import './components/stylesheets/index.css';

// main router component
function App() {
  const changeTheme = () => { 
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.style.setProperty('--navbar', '#343a40');
      document.documentElement.style.setProperty('--background-color', '#2c2f33');
      document.documentElement.style.setProperty('--card', '#2a2d30');
      document.documentElement.style.setProperty('--text-color', '#FFFFFF');
    } else {
      document.documentElement.style.setProperty('--navbar', '#f8f9fa');
      document.documentElement.style.setProperty('--background-color', '#FFF');
      document.documentElement.style.setProperty('--card', '#FFF');
      document.documentElement.style.setProperty('--text-color', '#333333');
    }
  }

  useEffect(() => {
    changeTheme();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<Authentication callbackURL = {'/login'}/>}>
            <Route path="/home" element={<Home changeTheme={changeTheme}/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/quiz/:id" element={<Quiz/>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
