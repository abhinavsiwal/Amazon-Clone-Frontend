import React from "react";

const ListReviews = ({reviews}) => {
  return (
    <React.Fragment>
      <div className="reviews w-75">
        <h3>Other's Reviews:</h3>
        <hr />
        {reviews &&
          reviews.map((review) => (
            <div className="review-card my-3" key={review._id}>
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${(review.rating/5)*100}%`}}></div>
              </div>
              <p className="review_user">{review.name}</p>
              <h4 className="review_comment">{review.comment}</h4>

              <hr />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ListReviews;
