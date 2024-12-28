import { Fade, FormControl, FormHelperText, Modal } from "@mui/material";
import { useToast } from "../ToastProvider";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "@/redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

//styles
import styles from "./ChangePasswordModal.module.scss";

//components
import ModalHead from "../ModalHead";
import GrayContainedButton from "../GrayContainedButton";
import PasswordField from "../PasswordField";

//types
import { TModalProps } from "@/@types/base";

//redux
import { editUser } from "@/redux/slices/user/asyncActions";
import { userSelector } from "@/redux/slices/user/selectors";


// Schema for validation
const createSchema = (isTempUser: boolean) => {
  return yup.object().shape({
    oldPassword: isTempUser
      ? yup.string().nullable()
      : yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .min(8, "New password must be at least 8 characters long")
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
};

type FormValues = {
  oldPassword?: string | null;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const { userData } = useSelector(userSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const isTempUser = userData?.role === "temp_user";

  const schema = createSchema(isTempUser);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const payload = isTempUser
        ? { password: data.newPassword }
        : { old_password: data.oldPassword, password: data.newPassword };

      await dispatch(editUser(payload)).unwrap();
      showToast("Password changed", "success");
      reset();
      router.push('/login');
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
            <ModalHead handleClose={handleClose} heading={t("base.changePassword")} />
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modal__form}>
              <div className={styles.modal__form__fields}>
                {!isTempUser && (
                  <FormControl fullWidth error={!!errors.oldPassword}>
                    <PasswordField
                      label={t("changePasswordModal.currentPassword")}
                      {...register("oldPassword")}
                    />
                    {errors.oldPassword && (
                      <FormHelperText>{errors.oldPassword.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
                <FormControl fullWidth error={!!errors.newPassword}>
                  <PasswordField
                    label={t("changePasswordModal.newPassword")}
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <FormHelperText>{errors.newPassword.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth error={!!errors.confirmPassword}>
                  <PasswordField
                    label={t("changePasswordModal.confirmNewPassword")}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className={styles.modal__actions}>
                <GrayContainedButton fullWidth onClick={handleClose}>
                  Cancel
                </GrayContainedButton>
                <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth>
                  {t("base.changePassword")}
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;
