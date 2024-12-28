import { InputAdornment, TextField, Tooltip } from "@mui/material";

//styles
import styles from "./AddOfferPriceItem.module.scss";

//components
import IconButton from "../IconButton";

//icons
import { Add, AttachMoney, DeleteOutline, InfoOutlined, Remove } from "@mui/icons-material";

type TAddOfferPriceItemProps = {
  price: number | undefined;
  amount: number;
  onPriceChange: (newPrice: number) => void;
  onAmountChange: (newAmount: number) => void;
  onRemove?: () => void;
  readOnly?: boolean;
};

const AddOfferPriceItem: React.FC<TAddOfferPriceItemProps> = ({
  price,
  amount,
  onPriceChange,
  onAmountChange,
  readOnly,
  onRemove,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__counter}>
        <IconButton
          disabled={readOnly || amount <= 1}
          size="lg"
          icon={<Remove />}
          variant="secondary"
          onClick={() => onAmountChange(amount - 1)}
        />
        <TextField
          className={styles.item__counter__value}
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          InputProps={{ readOnly: readOnly }}
          type="number"
          fullWidth
        />
        <IconButton
          disabled={readOnly}
          size="lg"
          icon={<Add />}
          variant="secondary"
          onClick={() => onAmountChange(amount + 1)}
        />
      </div>
      <TextField
        type="number"
        value={price}
        onChange={(e) => onPriceChange(Number(e.target.value))}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AttachMoney />
            </InputAdornment>
          ),
        }}
      />
      <Tooltip
        className={styles.item__counter__tooltip}
        disableHoverListener={!readOnly}
        title="The price is set from the specified quantity up to the next specified quantity. If there is no next quantity, the price will remain the same for any further amount."
      >
        <span>
          <IconButton
            size="lg"
            icon={readOnly ? <InfoOutlined /> : <DeleteOutline />}
            variant="secondary"
            onClick={onRemove}
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default AddOfferPriceItem;
