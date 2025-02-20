import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LuMoon, LuSun } from "react-icons/lu";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { Bell, Users as GroupsIcon } from "lucide-react";
import PropTypes from "prop-types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

// all navigation items
const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard", type: "link" },
  { name: "Groups", icon: GroupsIcon, href: "/groups", type: "link" },
  { name: "Notifications", icon: Bell, href: "/notifications", type: "link" },
  { name: "Create", icon: PlusCircle, type: "dropdown" },
  { name: "Settings", icon: Settings, href: "/settings", type: "link" },
];

// items for create dropdown
const createItems = [
  { name: "Document", type: "document" },
  { name: "Folder", type: "folder" },
];

// sample user for now
const user = {
  username: "John Doe",
  image: "https://blackwonder.tf/attachments/1673671146282-png.31249/",
};

function SideNav({ handleCreate, handleCollapse, isCollapsed, screenSize }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="z-50 flex-shrink-0">
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
                onClick={() => handleCollapse()}
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
            {!isCollapsed && <span className="text-lg min-w-[100px]">{user.username}</span>}
          </div>
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-2">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-200 hover:bg-neutral-800"
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                ) : item.type === "button" ? (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    className="flex items-center justify-center space-x-2 text-gray-200 hover:bg-neutral-800"
                    onClick={() => handleCreate(item.type)}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Button>
                ) : (
                  item.type === "dropdown" && (
                    <Select
                      key={item.name}
                      className="border border-none"
                      onValueChange={(value) => handleCreate(value.type)}
                    >
                      <SelectTrigger className="border border-none dark:border-gray-700 hover:bg-neutral-800">
                        <div className="flex items-center justify-center space-x-2 text-gray-200 hover:bg-neutral-800">
                          <item.icon className="h-5 w-5" />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-gray-700 dark:border-gray-700 rounded-lg text-white">
                        {createItems.map((createItem) => (
                          <SelectItem
                            key={createItem.name}
                            value={createItem}
                            className="hover:bg-neutral-800 cursor-pointer"
                          >
                            {createItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                ),
              )}
            </nav>
          </ScrollArea>
          <div className="p-4 flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <LuSun className="h-5 w-5" />
              ) : (
                <LuMoon className="h-5 w-5" />
              )}
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
    </div>
  );
}

SideNav.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleCollapse: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default SideNav;
