import { Fade, Modal, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useToast } from "../ToastProvider";
import { useTranslation } from "react-i18next";

//styles
import styles from "./TakeReviewModal.module.scss";

//components
import ModalHead from "../ModalHead";
import CustomRating from "../CustomRating";

//API
import { addProductReview } from "@/API/productsService";

//types
import { TModalProps } from "@/@types/base";

type TTakeReviewModalProps = TModalProps & {
  id: number;
};

const TakeReviewModal: React.FC<TTakeReviewModalProps> = ({ id, isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(0);
  const [text, setText] = useState<string>("");

  const handleAddReview = async () => {
    setIsLoading(true);

    try {
      await addProductReview({ id, text, rating: rating as number });
      showToast("Review has been submited", "success");
      handleClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpened) {
      setRating(0);
      setText("");
    }
  }, [isOpened]);

  return (
    <Modal open={isOpened} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Write a review" />
            <div className={styles.modal__main}>
              <CustomRating onChange={(_, val) => setRating(val)} value={rating} precision={0.5} />
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                multiline
                minRows={5}
                maxRows={5}
                label="Review"
                helperText="Min 20 characters"
              />
            </div>
            <LoadingButton
              loading={isLoading}
              onClick={handleAddReview}
              disabled={!rating || text.length < 20}
              fullWidth
              variant="contained"
              color="primary"
            >
              Send review
            </LoadingButton>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TakeReviewModal;
