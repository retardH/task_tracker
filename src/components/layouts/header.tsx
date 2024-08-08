import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { clearLocalStorage, getAuthInfo } from "@/lib/utils";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = getAuthInfo();

  const logout = () => {
    clearLocalStorage();
    navigate("/login", { replace: true });
  };
  return (
    <header className="flex items-center justify-between border-b border-b-input bg-primary px-8 py-4 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} width={30} className="rounded-md" />
          <h2 className="text-2xl font-bold text-primary text-white">
            Smart Task Tracker
          </h2>
        </div>
        <div className="flex items-start gap-4">
          <Button variant="link" size="default" className="px-0 text-white">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-amber-400" : "")}
            >
              My Tasks
            </NavLink>
          </Button>
          <Button variant="link" size="default" className="px-0 text-white">
            <NavLink
              to="/all-tasks"
              className={({ isActive }) => (isActive ? "text-amber-400" : "")}
            >
              Employee Tasks
            </NavLink>
          </Button>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src="https://png.pngtree.com/png-vector/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
              alt="@shadcn"
            />
            <AvatarFallback>{userInfo?.name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-2" align="start">
          <h4 className="text-sm font-semibold">{userInfo?.name}</h4>
          <h6 className="text-xs text-muted-foreground">{userInfo?.staffId}</h6>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center gap-2" onClick={logout}>
            <ExitIcon />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
