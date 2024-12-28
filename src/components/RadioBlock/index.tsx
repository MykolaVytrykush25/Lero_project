import cn from "classnames";

//styles
import styles from "./RadioBlock.module.scss";
import { Tooltip } from "@mui/material";

interface RadioBlockProps {
  checked: boolean;
  value: string;
  icon?: React.ReactNode;
  tooltip?: string;
  setValue: (val: string) => void;
  text: React.ReactNode;
  width?: string;
}

const RadioBlock: React.FC<RadioBlockProps> = ({
  checked,
  value,
  setValue,
  text,
  width,
  icon,
  tooltip,
}) => {
  return (
    <Tooltip title={tooltip} placement="top">
      <button
        style={width ? { width: width } : { width: "100%" }}
        className={cn(styles.button, checked ? styles.button__active : "")}
        onClick={() => setValue(value)}
      >
        {icon}
        {text}
      </button>
    </Tooltip>
  );
};

export default RadioBlock;
