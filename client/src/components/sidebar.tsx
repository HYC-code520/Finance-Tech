import { BarChart3, Share2, Users, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

const sidebarItems = [
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/dashboard",
    isActive: true
  },
  // {
  //   icon: Share2,
  //   label: "Network",
  //   href: "/network"
  // },
  // {
  //   icon: Users,
  //   label: "Users",
  //   href: "/users"
  // },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings"
  }
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-16 bg-gradient-to-b from-slate-900 from-60% to-[#71fdff33] border-r border-white/10 z-40">
      <div className="flex flex-col items-center py-6 space-y-6">
        
        {/* Navigation Items */}
        <nav className="flex flex-col space-y-4">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.href || (item.href === "/dashboard" && location === "/dashboard");
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`
                  group relative flex items-center justify-center w-10 h-10 rounded-lg
                  transition-all duration-200 hover:bg-white/10
                  ${isActive 
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
                data-testid={`sidebar-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex-1" />
        
        {/* User Avatar/Profile */}
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">SS</span>
        </div>
      </div>
    </div>
  );
}