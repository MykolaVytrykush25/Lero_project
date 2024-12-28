import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useToast } from "../ToastProvider";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Fade, Modal, TextField, FormControl, FormHelperText } from "@mui/material";

// styles
import styles from "./ResetPasswordModal.module.scss";

// components
import ModalHead from "../ModalHead";
import OTPInput from "../OTPInput";

// API
import { resetPassword, resetPasswordEnterCode, resetPasswordRequest } from "@/API/userService";

// redux
import { userSelector } from "@/redux/slices/user/selectors";

// types
import { TModalProps } from "@/@types/base";
import { useRouter } from "next/navigation";

const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

type PasswordFormValues = { newPassword: string; confirmPassword: string };
type EmailFormValues = { email: string };

const ResetPasswordModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { userData } = useSelector(userSelector);
  const { showToast } = useToast();

  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"sendCode" | "enterCode" | "resetPassword">("sendCode");

  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({ resolver: yupResolver(passwordSchema) });

  const {
    handleSubmit: handleEmailSubmit,
    register: registerEmail,
    reset: resetEmailForm,
    getValues: getEmailValues,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>();

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      const email = userData?.email || getEmailValues("email");
      await resetPasswordRequest(email);
      showToast("Code sent to your email", "success");
      setStep("enterCode");
      if (!userData) {
        resetEmailForm();
      }
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCode = async () => {
    setIsLoading(true);
    try {
      const code = otp.join("");
      if (code) {
        await resetPasswordEnterCode(code);
        setStep("resetPassword");
      }
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      await resetPassword(data.newPassword);
      showToast("Password changed successfully", "success");
      setStep("sendCode");
      setOtp(Array(otpLength).fill(""));
      resetPasswordForm();
      router.push('/login');
      handleClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableEscapeKeyDown
    >
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Reset password" />
            <div className={styles.modal__main}>
              {step === "sendCode" && !userData ? (
                <form
                  onSubmit={handleEmailSubmit(handleSendCode)}
                  className={styles.modal__main__form}
                >
                  <FormControl fullWidth error={!!emailErrors.email}>
                    <TextField label="Email" {...registerEmail("email")} />
                    {emailErrors.email && (
                      <FormHelperText>{emailErrors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                  <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth>
                    Send code
                  </LoadingButton>
                </form>
              ) : (
                <>
                  {step === "sendCode" && userData && (
                    <LoadingButton
                      onClick={handleSendCode}
                      loading={isLoading}
                      variant="contained"
                      fullWidth
                    >
                      Send code
                    </LoadingButton>
                  )}
                  {step === "enterCode" && (
                    <>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        length={otpLength}
                        disabled={step !== "enterCode"}
                      />
                      <LoadingButton
                        onClick={handleConfirmCode}
                        disabled={otp.join("").length !== otpLength}
                        loading={isLoading}
                        variant="contained"
                        fullWidth
                      >
                        Submit code
                      </LoadingButton>
                    </>
                  )}
                </>
              )}
              {step === "resetPassword" && (
                <form
                  onSubmit={handlePasswordSubmit(handleResetPassword)}
                  className={styles.modal__main__form}
                >
                  <div className={styles.modal__main__form__fields}>
                    <FormControl fullWidth error={!!passwordErrors.newPassword}>
                      <TextField
                        type="password"
                        label="New Password"
                        {...registerPassword("newPassword")}
                      />
                      {passwordErrors.newPassword && (
                        <FormHelperText>{passwordErrors.newPassword.message}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={!!passwordErrors.confirmPassword}>
                      <TextField
                        type="password"
                        label="Confirm Password"
                        {...registerPassword("confirmPassword")}
                      />
                      {passwordErrors.confirmPassword && (
                        <FormHelperText>{passwordErrors.confirmPassword.message}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth>
                    Change Password
                  </LoadingButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ResetPasswordModal;
