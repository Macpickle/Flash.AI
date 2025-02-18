import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout from "./layout";
import Dashboard from "./routes/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/app-create";
import { useState } from "react";

function App() {
  const [isCreateOpen, setIsCreateOpen] = useState("");

  const handleCreate = (type) => {
    setIsCreateOpen(type);
  };

  return (
    <Router>
      <div>
        {isCreateOpen !== "" && <Create type={isCreateOpen} onClose={() => setIsCreateOpen("")} /> }
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard handleCreate={handleCreate} />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
