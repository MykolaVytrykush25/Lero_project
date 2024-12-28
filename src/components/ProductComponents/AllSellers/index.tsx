"use client";

import { useState } from "react";
import { Avatar } from "@mui/material";

//styles
import styles from "./AllSellers.module.scss";

//components
import SellersList from "../SellersList";

//icons
import { KeyboardArrowRight } from "@mui/icons-material";
import { TProductOtherSellersOffer } from "@/redux/slices/products/types";

type TAllSellersProps = {
  minPrice: number;
  offers: TProductOtherSellersOffer[];
  photo: string;
}

const AllSellers: React.FC<TAllSellersProps> = ({ minPrice, offers, photo }) => {
  const [isSellersOpened, setIsSellersOpened] = useState<boolean>(false);

  return (
    <>
      <div className={styles.sellers} onClick={() => setIsSellersOpened(true)}>
        <Avatar src={photo} sx={{ width: 40, height: 40 }} />
        <div className={styles.sellers__info}>
          <p>All sellers</p>
          <span>From {minPrice?.toFixed(2)}$</span>
        </div>
        <span className={styles.sellers__count}>{offers?.length}</span>
        <KeyboardArrowRight color="primary" />
      </div>
      <SellersList offers={offers} open={isSellersOpened} onClose={() => setIsSellersOpened(false)} />
    </>
  );
};

export default AllSellers;
