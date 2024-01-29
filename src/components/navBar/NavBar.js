import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <img
          className="netflix_logo navbar-brand"
          src="netflix_logo.svg"
          alt="Netflix logo"
        />
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
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navbarItems.map((option) => (
              <li key={option.item} className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {option.item}
                </a>
              </li>
            ))}
          </ul>
        </div>
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

// <nav classNameName="navbar  navbar-expand-lg">
//   <img classNameName="netflix_logo" src="netflix_logo.svg" alt="Netflix logo" />
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-bs-toggle="collapse"
//     data-bs-target="#navbarTogglerDemo03"
//     aria-controls="navbarTogglerDemo03"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse toolbar " id="navbarTogglerDemo03">
//     <ul classNameName="options navbar-nav">
//       {navbarItems.map((option) => (
//         <li key={option.item} classNameName="option nav-item">
//           <a className="nav-link active" aria-current="page" href="#">
//             {option.item}
//           </a>
//         </li>
//       ))}
//     </ul>
//     <img
//       classNameName="avatar"
//       src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
//       alt="Avatar"
//     />
//   </div>
// </nav>
