"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import qs from "qs";

//styles
import styles from "./MainLayout.module.scss";

//components
import Sidebar from "../Sidebar";
import UserBar from "../UserBar";
import Breadcrumbs from "../CustomBreadcrumbs";
import Loader from "../Loader";

//API
import { loginUser } from "@/API/userService";

//redux
import { fetchUser } from "@/redux/slices/user/asyncActions";
import { userSelector } from "@/redux/slices/user/selectors";

//icons
import LogoIcon from "@/assets/icons/logo.svg";

//types
import { Status } from "@/@types/base";


type TMainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<TMainLayoutProps> = ({ children }) => {
  const { userFetched, status } = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleReferralCode = () => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const refCode = queryParams.p;

    if (refCode && !Cookies.get("referral_code")) {
      Cookies.set("referral_code", refCode as string, { expires: 4 / 24 });
    }
  };

  useEffect(() => {
    const handleTelegramData = async () => {
      const tgWindow = window.Telegram?.WebApp;

      if (tgWindow && tgWindow.initData) {
        tgWindow.expand();
        try {
          await loginUser({ queryString: tgWindow.initData, from: 'telegram' });
        } catch (error) {
          console.error("Telegram login failed:", error);
        }
      }
    };

    handleTelegramData();
  }, []);

  useEffect(() => {
    if (!userFetched) {
      dispatch(fetchUser());
    }
  }, [dispatch, userFetched]);

  useEffect(() => {
    handleReferralCode();
  }, []);

  if (status === Status.LOADING) {
    return <Loader />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.layout__content}>
        <Sidebar />
        <main className={styles.layout__content__main}>
          <div className="container">
            <div className={styles.layout__content__main__wrapper}>
              <div className={styles.layout__content__main__userbar}>
                <Breadcrumbs />
                <div className={styles.layout__content__main__userbar__content}>
                  <Link href="/" className={styles.layout__content__main__userbar__content__logo}>
                    <LogoIcon />
                  </Link>
                  <UserBar />
                </div>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
