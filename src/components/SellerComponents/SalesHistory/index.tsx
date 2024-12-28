import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useData } from "@/data";
import { Skeleton } from "@mui/material";

//styles
import styles from "./SalesHistory.module.scss";

//components
import SellerInfoBar from "@/components/SellerInfoBar";
import CustomPagination from "@/components/CustomPagination";
import EmptyState from "@/components/EmptyState";

//API
import { getSalesHistory } from "@/API/sellerService";

//types
import { ISellHistory } from "@/@types/seller";

//icons
import { MoneyOff } from "@mui/icons-material";


const SalesHistory: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { limit } = useData();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<ISellHistory | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const data = await getSalesHistory({ page, limit });
        setHistory(data);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return (
    <div className={styles.history}>
      <div className={styles.history__wrapper}>
        {isLoading ? [...Array(5)].map((_, idx) => (
          <Skeleton key={idx} width={"100%"} height={"80px"} variant="rounded" />
        )) : history && history.sales.length > 0 ?
          <div className={styles.history__table__wrapper}>
            <div className={styles.history__table}>
              <div className={styles.history__table__head}>
                <p>Name</p>
                <p>Total</p>
                <p>Amount</p>
                <p>Date</p>
              </div>
              <div className={styles.history__table__body}>
                {history?.sales.map((i, idx) => (
                  <div className={styles.history__table__body__item} key={idx}>
                    <p className={styles.history__table__body__item__title}>
                      {i.product.title}
                    </p>
                    <p className={styles.history__table__body__item__amount}>{i.purchase.amount} $</p>
                    <p className={styles.history__table__body__item__quantity}>{i.purchase.quantity} PC</p>
                    <p className={styles.history__table__body__item__date}>{dayjs(i.purchase.dt).format('DD.MM.YYYY')}</p>
                    <SellerInfoBar
                      className={styles.history__table__body__item__type}
                      productType={i.product.type}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          :
          <EmptyState
            title="Your sales history will appear here"
            desc="Start making sales to see your history"
            icon={<MoneyOff />}
          />
        }
        {!isLoading && history && history.total_pages > 1 && (
          <CustomPagination
            onChange={(_, val) => setPage(val)}
            page={page}
            count={history.total_pages}
          />
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
