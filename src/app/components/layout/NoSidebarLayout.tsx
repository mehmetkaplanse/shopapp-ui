import React from "react";

const NoSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-secondary xl:h-[calc(100vh-51px)] h-screen">{children}</div>
  );
};

export default NoSidebarLayout;
