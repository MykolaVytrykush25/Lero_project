//styles
import styles from "./VerifiedBadge.module.scss";

//icons
import { ShieldOutlined } from "@mui/icons-material";

const VerifiedBadge: React.FC = () => {
  return (
    <div className={styles.badge}>
      <ShieldOutlined />
    </div>
  );
};

export default VerifiedBadge;
