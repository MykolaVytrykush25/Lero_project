import { Avatar } from "@mui/material";
import dayjs from "dayjs";

//styles
import styles from "./Review.module.scss";

//components
import Block from "@/components/Block";
import CustomRating from "@/components/CustomRating";

type TReviewProps = {
  rating: number;
  author: string;
  text: string;
  date: string;
  avatar: string;
};

const Review: React.FC<TReviewProps> = ({ rating, author, text, date, avatar }) => {
  return (
    <Block className={styles.review}>
      <div className={styles.review__wrapper}>
        <div className={styles.review__main}>
          <Avatar sx={{ width: 64, height: 64 }} src={avatar || '/avatar.png'} />
          <div className={styles.review__main__description}>
            <h3>{author}</h3>
            <p>{text}</p>
          </div>
        </div>
        <div className={styles.review__info}>
          <CustomRating value={rating} readOnly />
          <p>{dayjs(date).format("DD.MM.YYYY")}</p>
        </div>
      </div>
    </Block>
  );
};

export default Review;
