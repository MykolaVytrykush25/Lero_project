import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

//styles
import styles from "./SellerStats.module.scss";

//components
import Block from "@/components/Block";
// import GrayContainedButton from "@/components/GrayContainedButton";

//API
import { getSellerBalance } from "@/API/sellerService";
import { transferToBalance } from "@/API/userService";

//redux
import { userSelector } from "@/redux/slices/user/selectors";
import { changeBalance } from "@/redux/slices/user/slice";

//types
import { TSellerBalance } from "@/@types/seller";


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

const SellerStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { userData } = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sellerBalance, setSellerBalance] = useState<TSellerBalance | null>(null);

  useEffect(() => {
    (async () => {
      if (userData) {
        try {
          const data = await getSellerBalance();
          setSellerBalance(data);
        } catch (err: any) {
          showToast(err?.response?.data?.message || t("base.defaultError"), "error");
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  const handleTransferToBalance = async () => {
    if (!sellerBalance || sellerBalance.available_amount <= 0) {
      return showToast("Insufficient funds for transfer.", "error");
    }

    try {
      await transferToBalance({ amount: sellerBalance.available_amount, from: "seller" });
      setSellerBalance((prev) =>
        prev
          ? {
            ...prev,
            available_amount: 0,
          }
          : null
      );
      userData?.balance &&
        dispatch(changeBalance(userData.balance + sellerBalance.available_amount));
      showToast("Funds successfully transfered", "success");
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  };

  return (
    <div className={styles.stats}>
      <div className={styles.stats__wrapper}>
        {/* {userData?.role === UserRoles.USER && (
          <AlertWarning
            icon={<GppBadOutlined />}
            title="Unverified Seller"
            desc="To show your products in search verify yourself. Currently your products can be seen only via direct links."
            buttonText="Get Verification"
            callback={() => setIsConfirmModalOpened(true)}
          />
        )}
        <ConfirmOffert
          isOpened={isConfirmModalOpened}
          handleClose={() => setIsConfirmModalOpened(false)}
        /> */}
        {!isLoading ? (
          <>
            <Block className={styles.stats__balance}>
              <div className={styles.stats__balance__wrapper}>
                <div className={styles.stats__balance__info}>
                  <p>Balance:</p>
                  <span>{sellerBalance?.available_amount} $</span>
                </div>
                <div className={styles.stats__balance__actions}>
                  <Button onClick={handleTransferToBalance} variant="contained" color="primary">
                    Transfer to balance
                  </Button>
                  {/* <GrayContainedButton colorText="white">Withdraw</GrayContainedButton> */}
                </div>
              </div>
            </Block>
            <Block className={styles.stats__graph}>
              <div className={styles.stats__graph__wrapper}>
                <div className={styles.stats__graph__info}>
                  <div className={styles.stats__graph__info__item}>
                    <p>All sells:</p>
                    <span>{sellerBalance?.total_sales}</span>
                  </div>
                  <div className={styles.stats__graph__info__item}>
                    <p>Total income:</p>
                    <span>{sellerBalance?.total_amount} $</span>
                  </div>
                  <div className={styles.stats__graph__info__item}>
                    <p>Money on hold:</p>
                    <span>{sellerBalance?.hold_amount} $</span>
                  </div>
                </div>
                {/* <ResponsiveContainer width="100%" height={360}>
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
            </ResponsiveContainer> */}
              </div>
            </Block>
          </>
        ) : (
          <>
            <Skeleton width="100%" variant="rounded" height={120} />
            <Skeleton width="100%" variant="rounded" height={120} />
          </>
        )}
      </div>
    </div>
  );
};

export default SellerStats;
