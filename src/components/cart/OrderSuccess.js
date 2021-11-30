import React from "react";
import { Link } from "react-router-dom";
import Metadata from "../layout/Metadata";
const OrderSuccess = () => {
  return (
    <React.Fragment>
      <Metadata title={"Order Success"} />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://freepngimg.com/thumb/success/6-2-success-png-image.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderSuccess;
