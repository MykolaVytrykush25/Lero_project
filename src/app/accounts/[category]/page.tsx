"use client";

import { capitalize } from "@mui/material";
import { notFound } from "next/navigation";

//styles
import styles from "./CategoryPage.module.scss";

//components
// import ProductItem from "@/components/ProductComponents/ProductItem";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const allowedCategories = [
  "twitter",
  "mail",
  "discord",
  "telegram",
  "instagram",
  "tiktok",
  "facebook",
];

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { category } = params;

  if (!allowedCategories.includes(category)) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__wrapper}>
        <h1>{capitalize(category)}</h1>
        <div className={styles.page__main}>
          {/* {[...Array(8)].map((_, idx) => (
            <ProductItem
              id={1} ///////
              key={idx}
              description="desc"
              imageUrl="/twitter.png"
              isVerified
              tags={[...Array(8)]}
              title="Аккаунты Telegram RU 1шт tdata для Telegram Portable exe - Ручная, Отлежка: 10 дн+, Пол: mix. AccsFarm"
              shopName="NVS Shop"
              countSellers={6}
              rating={4.5}
              price={0.3}
              piecesLeft={120}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
