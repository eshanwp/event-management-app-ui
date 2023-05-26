import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

const Layout: FC = () => {
     return (
          <>
               <Header />
               <Outlet />
               <Footer />
          </>
     );
};

export default Layout;
