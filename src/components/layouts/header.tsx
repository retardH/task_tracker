import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex py-4 px-8 items-center border-b border-b-input shadow-sm justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} width={30} className="rounded-md" />
          <h2 className="text-primary font-bold text-2xl">Tasktis</h2>
        </div>
        <div className="flex items-start gap-4">
          <Button variant="link" size="default" className="px-0">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              My Tasks
            </NavLink>
          </Button>
          <Button variant="link" size="default" className="px-0">
            <NavLink
              to="/all-tasks"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              All Tasks
            </NavLink>
          </Button>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-sm font-medium">Htet Zarni</h4>
              <p className="text-xs font-medium text-foreground">HRIS Team</p>
            </div>
            <Avatar>
              <AvatarImage
                src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                alt="@shadcn"
              />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="justify-center gap-2">
            <ExitIcon />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
