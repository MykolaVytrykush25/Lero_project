"use client";

import { useState } from "react";

//styles
import styles from "./AccountsPage.module.scss";

//components
import CustomSelect from "@/components/CustomSelect";
// import Tags from "@/components/Tags";
// import ProductsPageBlock from "@/components/ProductComponents/ProductsPageBlock";

// //data
// import { useData } from "@/data";


const AccountsPage: React.FC = () => {
  const [platform, setPlatform] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [seller, setSeller] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  return (
    <div className={styles.page}>
      <div className={styles.page__wrapper}>
        <div className={styles.page__head}>
          <h1>Accounts market</h1>
          <div className={styles.page__head__filters}>
            <CustomSelect
              data={[]}
              placeholder="Platform"
              value={platform}
              setValue={setPlatform}
            />
            <CustomSelect data={[]} placeholder="Country" value={country} setValue={setCountry} />
            <CustomSelect data={[]} placeholder="Seller" value={seller} setValue={setSeller} />
            <CustomSelect data={[]} placeholder="Price" value={price} setValue={setPrice} />
          </div>
        </div>
        {/* <Tags tags={tags} /> */}
        <div className={styles.page__main}>
          {/* <ProductsPageBlock title="Twitter / X" subtitle="Накрутка" categorySlug="twitter" />
          <ProductsPageBlock title="Discord" subtitle="Накрутка" categorySlug="discord" />
          <ProductsPageBlock title="Telegram" subtitle="Накрутка" categorySlug="telegram" /> */}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
