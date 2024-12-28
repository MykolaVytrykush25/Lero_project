//styles
import styles from "./EarnHistory.module.scss";

const EarnHistory: React.FC = () => {
  return (
    <div className={styles.history}>
      <div className={styles.history__wrapper}>
        <div className={styles.history__head}>
          <h3>History</h3>
        </div>
        <div className={styles.history__table}>
          <div className={styles.history__table__head}></div>
          <div className={styles.history__table__main}></div>
        </div>
      </div>
    </div>
  );
};

export default EarnHistory;
