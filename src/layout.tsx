import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import UserLabel from "./components/UserLabel";
import { Container } from "@mui/material";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container className="flex flex-col items-center">
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
    </Container>
  );
};

export default Layout;
