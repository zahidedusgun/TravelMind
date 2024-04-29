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
          <a href="/">
            <img src={logo} alt="TravelMind" height="120px" />
          </a>

          <nav>
            <NavLink to="/">Anasayfa</NavLink>
            <NavLink to="chat">Seyahat Planını Oluştur</NavLink>
            <NavLink to="help">Bizim Hakkımızda</NavLink>
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
