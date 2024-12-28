import { Checkbox, Fade, FormControlLabel, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
import { useToast } from "../ToastProvider";
import { useState } from "react";

//styles
import styles from "./ConfirmOffert.module.scss";

//components
import ModalHead from "../ModalHead";
import GrayContainedButton from "../GrayContainedButton";

//API
import { becomeSeller } from "@/API/userService";

//redux
import { changeRole } from "@/redux/slices/user/slice";

//types
import { TModalProps } from "@/@types/base";
import { UserRoles } from "@/@types/enums";

const ConfirmOffert: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleBecomeSeller = async () => {
    setIsLoading(true);
    try {
      await becomeSeller(isChecked);
      dispatch(changeRole(UserRoles.SELLER));
      handleClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsChecked(false);
    handleClose();
  };

  return (
    <Modal open={isOpened} onClose={handleModalClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleModalClose} heading="Offer agreement" />
            <div className={styles.modal__main}>
              <FormControlLabel
                control={
                  <Checkbox value={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                }
                label="I acknowledge and accept the terms of the offer agreement."
              />
            </div>
            <div className={styles.modal__actions}>
              <GrayContainedButton onClick={handleModalClose} fullWidth colorText="white">
                Cancel
              </GrayContainedButton>
              <LoadingButton
                disabled={!isChecked}
                onClick={handleBecomeSeller}
                loading={isLoading}
                variant="contained"
                fullWidth
              >
                Confirm
              </LoadingButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmOffert;
