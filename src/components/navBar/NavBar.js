import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <img className="netflix_logo" src="netflix_logo.svg" alt="Netflix logo" />
      <div className="toolbar">
        <ul className="options">
          {navbarItems.map((option) => (
            <li key={option.item} className="option">
              {option.item}
            </li>
          ))}
        </ul>
        <img
          className="avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
        />
      </div>
    </nav>
  );
}

export default NavBar;
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
