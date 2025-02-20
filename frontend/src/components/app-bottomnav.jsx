import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

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

function BottomNav({ handleCreate }) {
  const [selected, setSelected] = useState("");
  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setSelected("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {selected ? (
        <nav
          ref={navRef}
          className={`fixed bottom-0 left-0 right-0 z-50 bg-black text-white border-t border-neutral-700 ${selected === "" ? "animate-slide-down" : "animate-slide-up"}`}
        >
          <div className="flex items-center justify-center grid grid-cols-1 border-t border-neutral-700 py-4">
            {createItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => {
                  handleCreate(item.type);
                  setSelected("");
                }}
                className="p-2 bg-transparent text-white border border-none hover:bg-neutral-800 cursor-pointer"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </nav>
      ) : (
        <nav ref={navRef} className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white border-t border-neutral-700">
          <div className="flex items-center justify-center mx-auto py-2 border-t border-neutral-700 py-5">
            {navItems.map((item, index) =>
              item.type === "link" ? (
                <Link
                  key={index}
                  to={item.href}
                  className="flex flex-col items-center justify-center mx-4"
                >
                  <item.icon className="w-6 h-6" />
                </Link>
              ) : (
                <Link
                  key={index}
                  onClick={() =>
                    setSelected(selected === item.name ? "" : item.name)
                  }
                  className="flex flex-col items-center justify-center mx-4"
                >
                  <item.icon className="w-6 h-6" />
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </>
  );
}

BottomNav.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default BottomNav;
