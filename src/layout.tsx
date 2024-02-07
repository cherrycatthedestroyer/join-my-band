import React, { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="height-1/5 flex flex-col mt-4">
        <button onClick={() => signOut()} className="bg-black">
          sign out
        </button>
        <img
          src="/logo.png"
          alt="test-picture"
          width={463}
          height={229}
          className="mx-auto scale-75"
        />
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
