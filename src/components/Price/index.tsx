//styles
import styles from "./Price.module.scss";

const Price: React.FC<{ price: number }> = ({ price }) => {
  return <span className={styles.price}>{price.toFixed(2)}$</span>;
};

export default Price;
