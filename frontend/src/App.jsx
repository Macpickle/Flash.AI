import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Quiz from "./routes/Quiz";
import Dashboard from "./routes/Dashboard";
import Layout from "./layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
