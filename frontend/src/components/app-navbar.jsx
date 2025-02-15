import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
          <img src="./assets/logo.png" alt="Flash.AI" className="w-12 h-12" />
          <span className="text-xl font-bold text-primary">Flash.AI</span>
        </a>
        <nav className="hidden md:flex space-x-4">
          <a
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button href="/register" className="hover:bg-secondary">
              Sign up
            </Button>
          </Link>
          <Button variant="icon" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <LuSun className="w-5 h-5" />
            ) : (
              <LuMoon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
