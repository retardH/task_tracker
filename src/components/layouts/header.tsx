import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { clearLocalStorage, getAuthInfo } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = getAuthInfo();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const logout = () => {
    clearLocalStorage();
    navigate("/login", { replace: true });
  };
  return (
    <header className="flex items-center justify-between border-b border-b-input bg-primary px-4 py-4 shadow-sm md:px-8">
      <div className="flex items-center gap-10">
        <div className="hidden items-center gap-2 md:flex">
          <img src={logo} width={30} className="rounded-md" />
          <h2 className="text-lg font-bold text-primary text-white md:text-2xl">
            Smart Task Tracker
          </h2>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="md:hidden" asChild>
            <Button size="icon" variant="secondary" className="md:hidden">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" aria-describedby={undefined}>
            <SheetTitle className="sr-only">
              Mobile Navigation Drawer
            </SheetTitle>
            <div className="flex items-center gap-2">
              <img src={logo} width={30} className="rounded-md" />
              <h2 className="text-lg font-bold text-primary md:text-2xl">
                Smart Task Tracker
              </h2>
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <SheetClose asChild>
                <Button
                  variant="link"
                  size="default"
                  className="text-md px-0 text-primary/90 hover:text-primary"
                  onClick={() => {
                    setIsSheetOpen(false);
                  }}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-primary underline" : ""
                    }
                  >
                    My Tasks
                  </NavLink>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="link"
                  size="default"
                  className="text-md px-0 text-primary/90 hover:text-primary"
                  onClick={() => {
                    setIsSheetOpen(false);
                  }}
                >
                  <NavLink
                    to="/all-tasks"
                    className={({ isActive }) =>
                      isActive ? "text-primary underline" : ""
                    }
                  >
                    All Tasks
                  </NavLink>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden items-start gap-4 md:flex">
          <Button
            variant="link"
            size="default"
            className="px-0 text-zinc-200 hover:text-white"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white underline" : ""
              }
            >
              My Tasks
            </NavLink>
          </Button>
          <Button
            variant="link"
            size="default"
            className="px-0 text-zinc-200 hover:text-white"
          >
            <NavLink
              to="/all-tasks"
              className={({ isActive }) =>
                isActive ? "text-white underline" : ""
              }
            >
              All Tasks
            </NavLink>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">
                  {userInfo?.name}
                </h4>
                <h6 className="text-xs text-zinc-200">{userInfo?.staffId}</h6>
              </div>
              <Avatar className="size-10 md:size-12">
                <AvatarImage src="https://gitub.com/cn.png" alt="@shadcn" />
                <AvatarFallback>{userInfo?.name?.[0]}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2" align="start">
            <DropdownMenuItem className="justify-center gap-2" onClick={logout}>
              <ExitIcon />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
