import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import UserLabel from "./components/UserLabel";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center noscroll">
      <UserLabel />
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
