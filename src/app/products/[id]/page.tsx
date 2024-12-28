"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { Skeleton } from "@mui/material";

import styles from "./ProductPage.module.scss";

//components
import ProductInfo from "@/components/ProductComponents/ProductInfo";
import ProductPrices from "@/components/ProductComponents/ProductPrices";
import MainLayout from "@/components/MainLayout";
import ProductTabs from "@/components/ProductComponents/ProductTabs";
import AllSellers from "@/components/ProductComponents/AllSellers";

//API
import { getProduct } from "@/API/productsService";

//redux
import { changeBreadcrumbs } from "@/redux/slices/breadcrumbs/slice";
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { TProduct } from "@/redux/slices/products/types";

const ProductPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { userData } = useSelector(userSelector);
  const { id } = useParams();
  const router = useRouter();

  const parsedId = parseInt(id as string);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<TProduct | null>(null);

  useEffect(() => {
    if (product) {
      dispatch(changeBreadcrumbs({ type: product?.type, name: product?.title }));
    }
  }, [dispatch, product]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(parsedId);
        setProduct(data);
      } catch (err) {
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <div className={styles.page__main}>
            <div className={styles.page__main__content}>
              {isLoading ? (
                <>
                  <Skeleton width="100%" height={240} variant="rounded" />
                  <Skeleton width="100%" height={160} variant="rounded" />
                </>
              ) : (
                product && (
                  <>
                    <ProductInfo
                      photo={product.photo}
                      shortDescription={product.short_description}
                      tags={product.tags}
                      title={product?.title}
                      rating={product.rating}
                      sellerName={product.seller_info.name}
                    />
                    <ProductTabs
                      id={product.id}
                      reviewAccess={product.review_access}
                      productId={product.id}
                      description={product.description}
                    />
                  </>
                )
              )}
            </div>
            <div className={styles.page__main__sidebar}>
              {isLoading ? (
                <>
                  <Skeleton width="100%" height={320} variant="rounded" />
                </>
              ) : (
                product && (
                  <>
                    <ProductPrices
                      isAccess={userData?.username !== product.seller_info.name}
                      category={product.category}
                      piecesLeft={product.in_stock}
                      unit={product.unit}
                      sold={product.sold}
                      prices={product?.prices}
                      id={parsedId}
                    />
                    {product.other_offers?.offers.length > 0 && (
                      <AllSellers
                        photo={product.other_offers.offers[0].product.photo}
                        minPrice={product.other_offers.min_price}
                        offers={product.other_offers.offers}
                      />
                    )}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
