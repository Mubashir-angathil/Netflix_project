import React from "react";
import "./Navbar.css"
const NavBarComponent = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        {/* Netflix Logo */}
        <img
          className="netflix_logo navbar-brand"
          src="netflix_logo.svg"
          alt="Netflix logo"
        />

        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler absolute"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navbarItems.map((option) => (
              <li key={option.item} className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  {option.item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;

// Navbar Items Data
const navbarItems = [
  {
    item: "Home",
    route: "",
  },
  {
    item: "Movies",
    route: "",
  },
  {
    item: "Series",
    route: "",
  },
  {
    item: "Cartoons",
    route: "",
  },
];
