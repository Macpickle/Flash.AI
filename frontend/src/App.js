import { BrowserRouter, Route, Routes } from 'react-router-dom';

// routes
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Registry/Login';
import Register from './pages/Registry/Register';
import Settings from './pages/Settings';

//util
import Authentication from './util/Authentication';

import './components/stylesheets/index.css';

// main router component
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<Authentication callbackURL = {'/login'}/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/settings" element={<Settings/>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
