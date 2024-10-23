// AllProducts Component with Dark Theme Enhancements and Sorting
import React, { useState, useEffect } from "react";
import { getInactiveProducts } from "../../services/productApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllProducts.css"; // Import custom CSS for additional styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faToggleOn,
  faToggleOff,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { activateProduct } from "../../services/productApiService";

function InactiveProductComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await getInactiveProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];
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
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
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

  const productActivate = async (e) => {
    const productId =
      e.target.parentElement.parentElement.children[0].innerText;
    try {
      await activateProduct(productId);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="all-products-container">
      <div className="container mt-4">
        <div className="card bg-black text-white">
          <div className="card-body">
            <h2 className="text-center mb-4">Review Inactive Products</h2>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control bg-secondary text-white border-0"
                placeholder="Search by product name, ID, or vendor ID"
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
                      onClick={() => requestSort("name")}
                      style={{ cursor: "pointer" }}
                    >
                      Name <FontAwesomeIcon icon={getSortIcon("name")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("price")}
                      style={{ cursor: "pointer" }}
                    >
                      Price <FontAwesomeIcon icon={getSortIcon("price")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("quantity")}
                      style={{ cursor: "pointer" }}
                    >
                      Quantity{" "}
                      <FontAwesomeIcon icon={getSortIcon("quantity")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("stock")}
                      style={{ cursor: "pointer" }}
                    >
                      Stock <FontAwesomeIcon icon={getSortIcon("stock")} />
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort("vendorId")}
                      style={{ cursor: "pointer" }}
                    >
                      Vendor ID{" "}
                      <FontAwesomeIcon icon={getSortIcon("vendorId")} />
                    </th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>{product.stock}</td>
                      <td>{product.vendorId}</td>
                      <td className="text-center">
                        {product.isActive ? (
                          <button className="btn btn-outline-danger btn-sm same-width-btn">
                            <FontAwesomeIcon icon={faToggleOn} /> Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={productActivate}
                            className="btn btn-outline-success btn-sm same-width-btn"
                          >
                            <FontAwesomeIcon icon={faToggleOff} /> Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InactiveProductComponent;
