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
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <Navbar />
      {children}
      <Container
        disableGutters
        sx={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <footer>Created by Josh Job © 2024</footer>
      </Container>
    </Container>
  );
};

export default Layout;
