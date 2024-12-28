"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useToast } from "@/components/ToastProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

//styles
import styles from "./LoginPage.module.scss";

//components
import ResetPasswordModal from "@/components/ResetPasswordModal";
import MainLayout from "@/components/MainLayout";


//API
import { loginUser } from "@/API/userService";

//redux
import { fetchUser } from "@/redux/slices/user/asyncActions";
import { userSelector } from "@/redux/slices/user/selectors";


type FormValues = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetPasswordModalOpened, setIsResetPasswordModalOpened] = useState<boolean>(false);

  const { isAuthenticated } = useSelector(userSelector);

  const schema = yup.object({
    email: yup.string().required(t("loginPage.errors.email")),
    password: yup.string().required(t("loginPage.errors.password")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await loginUser(data);
      await dispatch(fetchUser());
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    isAuthenticated && router.push("/");
  }, [router, isAuthenticated]);

  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <h1>{t("base.login")}</h1>
          <form className={styles.page__main} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.page__main__fields}>
              <FormControl fullWidth error={!!errors.email}>
                <TextField
                  label={t("loginPage.fields.usernameOrEmail")}
                  type="text"
                  {...register("email")}
                />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.password}>
                <TextField
                  label={t("loginPage.fields.password")}
                  type="password"
                  {...register("password")}
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            </div>
            <div className={styles.page__main__submit}>
              <LoadingButton loading={isLoading} variant="contained" fullWidth type="submit">
                {t("base.login")}
              </LoadingButton>
              <Link href="/register">{t("loginPage.helperText")}</Link>
              <p
                onClick={() => setIsResetPasswordModalOpened(true)}
                className={styles.page__main__submit__forgot}
              >
                Forgot password ?
              </p>
            </div>
          </form>
          <ResetPasswordModal
            isOpened={isResetPasswordModalOpened}
            handleClose={() => setIsResetPasswordModalOpened(false)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
