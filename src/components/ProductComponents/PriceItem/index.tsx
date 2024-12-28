import cn from "classnames";

//styles
import styles from "./PriceItem.module.scss";

//types
import { Units } from "@/@types/enums";

type TPriceItemProps = {
  idx: number;
  handleSelect: (i: number) => void;
  isSelected: boolean;
  amount: string;
  price: number;
  unit: Units;
  className?: string;
};

const PriceItem: React.FC<TPriceItemProps> = ({
  isSelected,
  amount,
  unit,
  price,
  handleSelect,
  idx,
  className,
}) => {
  return (
    <button
      onClick={() => handleSelect(idx)}
      className={cn(styles.item, className, isSelected ? styles.item__selected : undefined)}
    >
      <p className={styles.item__count}>
        <span>{amount}</span> {unit}
      </p>
      <span className={styles.item__price}>{price * parseInt(amount)} $</span>
    </button>
  );
};

export default PriceItem;
