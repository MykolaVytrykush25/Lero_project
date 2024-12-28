"use client";

import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//styles
import styles from "./SettingsPage.module.scss";

//components
import PrivateRoute from "@/components/PrivateRoute";
import SettingsTabs from "@/components/ProfileComponents/SettingsComponents/SettingsTabs";
import MainLayout from "@/components/MainLayout";
import Loader from "@/components/Loader";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const { username }: { username: string } = useParams();
  const { userData } = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userData) {
      if (username !== userData.username) {
        router.push("/404");
      } else {
        setIsLoading(false);
      }
    }
  }, [username, userData, router]);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page__wrapper}>
          {!isLoading ? (
            <div className={styles.page__main}>
              <SettingsTabs />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default SettingsPage;
