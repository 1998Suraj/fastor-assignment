import React from "react";
import "./Header.css"; // Make sure to import the CSS file

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Pre Order from</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">Connaught Place</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
