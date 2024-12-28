import { Fade, Modal } from "@mui/material";

//styles
import styles from "./ProductFiltersWindow.module.scss";

//components
import ModalHead from "@/components/ModalHead";
import CustomChip from "@/components/CustomChip";

//types
import { TModalProps } from "@/@types/base";
import { TProductTag } from "@/redux/slices/products/types";

type TProductFiltersWindowProps = TModalProps & {
  activeTags: number[];
  tags: TProductTag[];
  handleSelectTag: (i: number) => void;
};

const ProductFiltersWindow: React.FC<TProductFiltersWindowProps> = ({
  isOpened,
  handleClose,
  activeTags,
  handleSelectTag,
  tags,
}) => {
  return (
    <Modal open={isOpened} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Filter" />
            <div className={styles.modal__main}>
              {tags.map((t, idx) => (
                <CustomChip
                  isActive={activeTags.includes(t.id)}
                  key={idx}
                  label={t.name}
                  onClick={() => handleSelectTag(t.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ProductFiltersWindow;
