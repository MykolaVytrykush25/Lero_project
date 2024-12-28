import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

//styles
import styles from "./DepositListItem.module.scss";

//components
import TransactionStatus from "@/components/TransactionStatus";
import SellerInfoBar from "@/components/SellerInfoBar";

//types
import { TransactionStatuses } from "@/@types/enums";

dayjs.extend(duration);

type TProductPurchasedItemProps = {
  name: string;
  date: string;
  payment: string;
  amount: number;
  status: TransactionStatuses;
};

const DepositListItem: React.FC<TProductPurchasedItemProps> = ({
  name,
  date,
  amount,
  payment,
  status,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__wrapper}>
        <p className={styles.item__title}>{`${name}`}</p>
        <p className={styles.item__amount}>{amount}$</p>
        <p className={styles.item__date}>{dayjs(date).format("DD.MM.YYYY")}</p>
        <TransactionStatus status={status} />
        <SellerInfoBar className={styles.item__seller} productType={payment} />
      </div>
    </div>
  );
};

export default DepositListItem;
