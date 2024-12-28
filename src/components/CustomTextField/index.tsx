import { TextField, TextFieldProps } from "@mui/material";

//styles
import styles from "./CustomTextField.module.scss";

type TCustomTextFieldProps = TextFieldProps & {
  title?: string;
};

const CustomTextField: React.FC<TCustomTextFieldProps> = ({ title, ...props }) => {
  console.log(title);
  return (
    <div className={styles.field}>
      {/* <span>{title}</span> */}
      <TextField {...props} />
    </div>
  );
};

export default CustomTextField;
