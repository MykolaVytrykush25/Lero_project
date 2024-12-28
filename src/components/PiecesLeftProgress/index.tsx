import { LinearProgress } from "@mui/material";

//styles
import styles from "./PiecesLeftProgress.module.scss";

//utils
import formatNumber from "@/utils/formatNumber";

//icons
import LogoIcon from "@/assets/icons/logo.svg";

const PiecesLeftProgress: React.FC<{ piecesLeft: number }> = ({ piecesLeft }) => {
  return (
    <div className={styles.progress}>
      <p>
        Only <span>{piecesLeft === null ? <LogoIcon /> : formatNumber(piecesLeft)}</span> pcs left
      </p>
      <LinearProgress variant="determinate" value={50} />
    </div>
  );
};

export default PiecesLeftProgress;
