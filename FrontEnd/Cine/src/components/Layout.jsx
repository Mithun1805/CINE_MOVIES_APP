
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./forms/Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      {/* Page content changes here */}
      <Outlet />
    </>
  );
}

export default Layout;

