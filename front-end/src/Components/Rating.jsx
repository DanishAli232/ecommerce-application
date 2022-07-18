import React from "react";

const Rating = (props) => {
  const { Rating, numReviews } = props;
  return (
    <div className='rating'>
      <span>
        <i
          className={
            Rating >= 1
              ? "bi bi-star-fill"
              : Rating >= 0.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>
        <i
          className={
            Rating >= 2
              ? "bi bi-star-fill"
              : Rating >= 1.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>
        <i
          className={
            Rating >= 3
              ? "bi bi-star-fill"
              : Rating >= 2.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>
        <i
          className={
            Rating >= 4
              ? "bi bi-star-fill"
              : Rating >= 3.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>
        <i
          className={
            Rating >= 5
              ? "bi bi-star-fill"
              : Rating >= 4.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
        />
      </span>
      <span>{numReviews} Reviews</span>
    </div>
  );
};

export default Rating;
