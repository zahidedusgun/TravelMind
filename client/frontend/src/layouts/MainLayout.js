import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./MainLayout.css";
import logo from "../images/logo.png";

function MainLayout() {
  return (
    <div>
      <div className="main-layout">
        <header>
          <img src={logo} alt="TravelMind" height="170px" />

          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="ask">Create New Plan</NavLink>
            <NavLink to="help">About Us</NavLink>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
