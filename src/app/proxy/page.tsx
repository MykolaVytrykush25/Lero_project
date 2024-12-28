"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
import { capitalize } from "@mui/material";
import { useSelector } from "react-redux";

// styles
import styles from "./Proxy.module.scss";

//components
import CustomSelect from "@/components/CustomSelect";
import ProductsPageBlock from "@/components/ProductComponents/ProductsPageBlock";
import ProductsPageBlockSkeleton from "@/components/ProductComponents/ProductsPageBlockSkeleton";
import MainLayout from "@/components/MainLayout";
import Tags from "@/components/Tags";

//redux
import { productsSelector } from "@/redux/slices/products/selectors";
import { getProductsAsync } from "@/redux/slices/products/asyncActions";

//types
import { ProductTypes } from "@/@types/enums";
import { Status } from "@/@types/base";

const ProxyPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useSelector(productsSelector);
  const { t } = useTranslation("common");

  const [activeTags, setActiveTags] = useState<number[]>([]);
  const [platform, setPlatform] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [seller, setSeller] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    dispatch(
      getProductsAsync({
        type: ProductTypes.PROXY,
        tags: activeTags.length > 0 ? activeTags.join(",") : undefined,
      })
    );
  }, [activeTags]);

  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <div className={styles.page__head}>
            <h1>{t("proxyPage.title")}</h1>
            {process.env.NODE_ENV === "development" && (
              <div className={styles.page__head__filters}>
                <CustomSelect
                  data={[]}
                  placeholder="Platform"
                  value={platform}
                  setValue={setPlatform}
                />
                <CustomSelect
                  data={[]}
                  placeholder="Country"
                  value={country}
                  setValue={setCountry}
                />
                <CustomSelect data={[]} placeholder="Seller" value={seller} setValue={setSeller} />
                <CustomSelect data={[]} placeholder="Price" value={price} setValue={setPrice} />
              </div>
            )}
          </div>
          <Tags activeTags={activeTags} setActiveTags={setActiveTags} type={ProductTypes.PROXY} />
          <div className={styles.page__main}>
            {products
              ? Object.entries(products).map(([category, productArray]) => (
                  <ProductsPageBlock
                    key={category}
                    title={capitalize(category)}
                    products={productArray}
                  />
                ))
              : status === Status.LOADING && <ProductsPageBlockSkeleton />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProxyPage;
