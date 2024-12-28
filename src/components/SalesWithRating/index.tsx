import { capitalize, Rating } from "@mui/material";
import Link from "next/link";

//styles
import styles from "./SalesWithRating.module.scss";


type TSalesWithRatingProps = {
  rating: number;
  countSales?: number;
  sellerName?: string;
};

const SalesWithRating: React.FC<TSalesWithRatingProps> = ({ rating, countSales, sellerName }) => {
  return (
    <div className={styles.item}>
      <Rating readOnly precision={0.5} value={rating} />
      <p>{rating}/5</p>
      <div className={styles.item__divider} />
      {countSales !== undefined && <p>{countSales} Sales</p>}
      {sellerName &&
        <Link href={`/profile/${sellerName}`} className={styles.item__seller}>
          {capitalize(sellerName)}
        </Link>
      }
    </div>
  );
};

export default SalesWithRating;
