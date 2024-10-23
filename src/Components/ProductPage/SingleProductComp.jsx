import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SingleProduct.css"; // Import custom CSS for additional styling

function SingleProductComp({ product }) {
  const {
    id,
    name,
    description,
    price,

    stock,
    isActive,
    lowStockThreshold,
    vendorId,
    categories,
    image,
  } = product;

  // Function to handle base64 image conversion
  const getImageSrc = (base64Image) => {
    // If the image string already includes the data URI prefix, return as is
    if (base64Image.startsWith("data:image")) {
      return base64Image;
    } else {
      // Otherwise, construct the data URI
      return `data:image/jpeg;base64,${base64Image}`;
    }
  };

  return (
    <div className="single-product-container">
      <div className="container mt-4">
        <div className="card bg-black text-white">
          <div className="card-body">
            <h2 className="text-center mb-4">{name}</h2>
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={getImageSrc(image)}
                  alt={name}
                  className="img-fluid product-image"
                />
              </div>
              <div className="col-md-6">
                <table className="table table-dark table-striped">
                  <tbody>
                    <tr>
                      <th scope="row">Product ID</th>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td>{description}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>${price.toFixed(2)}</td>
                    </tr>

                    <tr>
                      <th scope="row">Stock</th>
                      <td>{stock}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{isActive ? "Active" : "Inactive"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Low Stock Threshold</th>
                      <td>{lowStockThreshold}</td>
                    </tr>
                    <tr>
                      <th scope="row">Vendor ID</th>
                      <td>{vendorId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Categories</th>
                      <td>
                        {categories.map((category) => category.name).join(", ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* You can add buttons or additional actions here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductComp;
