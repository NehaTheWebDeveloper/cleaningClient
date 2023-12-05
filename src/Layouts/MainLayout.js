import React from "react";
import Header from "./Header";
import SideNavLayout from "./SideNavLayout";

function MainLayout({ children }) {
  return (
    <div className="flex  h-full  z-0 overflow-hidden ">
      <div className=" top-0 h-full xs:absolute z-50 md:static ">
        <SideNavLayout className="h-full" />
      </div>

      <div className="flex-col w-full h-full overflow-hidden">
        <Header />
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}


export default MainLayout;
