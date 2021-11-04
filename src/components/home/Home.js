import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../store/actions/productActions";
import Product from "../products/Product";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProducts);
   
  }, [dispatch,error,alert]);

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
