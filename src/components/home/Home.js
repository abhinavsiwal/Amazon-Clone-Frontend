import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../store/actions/productActions";
import Product from "../products/Product";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  // console.log(params.keyword);
  const { keyword } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const { loading, products, error, productsCount, resPerPage,filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Mobiles",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes",
    "Shoes",
    "Beauty",
    "Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, alert, currentPage, keyword, price, category]);
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let count = productsCount;
  if(keyword){
    count = filteredProductsCount
  }
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
              {keyword ? (
                <React.Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `Rs.1`,
                          1000: `Rs.1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `Rs.${value} `}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
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
