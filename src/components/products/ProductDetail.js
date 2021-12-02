import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../store/actions/productActions";
import { Carousel } from "react-bootstrap";

import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";
import { addItemToCart } from "../../store/actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "./ListReviews";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = params;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { error:reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { user } = useSelector((state) => state.auth);
  

    useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Posted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [alert, dispatch, error, id, reviewError, success]);

  const increaseQty = () => {
    if (qty >= product.stock) {
      return;
    }
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty <= 1) {
      return;
    }
    setQty(qty - 1);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, qty));
    alert.success("Item added to Cart");
  };
  const setUserRatings = () => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  };

  const reviewHandler = (e) => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", params.id);

    dispatch(newReview(formData));
  };

  return (
    <React.Fragment>
      <Metadata title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        src={image.url}
                        alt={product.title}
                        className="d-block w-100"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}% ` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">Rs.{product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={qty}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alrt-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
