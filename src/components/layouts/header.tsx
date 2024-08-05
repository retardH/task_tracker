import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="flex p-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={logo} width={45} className="rounded-md" />
        <h2 className="text-primary font-bold text-2xl">
          Task Tracking Management System
        </h2>
      </div>
      {/* <div>Profile</div> */}
      <Avatar>
        <AvatarImage
          width={"80px"}
          src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
          alt="@shadcn"
        />
        <AvatarFallback>HHA</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
