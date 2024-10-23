// SideNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./CustomerSideNav.css"; // Import custom CSS for styling

function CustomerSideNav() {
  return (
    <div className="side-navbar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/customer"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faListAlt} size="2x" />
            <span className="nav-text">All Customers</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/customer-review"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faCircleExclamation} size="2x" />
            <span className="nav-text">Review</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CustomerSideNav;
