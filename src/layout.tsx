import React, { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/logo.png"
        alt="test-picture"
        width={263}
        height={29}
        className="mt-4 self-center"
      />
      {children}
    </div>
  );
};

export default Layout;
