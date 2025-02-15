import Home from './routes/Home'
import Login from './routes/Login';
import Register from './routes/Register';
import Layout from './layout';
import Dashboard from './routes/Dashboard';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
      </div>
    </Router>
  );
}

export default App;