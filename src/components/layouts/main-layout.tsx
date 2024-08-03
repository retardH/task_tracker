import Header from "./header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
