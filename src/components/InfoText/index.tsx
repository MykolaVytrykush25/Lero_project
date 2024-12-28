import { Tooltip } from "@mui/material";

//styles
import styles from "./InfoText.module.scss";

//icons
import { InfoOutlined } from "@mui/icons-material";

type TInfoTextProps = {
  text: string;
  tooltip: string;
};

const InfoText: React.FC<TInfoTextProps> = ({ text, tooltip }) => {
  return (
    <div className={styles.text}>
      <p>{text}</p>
      <Tooltip title={tooltip} placement="right">
        <span>
          <InfoOutlined />
        </span>
      </Tooltip>
    </div>
  );
};

export default InfoText;
