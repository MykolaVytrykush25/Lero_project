import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

//styles
import styles from "./ReferralStats.module.scss";

//components
import Block from "@/components/Block";
// import GrayContainedButton from "@/components/GrayContainedButton";
import { getReferralBalance, transferToBalance } from "@/API/userService";

//redux
import { changeBalance } from "@/redux/slices/user/slice";
import { userSelector } from "@/redux/slices/user/selectors";


//types
import { TReferralInfo } from "@/@types/user";


// const data = [
//   { date: "1 Sep", value: 12 },
//   { date: "2 Sep", value: 19 },
//   { date: "3 Sep", value: 3 },
//   { date: "4 Sep", value: 5 },
//   { date: "5 Sep", value: 90 },
//   { date: "6 Sep", value: 2 },
//   { date: "7 Sep", value: 2 },
//   { date: "8 Sep", value: 2 },
//   { date: "9 Sep", value: 26 },
//   { date: "10 Sep", value: 124 },
// ];

const ReferralStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { userData } = useSelector(userSelector);

  const [referralInfo, setReferralInfo] = useState<TReferralInfo | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getReferralBalance();
      setReferralInfo(data);
    })();
  }, []);

  const handleTransferToBalance = async () => {
    if (!referralInfo || referralInfo.available <= 0) {
      return showToast("Insufficient funds for transfer.", "error");
    }

    try {
      await transferToBalance({ amount: referralInfo.available, from: "referral" });
      setReferralInfo((prev) =>
        prev
          ? {
            ...prev,
            available: 0,
          }
          : null
      );
      userData?.balance && dispatch(changeBalance(userData.balance + referralInfo.available));
      showToast("Funds successfully transfered", "success");
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  };

  return (
    <div className={styles.stats}>
      <div className={styles.stats__wrapper}>
        <Block className={styles.stats__balance}>
          <div className={styles.stats__balance__wrapper}>
            <div className={styles.stats__balance__info}>
              <p>Balance</p>
              <span>{referralInfo?.available} $</span>
            </div>
            <div className={styles.stats__balance__actions}>
              <Button variant="contained" color="primary" onClick={handleTransferToBalance}>
                Transfer to balance
              </Button>
              {/* {process.env.NODE_ENV === "development" && (
                <GrayContainedButton colorText="white">Withdraw</GrayContainedButton>
              )} */}
            </div>
          </div>
        </Block>
        <Block className={styles.stats__graph}>
          <div className={styles.stats__graph__wrapper}>
            <div className={styles.stats__graph__info}>
              <div className={styles.stats__graph__info__item}>
                <p>Total referrals:</p>
                <span>{referralInfo?.total_users}</span>
              </div>
              <div className={styles.stats__graph__info__item}>
                <p>Total money from referrals:</p>
                <span>{referralInfo?.total} $</span>
              </div>
              <div className={styles.stats__graph__info__item}>
                <p>Money on hold:</p>
                <span>{referralInfo?.hold} $</span>
              </div>
            </div>
            {/* {process.env.NODE_ENV === "development" && (
              <ResponsiveContainer width="100%" height={360}>
                <BarChart barCategoryGap={24} data={data} margin={{ top: 20 }}>
                  <CartesianGrid
                    stroke="#333A43"
                    vertical={false}
                    strokeDasharray="32 24"
                    horizontal={true}
                    strokeWidth={1}
                  />
                  <XAxis
                    dy={8}
                    tickLine={false}
                    axisLine={false}
                    dataKey="date"
                    label={{ position: "insideBottom", offset: -10 }}
                    tick={{ fill: "#646B73" }}
                  />
                  <YAxis
                    tick={{ fill: "#646B73" }}
                    dx={-16}
                    axisLine={false}
                    label={{ angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}`, "sells"]}
                    cursor={{ fill: "rgba(75, 192, 192, 0.1)" }}
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                    labelStyle={{ color: "white" }}
                  />
                  <Bar radius={[10, 10, 10, 10]} stroke="none" dataKey="value" fill="#28BF56" />
                </BarChart>
              </ResponsiveContainer>
            )} */}
          </div>
        </Block>
      </div>
    </div>
  );
};

export default ReferralStats;
