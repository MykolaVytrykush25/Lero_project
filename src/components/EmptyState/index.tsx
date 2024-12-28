import { ReactNode } from "react";

//styles
import styles from "./EmptyState.module.scss";

//components
import Block from "../Block";

type TEmptyStateProps = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const EmptyState: React.FC<TEmptyStateProps> = ({ title, desc, icon }) => {
  return (
    <Block className={styles.empty}>
      <div className={styles.empty__wrapper}>
        <div className={styles.empty__icon}>{icon}</div>
        <div className={styles.empty__text}>
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </Block>
  );
};

export default EmptyState;
