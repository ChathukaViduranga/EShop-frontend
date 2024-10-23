// OrderTable.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderTable.css"; // Import custom CSS for additional styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function OrderTable({ orders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("orderId");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  // Sorting logic
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        let aKey, bKey;

        if (sortConfig.key === "itemId") {
          aKey = a.items.map((item) => item.productId).join(", ");
          bKey = b.items.map((item) => item.productId).join(", ");
        } else if (sortConfig.key === "status") {
          aKey = a.status;
          bKey = b.status;
        } else {
          aKey = a[sortConfig.key];
          bKey = b[sortConfig.key];
        }

        if (typeof aKey === "string") {
          aKey = aKey.toLowerCase();
          bKey = bKey.toLowerCase();
        }

        if (aKey < bKey) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  // Search logic
  const filteredOrders = sortedOrders.filter((order) => {
    switch (searchField) {
      case "orderId":
        return order.id.toLowerCase().includes(searchTerm.toLowerCase());
      case "itemId":
        return order.items.some((item) =>
          item.productId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "customerId":
        return order.userId.toLowerCase().includes(searchTerm.toLowerCase());
      case "status":
        return order.status.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? faSortUp : faSortDown;
    } else {
      return faSort;
    }
  };

  const rowClickHandler = (id) => {
    navigate(`/order/${id}`);
  };

  return (
    <div className="order-table-container">
      <div className="container mt-4">
        <div className="card bg-black text-white">
          <div className="card-body">
            <h2 className="text-center mb-4">Manage Orders</h2>
            <div className="input-group mb-3">
              <select
                className="form-select bg-secondary text-white border-0"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                style={{ maxWidth: "150px" }}
              >
                <option value="orderId">Order ID</option>
                <option value="itemId">Item ID</option>
                <option value="customerId">Customer ID</option>
                <option value="status">Status</option>
              </select>
              <input
                type="text"
                className="form-control bg-secondary text-white border-0"
                placeholder={`Search by ${searchField}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-secondary search-button-spacing"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      onClick={() => requestSort("id")}
                      style={{ cursor: "pointer" }}
                    >
                      Order ID <FontAwesomeIcon icon={getSortIcon("id")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("userId")}
                      style={{ cursor: "pointer" }}
                    >
                      Customer ID{" "}
                      <FontAwesomeIcon icon={getSortIcon("userId")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("itemId")}
                      style={{ cursor: "pointer" }}
                    >
                      Items (Product IDs){" "}
                      <FontAwesomeIcon icon={getSortIcon("itemId")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("status")}
                      style={{ cursor: "pointer" }}
                    >
                      Order Status{" "}
                      <FontAwesomeIcon icon={getSortIcon("status")} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="pe-auto"
                        onClick={() => rowClickHandler(order.id)}
                      >
                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>
                          {order.items.map((item) => item.productId).join(", ")}
                        </td>
                        <td>{order.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
