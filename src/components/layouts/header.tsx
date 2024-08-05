import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="flex py-4 px-8 items-center border-b border-b-input shadow-sm justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} width={30} className="rounded-md" />
        <h2 className="text-primary font-bold text-2xl">Tasktis</h2>
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
