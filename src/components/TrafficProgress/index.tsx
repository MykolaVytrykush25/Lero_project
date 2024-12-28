import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

//styles
import styles from "./TrafficProgress.module.scss";

//types
import { Units } from "@/@types/enums";

type TTrafficProgressProps = {
  isStatic?: boolean;
  leftTraffic: number;
  allTraffic: number;
  unit: Units;
};

const TrafficProgress: React.FC<TTrafficProgressProps> = ({
  isStatic = false,
  unit,
  leftTraffic,
  allTraffic,
}) => {
  const { t } = useTranslation("common");

  const value = Math.max(
    0,
    !isStatic && allTraffic === 0 ? 0 : parseFloat(((leftTraffic / allTraffic) * 100).toFixed(2))
  );

  return (
    <div className={styles.progress}>
      <CircularProgress
        sx={{ position: "absolute", left: 0, color: "#1C2430" }}
        size={200}
        value={100}
        variant="determinate"
      />
      <CircularProgress sx={{ rotate: "180deg" }} size={200} value={value} variant="determinate" />
      <div className={styles.progress__info}>
        <p>{isStatic ? "Amount" : t("proxyPurchasesItem.trafficLeft")}</p>
        <p>
          <span>{isStatic ? allTraffic : leftTraffic.toFixed(2)}</span>
          {!isStatic && (
            <>
              &nbsp;/&nbsp;
              <span>{allTraffic.toFixed(2)}</span>
            </>
          )}
          {unit}
        </p>
      </div>
    </div>
  );
};

export default TrafficProgress;
