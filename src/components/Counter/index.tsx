//styles
import styles from "./Counter.module.scss";

//icons
import { Add, Remove } from "@mui/icons-material";

type TCounterProps = {
  maxCount: number | null;
  count: number;
  setCount: (i: number) => void;
};

const Counter: React.FC<TCounterProps> = ({ count, setCount, maxCount }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = +e.target.value;
    const effectiveMax = maxCount !== null && maxCount <= 99999 ? maxCount : 99999;

    if (isNaN(newValue)) {
      newValue = 1;
    } else if (newValue > effectiveMax) {
      newValue = effectiveMax;
    }
    setCount(newValue);
  };

  const handleBlur = () => {
    if (count === 0) {
      setCount(1);
    }
  };

  return (
    <div className={styles.counter}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          count > 1 && setCount(count - 1);
        }}
      >
        <Remove />
      </button>
      <input value={count} onBlur={handleBlur} onChange={handleInputChange} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          const effectiveMax = maxCount !== null && maxCount <= 99999 ? maxCount : 99999;
          if (count + 1 <= effectiveMax) {
            setCount(count + 1);
          }
        }}
      >
        <Add />
      </button>
    </div>
  );
};

export default Counter;
