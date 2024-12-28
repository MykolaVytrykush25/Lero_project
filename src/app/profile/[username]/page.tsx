"use client";

import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

//styles
import styles from "./ProfilePage.module.scss";

//components
import PrivateRoute from "@/components/PrivateRoute";
import UserInfo from "@/components/ProfileComponents/UserInfo";
import UserBanner from "@/components/ProfileComponents/UserBanner";
import ProfileTabs from "@/components/ProfileComponents/ProfileTabs";
import MainLayout from "@/components/MainLayout";
import AlertWarning from "@/components/AlertWarning";
import Loader from "@/components/Loader";

//API
import { getProfile } from "@/API/userService";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { TProfileData } from "@/@types/user";

//icons
import { ManageAccountsOutlined } from "@mui/icons-material";
import { UserRoles } from "@/@types/enums";

const ProfilePage: NextPage = () => {
  const { username }: { username: string } = useParams();
  const { t } = useTranslation("common");
  const { userData } = useSelector(userSelector);
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<TProfileData | null>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile(username);
        setProfileData(data);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            {!isLoading ? (
              <div className={styles.page__main}>
                {profileData && (
                  <>
                    {username === userData?.username && userData.role === UserRoles.TEMP_USER &&
                      <AlertWarning
                        title="You are a temporary user"
                        desc="Please add your email in the settings to secure your account. Otherwise, all your data will be lost when you log out."
                        icon={<ManageAccountsOutlined />}
                      />
                    }
                    <UserBanner
                      isAccess={profileData.id === userData?.id}
                      imageUrl={profileData.banner}
                    />
                    <UserInfo
                      imageUrl={profileData.avatar}
                      description={profileData.description}
                      isAccess={profileData.id === userData?.id}
                      username={profileData.username}
                      rating={profileData?.seller_info?.seller_rating}
                      countSales={profileData?.seller_info?.total_sales}
                    />
                    <ProfileTabs isSeller={!!profileData?.seller_info?.username} userId={profileData.id} description={profileData.description} />
                  </>
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default ProfilePage;
