import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../store/actions/productActions";
import Product from "../products/Product";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";

const Home = () => {
  const params=useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  // console.log(params.keyword);
  const {keyword}=params;
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword,currentPage));
  }, [dispatch, error, alert, currentPage,keyword]);
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <React.Fragment>
      <Metadata title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
