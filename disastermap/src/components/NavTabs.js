import React from "react";

const NavTabs = props => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Home")}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("About")}
        className={
          props.currentPage === "About" ? "nav-link active" : "nav-link"
        }
      >
        About
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("UserAccount")}
        className={
          props.currentPage === "UserAccount" ? "nav-link active" : "nav-link"
        }
      >
        Account
      </a>
    </li>
  </ul>
);

export default NavTabs;
