import { Fade, Modal } from "@mui/material";
import { useToast } from "../ToastProvider";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

//styles
import styles from "./ConfirmAccountModal.module.scss";

//components
import ModalHead from "../ModalHead";
import OTPInput from "../OTPInput";

//API
import { confirmEmail } from "@/API/userService";

//types
import { TModalProps } from "@/@types/base";

const ConfirmAccountModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const router = useRouter();

  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await confirmEmail(otp.join(""));
      showToast("Email confirmed successfully", "success");
      router.push("/login");
      handleClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Confirm email" />
            <OTPInput value={otp} onChange={setOtp} length={otpLength} />
            <LoadingButton
              onClick={handleSubmit}
              loading={isLoading}
              type="submit"
              variant="contained"
              disabled={otp.join("").length !== otpLength}
              fullWidth
            >
              Confirm
            </LoadingButton>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmAccountModal;
