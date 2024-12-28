"use client";

import { Avatar } from "@mui/material";
import { useToast } from "@/components/ToastProvider";

//styles
import styles from "./ProductInfo.module.scss";

//components
import Block from "@/components/Block";
import CustomChip from "@/components/CustomChip";
import GrayContainedButton from "@/components/GrayContainedButton";
import SalesWithRating from "@/components/SalesWithRating";

//types
import { TProductTag } from "@/redux/slices/products/types";

//utils
import { copyToClipboard } from "@/utils/copyToClipboard";

//icons
import { ContentCopy } from "@mui/icons-material";

type TProductInfoProps = {
  title: string;
  tags: TProductTag[];
  rating: number;
  sellerName: string;
  shortDescription: string;
  photo: string;
};

const ProductInfo: React.FC<TProductInfoProps> = ({
  title,
  tags,
  rating,
  sellerName,
  shortDescription,
  photo,
}) => {
  const { showToast } = useToast();

  return (
    <Block className={styles.item}>
      <div className={styles.item__wrapper}>
        <div className={styles.item__main}>
          <Avatar src={photo} sx={{ width: 64, height: 64 }} />
          <div className={styles.item__main__info}>
            <h3 className={styles.item__main__info__title}>{title}</h3>
            {shortDescription && (
              <p className={styles.item__main__info__description}>{shortDescription}</p>
            )}
            {tags.length > 0 && (
              <div className={styles.item__main__info__tags}>
                {tags.map((i, idx) => (
                  <CustomChip isActive={false} label={i.name} key={idx} />
                ))}
              </div>
            )}
            <SalesWithRating rating={rating} sellerName={sellerName} />
          </div>
        </div>
        <GrayContainedButton
          className={styles.item__copy}
          size="small"
          rounded
          onClick={() => copyToClipboard(window.location.href, showToast)}
          colorText="primary"
        >
          <ContentCopy />
          Copy link
        </GrayContainedButton>
      </div>
    </Block>
  );
};

export default ProductInfo;
