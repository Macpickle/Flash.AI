import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Quiz from "./routes/Quiz";
import Dashboard from "./routes/Dashboard";
import Layout from "./layout";
import Create from "./components/app-create";
import SideNav from "@/components/app-sidenav";
import BottomNav from "@/components/app-bottomnav";
import Settings from "@/routes/Settings";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import Theme from "@/app/Theme/Theme";

const validRoutes = [
  "/dashboard",
  "/quiz",
  "/settings",
  "/",
  "/notifications",
  "/profile",
  "/groups",
];

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
          <Theme />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Register />} />
              
              <Route
                path="*"
                element={
                  <div className={`${screenSize === 'small' ? 'pb-16' : 'pb-0'}`}>
                    <div className="w-full flex">
                      {
                        validRoutes.includes(window.location.pathname) ? (
                          screenSize !== "small" ? (
                            <SideNav
                              handleCreate={handleCreate}
                              handleCollapse={handleCollapse}
                              isCollapsed={isCollapsed}
                              screenSize={screenSize}
                            />
                          ) : (
                            <BottomNav handleCreate={handleCreate} />
                          )
                        ) : null
                      }
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard handleCreate={handleCreate} />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Layout>
          {isCreateOpen !== "" && (
            <Create type={isCreateOpen} onClose={(success) => {{
              setIsCreateOpen("");
              if (success) {
                toast.success("Document created successfully");
              }
            }}} />
          )}

          <Toaster />
        </Router>
  );
}

export default App;
