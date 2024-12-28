"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { Skeleton } from "@mui/material";

//styles
import styles from "./MyPurchasesPage.module.scss";

//components
import ProductPurchasedItem from "@/components/ProductComponents/ProductPurchasedItem";
import CustomPagination from "@/components/CustomPagination";
import MainLayout from "@/components/MainLayout";
import EmptyState from "@/components/EmptyState";
import ProductTypeTabs from "@/components/ProductTypeTabs";
import PrivateRoute from "@/components/PrivateRoute";

//API
import { getPurchases } from "@/API/productsService";

//types
import { IProductPurchases } from "@/@types/products";
import { ProductTypes } from "@/@types/enums";

//data
import { useData } from "@/data";

//icons
import { RemoveShoppingCart } from "@mui/icons-material";


const MyPurchasesPage: NextPage = () => {
  const { showToast } = useToast();
  const { limit } = useData();
  const { t } = useTranslation("common");

  const [tab, setTab] = useState<ProductTypes>(ProductTypes.ALL);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<IProductPurchases | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await getPurchases({
          limit,
          page,
          type: tab !== ProductTypes.ALL ? tab : undefined,
          statuses: "paid",
        });
        setPurchases(data);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tab, page]);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            <h1>{t("myPurchasesPage.title")}</h1>
            <div className={styles.page__main}>
              <ProductTypeTabs tab={tab} setTab={setTab} />
              <div className={styles.page__main__list}>
                {isLoading ? (
                  [...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} width={"100%"} height={"80px"} variant="rounded" />
                  ))
                ) : purchases && purchases?.products?.length > 0 ? (
                  <div className={styles.page__main__list__table__wrapper}>
                    <div className={styles.page__main__list__table}>
                      <div className={styles.page__main__list__table__head}>
                        <p>Name</p>
                        <p>Amount</p>
                        <p>Date</p>
                      </div>
                      <div className={styles.page__main__list__table__body}>
                        {purchases?.products?.map((p, idx) => (
                          <div className={styles.page__main__list__table__body__row} key={idx}>
                            <ProductPurchasedItem
                              id={p.product.id}
                              purchaseId={p.purchase.id}
                              categoryId={p.product.category_id}
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
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    title="Your purchases will appear here"
                    desc="Explore other sections or start shopping to see your orders appear here!"
                    icon={<RemoveShoppingCart />}
                  />
                )}
                {!isLoading && purchases && purchases?.total_pages > 1 && (
                  <CustomPagination
                    onChange={(_, val) => setPage(val)}
                    page={page}
                    count={purchases.total_pages}
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

export default MyPurchasesPage;
