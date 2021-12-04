import React from "react";

const ListReviews = ({reviews}) => {
  return (
    <React.Fragment>
      <div class="reviews w-75">
        <h3>Other's Reviews:</h3>
        <hr />
        {reviews &&
          reviews.map((review) => (
            <div class="review-card my-3" key={review._id}>
              <div class="rating-outer">
                <div class="rating-inner" style={{width:`${(review.rating/5)*100}%`}}></div>
              </div>
              <p class="review_user">{review.name}</p>
              <h4 class="review_comment">{review.comment}</h4>

              <hr />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ListReviews;
