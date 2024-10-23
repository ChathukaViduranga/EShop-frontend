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
  return (
    <div className="side-navbar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <span className="nav-text">Add Product</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/low-stock"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faBoxOpen} size="2x" />
            <span className="nav-text">Low Stock</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faListAlt} size="2x" />
            <span className="nav-text">All Products</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/inactive-products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FontAwesomeIcon icon={faCircleExclamation} size="2x" />
            <span className="nav-text">Inactive Products</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNavbar;
