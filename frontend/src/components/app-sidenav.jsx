import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LuMoon, LuSun } from "react-icons/lu";
import { ChevronLeft, ChevronRight, Home, Settings, LogOut, PlusCircle } from 'lucide-react';
import { Bell, Users as GroupsIcon } from 'lucide-react';
import BottomNav from "@/components/app-bottomnav";

// all navigation items
const navItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Groups", icon: GroupsIcon, href: "/groups" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Create", icon: PlusCircle, href: "/create" },
    { name: "Settings", icon: Settings, href: "/settings" },
];

// sample user for now
const user = {
    username: "John Doe",
    image: "https://blackwonder.tf/attachments/1673671146282-png.31249/",
};

function SideNav() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [screenSize, setScreenSize] = useState("large");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
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
        <>
            {screenSize === "small" ? (
                <BottomNav />
            ) : (
                <div
                    className={`flex flex-col bg-black border-r sticky border-gray-700 text-white h-screen ${
                        isCollapsed ? "w-16" : "w-64"
                    } transition-all duration-300 ease-in-out`}
                >
                    {screenSize === "large" && (
                        <div className="flex justify-end p-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {isCollapsed ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    <ChevronLeft className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    )}
                    <div className="flex items-center p-4 space-x-2">
                        <img 
                            src={user.image} 
                            alt="User" 
                            className="w-8 h-8 rounded-full object-cover" 
                        />
                        {!isCollapsed && <span className="text-lg">{user.username}</span>}
                    </div>
                    <ScrollArea className="flex-grow">
                        <nav className="space-y-2 p-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-200 hover:bg-neutral-800"
                                >
                                    <item.icon className="h-5 w-5" />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            ))}
                        </nav>
                    </ScrollArea>
                    <div className="p-4 flex flex-col items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-full flex items-center justify-center space-x-2 text-gray-200 hover:bg-neutral-800"
                            aria-label="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                            {!isCollapsed && <span>Logout</span>}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SideNav;
