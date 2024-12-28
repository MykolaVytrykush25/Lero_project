"use client";

import { NextPage } from "next";
import { useSelector } from "react-redux";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//styles
import styles from "./RegisterPage.module.scss";

//components
import MainLayout from "@/components/MainLayout";

//API
import { registerUser } from "@/API/userService";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

type FormValues = {
  username: string;
  email: string;
  referral_link?: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { showToast } = useToast();

  const { isAuthenticated } = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup.object({
    username: yup
      .string()
      .min(4, t("registerPage.errors.usernameMinLength"))
      .required(t("registerPage.errors.usernameRequired")),
    email: yup
      .string()
      .email(t("registerPage.errors.emailInvalid"))
      .required(t("registerPage.errors.emailRequired")),
    refCode: yup.string().optional(),
    password: yup
      .string()
      .min(8, t("registerPage.errors.passwordMinLength"))
      .required(t("registerPage.errors.passwordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      referral_link: "",
    },
  });

  useEffect(() => {
    const refCode = Cookies.get("referral_code");
    if (refCode) {
      setValue("referral_link", refCode);
    }
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      router.push("/login");
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated && router.push("/");
  }, [isAuthenticated, router]);

  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <h1>{t("base.register")}</h1>
          <form className={styles.page__main} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.page__main__fields}>
              <FormControl fullWidth error={!!errors.username}>
                <TextField
                  label={t("registerPage.fields.username")}
                  type="text"
                  {...register("username")}
                />
                {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.email}>
                <TextField
                  label={t("registerPage.fields.email")}
                  type="email"
                  {...register("email")}
                />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.password}>
                <TextField
                  label={t("registerPage.fields.password")}
                  type="password"
                  {...register("password")}
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label={t("registerPage.fields.refCode")}
                  type="text"
                  {...register("referral_link")}
                />
              </FormControl>
            </div>
            <div className={styles.page__main__submit}>
              <LoadingButton loading={isLoading} variant="contained" fullWidth type="submit">
                {t("base.register")}
              </LoadingButton>
              <Link href="/login">{t("registerPage.helperText")}</Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
