// SideNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBoxOpen,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./UsersSideNavbar.css"; // Import custom CSS for styling

function UsersSideNavbar() {
  return (
    <div className="side-navbar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <span className="nav-text">Add User</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/all-users"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faListAlt} size="2x" />
            <span className="nav-text">All Users</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UsersSideNavbar;
