import { Button, ButtonProps } from "@mui/material";

//styles
import styles from "./ErrorButton.module.scss";

type TErrorButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const ErrorButton: React.FC<TErrorButtonProps> = ({ children, ...props }) => {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default ErrorButton;
