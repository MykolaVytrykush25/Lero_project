import { Button } from "@mui/material";
import { useState } from "react";

//styles
import styles from "./SellerRate.module.scss";

//components
import Block from "../Block";
import CustomRating from "../CustomRating";
import TakeReviewModal from "../TakeReviewModal";

type TSellerRateProps = {
  id: number;
  access: boolean;
  rating: number;
  countReviews: number;
};

const SellerRate: React.FC<TSellerRateProps> = ({ access, rating, countReviews, id }) => {
  const [isReviewWindowOpened, setIsReviewWindowOpened] = useState<boolean>(false);

  return (
    <Block className={styles.rate}>
      <div className={styles.rate__wrapper}>
        <div className={styles.rate__main}>
          <h3>Average seller rate {rating.toFixed(1)} ({countReviews})</h3>
          <CustomRating value={rating} readOnly />
          <p>To provide a feedback about the seller, you must buy this product on 10$</p>
        </div>
        {access && (
          <Button onClick={() => setIsReviewWindowOpened(true)} variant="contained" color="primary">
            Write a review
          </Button>
        )}
        <TakeReviewModal
          id={id}
          isOpened={isReviewWindowOpened}
          handleClose={() => setIsReviewWindowOpened(false)}
        />
      </div>
    </Block>
  );
};

export default SellerRate;
