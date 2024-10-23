import { useParams } from "react-router-dom";
import SingleProductComp from "../Components/ProductPage/SingleProductComp";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productApiService";
import UpdateStock from "../Components/ProductPage/UpdateStockComp";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  const onUpdate = async () => {
    const response = await getProductById(id);
    setProduct(response.data);
  };

  return (
    <div>
      <div>
        {product ? (
          <SingleProductComp product={product} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {product ? (
          <UpdateStock product={product} onUpdate={onUpdate} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
