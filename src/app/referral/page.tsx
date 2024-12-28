"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
// import { Button } from "@mui/material";
import { useToast } from "@/components/ToastProvider";
import { useSelector } from "react-redux";

//styles
import styles from "./ReferralPage.module.scss";

//components
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/components/MainLayout";
import Block from "@/components/Block";
import ReferralStats from "@/components/ReferralComponents/ReferralStats";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//utils
import { copyToClipboard } from "@/utils/copyToClipboard";

//icons
import { ContentCopyOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

const ReferralPage: NextPage = () => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { userData } = useSelector(userSelector);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            <h1>{t("referralPage.title")}</h1>
            {userData?.role === "admin" && (
              <div className={styles.page__main}>
                <div className={styles.page__main__stats}>
                  <Block className={styles.page__main__stats__change}>
                    <div className={styles.page__main__stats__change__wrapper}>
                      <div className={styles.page__main__stats__change__input}>
                        <p>Your referral link</p>
                        <div className={styles.page__main__stats__change__input__field}>
                          <span>https://gemups.com?p=</span>
                          <p>{userData?.referral_link}</p>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `https://gemups.com/?p=${userData?.referral_link}`,
                                showToast
                              )
                            }
                          >
                            Copy <ContentCopyOutlined />
                          </button>
                        </div>
                        <Button
                          className={styles.page__main__stats__change__input__field__button}
                          onClick={() =>
                            copyToClipboard(
                              `https://gemups.com/?p=${userData?.referral_link}`,
                              showToast
                            )
                          }
                          variant="contained"
                          color="primary"
                        >
                          Copy
                        </Button>
                      </div>
                      {/* {process.env.NODE_ENV === "development" && (
                        <Button color="primary" variant="contained">
                          Change Link
                        </Button>
                      )} */}
                    </div>
                  </Block>
                  <ReferralStats />
                </div>
              </div>
            )}
          </div>
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default ReferralPage;
