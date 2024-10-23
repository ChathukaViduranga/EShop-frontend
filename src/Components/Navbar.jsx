//reponsive nav bar

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPermissions } from "../services/userApiService";
function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const [productPermission, setProductPermission] = useState(false);
  const [customerPermission, setCustomerPermission] = useState(false);
  const [orderPermission, setOrderPermission] = useState(false);
  const [userPermission, setUserPermission] = useState(false);
  useEffect(() => {
    const fetchPermissions = async () => {
      // Await each permission check and set the state accordingly
      const productPerm = await getUserPermissions("productpage");
      const customerPerm = await getUserPermissions("customerpage");
      const orderPerm = await getUserPermissions("orderpage");
      const userPerm = await getUserPermissions("userpage");

      setProductPermission(productPerm);
      setCustomerPermission(customerPerm);
      setOrderPermission(orderPerm);
      setUserPermission(userPerm);
    };

    fetchPermissions(); // Invoke the async function
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          E-Shop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                href="/"
              >
                Home
              </a>
            </li>
            {productPermission && (
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    pathname === "/product" ? "active" : ""
                  }`}
                  href="/product"
                >
                  Products
                </a>
              </li>
            )}
            {customerPermission && (
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    pathname === "/customer" ? "active" : ""
                  }`}
                  href="/customer"
                >
                  Customers
                </a>
              </li>
            )}
            {orderPermission && (
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    pathname === "/order" ? "active" : ""
                  }`}
                  href="/order"
                >
                  Orders
                </a>
              </li>
            )}

            {userPermission && (
              <li className="nav-item">
                <a
                  className={`nav-link ${pathname === "/user" ? "active" : ""}`}
                  href="/user"
                >
                  Users
                </a>
              </li>
            )}
            <li className="nav-item">
              <a
                className={`nav-link ${
                  pathname === "/profile" ? "active" : ""
                }`}
                href="/profile"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
