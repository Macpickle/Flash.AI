import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LuMoon, LuSun } from "react-icons/lu";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "@/utils/contexts/ThemeContext";

const navbarItems = [
  { title: "Home", href: "#home" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export default function AppNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-4 transition-colors duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <img src="./assets/logo.png" alt="Flash.Ai" className="w-12 h-12" />
          <span className="text-xl font-bold text-primary">
            F<Zap className="h-4 w-4 text-primary inline-block" />
            ash.Ai
          </span>
        </a>
        <nav className="hidden md:flex space-x-4">
          {navbarItems.map((item) => (
            <Link key={item.title} to={item.href} className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button href="/register">
              Sign up
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <LuMoon className="h-5 w-5" /> : <LuSun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
