import { Link, useLocation } from "react-router-dom";
import { Church, Home, ListCollapse, HandHeart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "หน้าหลัก" },
  { path: "/temples", icon: ListCollapse, label: "วัดทั้งหมด" },
  { path: "/projects", icon: HandHeart, label: "โครงการ" },
    { path: "/fund", icon: HandHeart, label: "กองทุนรวม" },
    { path: "/profile", icon: User, label: "บัญชี" },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-warm">
            <Church className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-primary">ปัจจัย 4.0</h1>
            <p className="text-xs text-muted-foreground">เชื่อมศรัทธาให้โปร่งใส</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
