import { ReactNode } from "react";

//styles
import styles from "./AlertWarning.module.scss";

type TAlertWarningProps = {
  title: string;
  desc: string;
  buttonText?: string;
  icon: ReactNode;
  callback?: () => void;
};

const AlertWarning: React.FC<TAlertWarningProps> = ({
  title,
  desc,
  buttonText,
  icon,
  callback,
}) => {
  return (
    <div className={styles.alert}>
      <div className={styles.alert__wrapper}>
        <div className={styles.alert__icon}>{icon}</div>
        <div className={styles.alert__text}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        {buttonText && <button onClick={callback}>{buttonText}</button>}
      </div>
    </div>
  );
};

export default AlertWarning;
