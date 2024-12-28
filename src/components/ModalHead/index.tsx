//styles
import styles from "./ModalHead.module.scss";

//components
import CloseButton from "../CloseButton";

type TModalHeadProps = {
  handleClose: () => void;
  heading: string;
};

const ModalHead: React.FC<TModalHeadProps> = ({ handleClose, heading }) => {
  return (
    <div className={styles.head}>
      <h2>{heading}</h2>
      <CloseButton onClick={handleClose} />
    </div>
  );
};

export default ModalHead;
