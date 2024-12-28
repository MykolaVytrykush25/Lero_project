"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";

//styles
import styles from "./TransactionsPage.module.scss";

//components
import ProductPurchasedItem from "@/components/ProductComponents/ProductPurchasedItem";
import DepositListItem from "@/components/DepositListItem";
import CustomPagination from "@/components/CustomPagination";
import EmptyState from "@/components/EmptyState";
import MainLayout from "@/components/MainLayout";
import PrivateRoute from "@/components/PrivateRoute";
import CustomSelect from "@/components/CustomSelect";
import ProductTypeTabs from "@/components/ProductTypeTabs";

//API
import { getPurchases } from "@/API/productsService";
import { getBalanceTransactions } from "@/API/userService";

//types
import { IProductPurchases } from "@/@types/products";
import { ProductTypes } from "@/@types/enums";
import { IBalanceTransactions } from "@/@types/user";

//data
import { useData } from "@/data";

//icons
import { MoneyOff } from "@mui/icons-material";


const TransactionsPage: NextPage = () => {
  const { showToast } = useToast();
  const { limit, statuses } = useData();
  const { t } = useTranslation("common");

  const [tab, setTab] = useState<ProductTypes>(ProductTypes.ALL);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("buy");
  const [page, setPage] = useState<number>(1);

  const [transactions, setTransactions] = useState<IProductPurchases | null>(null);
  const [balanceTransactions, setBalanceTransactions] = useState<IBalanceTransactions | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("all");

  const totalPages =
    type === "buy" ? transactions?.total_pages ?? 1 : balanceTransactions?.total_pages ?? 1;

  const handleChangeType = (_: React.MouseEvent<HTMLElement>, val: string) => {
    setCurrentStatus("all");
    val !== null && setType(val);
    setPage(1);
  };

  const handleTabChange = (val: ProductTypes) => {
    setTab(val);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (type === "buy") {
          const data = await getPurchases({
            limit,
            page,
            type: tab !== ProductTypes.ALL ? tab : undefined,
            statuses: currentStatus !== "all" ? currentStatus : undefined,
          });
          setTransactions(data);
        } else if (type === "deposit") {
          const data = await getBalanceTransactions({
            limit,
            page,
            statuses: currentStatus !== "all" ? currentStatus : undefined,
          });
          setBalanceTransactions(data);
        }
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tab, page, type, currentStatus]);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            <div className={styles.page__head}>
              <h1>Transactions</h1>
              <div className={styles.page__head__filters}>
                <ToggleButtonGroup
                  className={styles.page__head__filters__toggle}
                  fullWidth
                  size="small"
                  value={type}
                  exclusive
                  onChange={handleChangeType}
                >
                  <ToggleButton value="buy">Buy</ToggleButton>
                  <ToggleButton value="deposit">Deposit</ToggleButton>
                </ToggleButtonGroup>
                <CustomSelect
                  className={styles.page__head__filters__status}
                  data={statuses}
                  value={currentStatus}
                  setValue={handleStatusChange}
                  placeholder="All"
                />
              </div>
            </div>
            <div className={styles.page__main}>
              {type === "buy" && <ProductTypeTabs tab={tab} setTab={handleTabChange} />}
              <div className={styles.page__main__list}>
                {isLoading ? (
                  [...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} width={"100%"} height={"80px"} variant="rounded" />
                  ))
                ) : (type === "buy" && transactions && transactions?.products?.length > 0) ||
                  (type !== "buy" &&
                    balanceTransactions &&
                    balanceTransactions?.transactions?.length > 0) ? (
                  <div className={styles.page__main__list__table__wrapper}>
                    <div className={styles.page__main__list__table}>
                      <div className={styles.page__main__list__table__head}>
                        <p>Name</p>
                        <p>Amount</p>
                        <p>Date</p>
                        <p>Status</p>
                      </div>
                      <div className={styles.page__main__list__table__body}>
                        {type === "buy"
                          ? transactions?.products?.map((p, idx) => (
                            <div className={styles.page__main__list__table__body__row} key={idx}>
                              <ProductPurchasedItem
                                id={p.product.id}
                                categoryId={p.product.category_id}
                                purchaseId={p.purchase.id}
                                country={p.purchase.country}
                                sellerName={p?.seller.name}
                                productType={p?.product.type}
                                name={p?.product.title}
                                all={p.purchase.quantity.all}
                                left={p.purchase.quantity.left}
                                valid={p?.product.expiration_date}
                                isStatic={p.purchase.quantity.is_static}
                                unit={p.purchase.quantity.unit}
                                status={p.purchase.status}
                                date={p?.purchase.datetime}
                                variant="transaction"
                              />
                            </div>
                          ))
                          : balanceTransactions?.transactions.map((i, idx) => (
                            <div className={styles.page__main__list__table__body__row} key={idx}>
                              <DepositListItem
                                name="Deposit"
                                payment={i.payment_type}
                                amount={i.amount}
                                date={i.created_dt}
                                status={i.status}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    title={type === "buy" ? "No purchases found" : "Transaction history is empty"}
                    desc={
                      type === "buy"
                        ? "You haven't made any purchases yet"
                        : "You haven't made any transactions yet"
                    }
                    icon={<MoneyOff />}
                  />
                )}
                {!isLoading && totalPages > 1 && (
                  <CustomPagination
                    page={page}
                    count={
                      type === "buy" ? transactions?.total_pages : balanceTransactions?.total_pages
                    }
                    onChange={(_, val) => setPage(val)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default TransactionsPage;
