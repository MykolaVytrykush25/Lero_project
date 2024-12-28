import { Rating, RatingProps } from "@mui/material";

//styles
import styles from "./CustomRating.module.scss";

const CustomRating: React.FC<RatingProps> = (props) => {
  return (
    <div className={styles.rating}>
      <p>{props.value?.toFixed(1)}</p>
      <Rating {...props} />
    </div>
  );
};

export default CustomRating;
