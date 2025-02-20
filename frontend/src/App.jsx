import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Quiz from "./routes/Quiz";
import Dashboard from "./routes/Dashboard";
import Layout from "./layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/app-create";
import SideNav from "@/components/app-sidenav";
import BottomNav from "@/components/app-bottomnav";
import { useEffect, useState } from "react";

function App() {
  const [isCreateOpen, setIsCreateOpen] = useState("");
  const [screenSize, setScreenSize] = useState("large");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCreate = (type) => {
    setIsCreateOpen(type);
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // handle screen resize, collapse sidebar on small and medium screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setScreenSize("medium");
      } else {
        setIsCollapsed(false);
        setScreenSize("large");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className = {`${screenSize === 'small' ? 'pb-16' : 'pb-0'}`}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="*"
              element={
                <div className = "w-full flex">
                  { screenSize !== "small" ? (
                    <SideNav 
                      handleCreate={handleCreate} 
                      handleCollapse={handleCollapse} 
                      isCollapsed={isCollapsed} 
                      screenSize={screenSize}/>
                  ) : (
                    <BottomNav handleCreate={handleCreate} />
                  )}
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard handleCreate={handleCreate}/>} />
                      <Route path="/quiz" element={<Quiz />} />
                    </Routes>
                  </div>
              }
            />
          </Routes>
        </Layout>
        {isCreateOpen !== "" && (
          <Create type={isCreateOpen} onClose={() => setIsCreateOpen("")} />
        )}
      </div>
    </Router>
  );
}

export default App;
