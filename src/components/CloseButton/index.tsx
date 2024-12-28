import { ButtonHTMLAttributes } from "react";
//styles
import styles from "./CloseButton.module.scss";

//icons
import { Close } from "@mui/icons-material";

interface ICloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FC<ICloseButtonProps> = (props) => {
  return (
    <button className={styles.button} {...props}>
      <Close fontSize="small" />
    </button>
  );
};

export default CloseButton;
