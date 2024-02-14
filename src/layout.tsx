import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import UserBar from "./components/userBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center shrink-0 grow-0">
      <UserBar />
      <img
        src="/logo.png"
        alt="test-picture"
        width={263}
        height={29}
        className="mt-4 self-center"
      />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
