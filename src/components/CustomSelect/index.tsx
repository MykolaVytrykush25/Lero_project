import { capitalize, FormControl, MenuItem, Select } from "@mui/material";
import cn from "classnames";

//styles
import styles from "./CustomSelect.module.scss";

//types
import { TFieldProps } from "@/@types/base";

//icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type TSelectProps = TFieldProps & {
  data: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const CustomSelect: React.FC<TSelectProps> = ({
  data,
  label,
  value,
  setValue,
  placeholder,
  disabled,
  className,
}) => {
  const getLabelByValue = (value: string) => {
    const item = data.find((i) => i.value === value);
    return item ? item.label : placeholder;
  };

  return (
    <FormControl
      className={cn(styles.select, className)}
      disabled={disabled}
      fullWidth
      size="small"
    >
      {label && <label>{label}</label>}
      <Select
        value={value}
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
        IconComponent={ExpandMoreIcon}
        displayEmpty
        renderValue={(selected: string) => {
          return selected ? (
            getLabelByValue(selected)
          ) : (
            <span className={styles.select__placeholder}>{placeholder}</span>
          );
        }}
      >
        {data?.map((i, idx) => (
          <MenuItem key={idx} value={i.value}>
            {capitalize(i.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
