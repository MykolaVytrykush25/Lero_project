import { Fade, FormControl, FormHelperText, Modal, TextField } from "@mui/material";
import { useAppDispatch } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { useToast } from "../ToastProvider";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//styles
import styles from "./ChangeEmailModal.module.scss";

//components
import ModalHead from "../ModalHead";
import GrayContainedButton from "../GrayContainedButton";
// import OTPInput from "../OTPInput";

//redux
import { editUser } from "@/redux/slices/user/asyncActions";

//types
import { TModalProps } from "@/@types/base";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

type FormValues = {
  email: string;
};

const ChangeEmailModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await dispatch(editUser({ ...data })).unwrap();
      showToast("Email changed", "success");
      reset();
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
            <ModalHead handleClose={handleClose} heading="Change Email" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modal__form}>
              <FormControl fullWidth error={!!errors.email}>
                <TextField type="email" label="New Email" {...register("email")} />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
              {/* <OTPInput onComplete={(val) => console.log(val)} /> */}
              <div className={styles.modal__actions}>
                <GrayContainedButton fullWidth onClick={handleClose}>
                  Cancel
                </GrayContainedButton>
                <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth>
                  Change Email
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ChangeEmailModal;
