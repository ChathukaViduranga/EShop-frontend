// SideNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBoxOpen,
  faListAlt,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./SideNavbar.css"; // Import custom CSS for styling

function SideNavbar() {
  const role = localStorage.getItem("role");
  return (
    <div className="side-navbar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <span className="nav-text">All Orders</span>
          </NavLink>
        </li>
        {role === "Administrator" && (
          <>
            <li className="nav-item">
              <NavLink
                to="/cancel-order"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FontAwesomeIcon icon={faBoxOpen} size="2x" />
                <span className="nav-text">Canceled Orders</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideNavbar;
