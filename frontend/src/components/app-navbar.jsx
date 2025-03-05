import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navbarItems = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export default function AppNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <span className="text-xl font-bold text-primary">Flash.Ai</span>
        </a>
        <nav className="hidden md:flex space-x-4">
          {navbarItems.map((item) => (
            <a key={item.title} href={item.href}>
              <button className="text-gray-900 dark:text-gray-100 transition-colors hover:text-primary dark:hover:text-primary">
                {item.title}
              </button>
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button href="/register">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
