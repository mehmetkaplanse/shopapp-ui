import React from "react";

const NoSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-secondary h-[calc(100vh-51px)]">{children}</div>
  );
};

export default NoSidebarLayout;
