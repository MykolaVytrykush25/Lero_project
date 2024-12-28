import { Button, ButtonProps } from "@mui/material";
import cn from "classnames";

//styles
import styles from "./GrayContainedButton.module.scss";

type TGrayContainedButtonProps = ButtonProps & {
  rounded?: boolean;
  colorText?: "blue-gray" | "white" | "primary";
  className?: string;
};

const GrayContainedButton: React.FC<TGrayContainedButtonProps> = (props) => {
  const { colorText = "blue-gray", className, rounded, ...rest } = props;

  return (
    <Button
      className={cn(styles.button, className, {
        [styles.button__primary]: colorText === "primary",
        [styles.button__white]: colorText === "white",
        [styles.button__bluegray]: colorText === "blue-gray",
        [styles.button__rounded]: rounded,
      })}
      variant="contained"
      {...rest}
    >
      {props.children}
    </Button>
  );
};

export default GrayContainedButton;
