// SideNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import "./ProfileSideNav.css"; // Import custom CSS for styling

function ProfileSildeNav() {
  return (
    <div className="side-navbar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span className="nav-text">Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/reset"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faKey} size="2x" />
            <span className="nav-text">password rest</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ProfileSildeNav;
