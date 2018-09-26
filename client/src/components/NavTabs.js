import React from "react";

const NavTabs = props => (
  <div>
    <nav>
      <div className="nav-wrapper">
      <a href="/" class="brand-logo">Disaster Map</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down" id="nav-mobile">
          <li className="nav-item">
            <a
              onClick={() => props.handlePageChange("Home")}
              className={
                props.currentPage === "Home" ? "nav-link active" : "nav-link"
              }>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => props.handlePageChange("About")}
              className={
                props.currentPage === "About" ? "nav-link active" : "nav-link"
              }>
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => props.handlePageChange("UserAccount")}
              className={
                props.currentPage === "UserAccount" ? "nav-link active" : "nav-link"
              }>
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <ul className="sidenav" id="mobile-demo">
      <li className="nav-item">
        <a
          onClick={() => props.handlePageChange("Home")}
          className={props.currentPage === "Home" ? "nav-link active" : "nav-link"}>
            Home
        </a>
      </li>
      <li className="nav-item">
        <a
          onClick={() => props.handlePageChange("About")}
          className={props.currentPage === "About" ? "nav-link active" : "nav-link"}>
            About
        </a>
      </li>
      <li className="nav-item">
        <a
          onClick={() => props.handlePageChange("UserAccount")}
          className={props.currentPage === "UserAccount" ? "nav-link active" : "nav-link"}>
            Account
        </a>
      </li>
    </ul>
    <sidebar />
  </div>
);

export default NavTabs;
