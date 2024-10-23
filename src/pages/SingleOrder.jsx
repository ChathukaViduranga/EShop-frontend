import { useParams } from "react-router-dom";
import SingleOrderComp from "../Components/OrderPage/SingleOrderComp";
import { useEffect, useState } from "react";
import { getOrderById } from "../services/orderApiService";
// import UpdateStock from "../Components/ProductPage/UpdateStockComp";

function SingleProduct() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      console.log("fetching order", id);
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load order.");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  const onUpdate = async () => {
    const response = await getOrderById(id);
    setOrder(response.data);
  };

  return (
    <div>
      <div>
        {order ? (
          <SingleOrderComp order={order} onUpdate={onUpdate} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {/* <div>
        {product ? (
          <UpdateStock product={product} onUpdate={onUpdate} />
        ) : (
          <div>Loading...</div>
        )}
      </div> */}
    </div>
  );
}

export default SingleProduct;
