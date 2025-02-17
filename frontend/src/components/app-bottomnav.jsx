import { Home, Settings, PlusCircle } from 'lucide-react';
import { Bell, Users as GroupsIcon } from 'lucide-react';

// all navigation items
const navItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Groups", icon: GroupsIcon, href: "/groups" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Create", icon: PlusCircle, href: "/create" },
    { name: "Settings", icon: Settings, href: "/settings" },
];

function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white border-t border-gray-700">
            <div className="flex items-center justify-around max-w-[400px] mx-auto py-2">
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="flex flex-col items-center justify-center"
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs">{item.name}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
}

export default BottomNav;