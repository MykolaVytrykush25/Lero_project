import Image from "next/image";
import { Button } from "@mui/material";

//styles
import styles from "./PaymentSuccessPage.module.scss";

//components
import MainLayout from "@/components/MainLayout";

const PaymentSuccessPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <h1>Payment successful</h1>
          <div className={styles.page__main}>
            <Image unoptimized alt="rainbow" src="/rainbow.gif" width={240} height={240} />\
            <Button href="/my-purchases" fullWidth variant="contained" color="primary">
              Go to my purchases
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
