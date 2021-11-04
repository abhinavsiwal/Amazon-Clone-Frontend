import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/productActions";
import Product from "../products/Product";

import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Metadata title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
        ) : (
        <section id="products" className="container mt-5">
          <div className="row">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Home;
