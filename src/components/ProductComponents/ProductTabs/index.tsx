"use client";

import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Skeleton, Tab } from "@mui/material";
import { useData } from "@/data";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";

//styles
import styles from "./ProductTabs.module.scss";

//components
import Block from "@/components/Block";
import Review from "../Review";
import CustomPagination from "@/components/CustomPagination";
import SellerRate from "@/components/SellerRate";

//API
import { getProductReviews } from "@/API/productsService";

//types
import { IProductReviews } from "@/@types/products";

type TProductTabsProps = {
  id: number;
  reviewAccess: boolean;
  productId: number;
  description: string;
};

const ProductTabs: React.FC<TProductTabsProps> = ({ productId, description, reviewAccess, id }) => {
  const { t } = useTranslation("common");
  const { limit } = useData();
  const { showToast } = useToast();

  const [currentTab, setCurrentTab] = useState<string>("overview");
  const [page, setPage] = useState<number>(1);
  const [reviews, setReviews] = useState<IProductReviews | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentTab === "reviews") {
      setIsLoading(true);
      (async () => {
        try {
          const data = await getProductReviews({ product_id: productId, limit, page });
          setReviews(data);
        } catch (err: any) {
          showToast(err?.response?.data?.message || t("base.defaultError"), "error");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [currentTab, page]);

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(_, val) => setCurrentTab(val)}>
            <Tab label="Overview" value="overview" />
            <Tab label="Reviews" value="reviews" />
          </TabList>
        </Box>
        <TabPanel value="overview" sx={{ padding: "0" }}>
          <div className={styles.tab}>
            <Block className={styles.tab__overview}>
              <div className={styles.tab__overview__wrapper}>
                <h4>Description</h4>
                <p className={styles.tab__overview__description}>{description}</p>
              </div>
            </Block>
          </div>
        </TabPanel>
        <TabPanel value="reviews" sx={{ padding: "0" }}>
          <div className={styles.tab}>
            <div className={styles.tab__review}>
              {reviews && <SellerRate id={id} countReviews={reviews.reviews_count} rating={reviews.seller_rating} access={reviewAccess} />}
              <div className={styles.tab__review__comments}>
                {!isLoading
                  ? reviews?.reviews.map((i, idx) => (
                    <Review
                      key={idx}
                      avatar={i.user.avatar}
                      rating={i.rating}
                      date={i.created_at}
                      text={i.text}
                      author={i.user.name}
                    />
                  ))
                  : [...Array(6)].map((_, idx) => (
                    <Skeleton variant="rounded" key={idx} width={"100%"} height={100} />
                  ))}
                {!isLoading && reviews && reviews.total_pages > 1 && (
                  <CustomPagination
                    page={page}
                    count={reviews.total_pages}
                    onChange={(_, val) => setPage(val)}
                  />
                )}
              </div>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ProductTabs;
