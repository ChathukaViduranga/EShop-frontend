// AllCustomer.js
import React, { useState, useEffect } from "react";
import { getInactiveCustomers } from "../../services/userApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllCustomer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faToggleOn,
  faToggleOff,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { activateCustomer } from "../../services/userApiService";

function CustomerReviewComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch customers from the API
  const getCustomers = async () => {
    try {
      const response = await getInactiveCustomers();
      console.log(response.data);
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const sortedCustomers = React.useMemo(() => {
    let sortableCustomers = [...customers];
    if (sortConfig.key !== null) {
      sortableCustomers.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];

        // Ensure that 'id' is handled as a string for comparison
        if (sortConfig.key === "id") {
          aKey = aKey.toString().toLowerCase();
          bKey = bKey.toString().toLowerCase();
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
    return sortableCustomers;
  }, [customers, sortConfig]);

  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Functions to handle activation and deactivation
  const handleActivate = async (id) => {
    const customerId = id;
    try {
      await activateCustomer(customerId);
      getCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivate = (customerId) => {
    // Implement deactivation logic here
    console.log(`Deactivating customer with ID: ${customerId}`);
    // Example: Call an API to deactivate the customer and update the state
  };

  return (
    <div className="all-customers-container">
      <div className="container mt-4">
        <div className="card bg-black text-white">
          <div className="card-body">
            <h2 className="text-center mb-4">Customer Review</h2>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control bg-secondary text-white border-0"
                placeholder="Search by first name, last name, email, or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary search-button-spacing"
                  type="button"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
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
                      ID <FontAwesomeIcon icon={getSortIcon("id")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("email")}
                      style={{ cursor: "pointer" }}
                    >
                      Email <FontAwesomeIcon icon={getSortIcon("email")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("firstName")}
                      style={{ cursor: "pointer" }}
                    >
                      First Name{" "}
                      <FontAwesomeIcon icon={getSortIcon("firstName")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("lastName")}
                      style={{ cursor: "pointer" }}
                    >
                      Last Name{" "}
                      <FontAwesomeIcon icon={getSortIcon("lastName")} />
                    </th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.email}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td className="text-center">
                        {customer.isActive ? (
                          <button
                            className="btn btn-outline-danger btn-sm same-width-btn"
                            onClick={() => handleDeactivate(customer.id)}
                          >
                            <FontAwesomeIcon icon={faToggleOn} /> Deactivate
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success btn-sm same-width-btn"
                            onClick={() => handleActivate(customer.id)}
                          >
                            <FontAwesomeIcon icon={faToggleOff} /> Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="text-center mt-3">
                  No customers found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviewComponent;
