import { Avatar } from "@mui/material";
import Link from "next/link";

//styles
import styles from "./ProductListItem.module.scss";

//components
import Price from "@/components/Price";
import PiecesLeftProgress from "@/components/PiecesLeftProgress";
import SellerInfoBar from "@/components/SellerInfoBar";

//types
import { ProductTypes } from "@/@types/enums";

type TProductListItemProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  piecesLeft: number;
  productType: ProductTypes;
  sellerName: string;
};

const ProductListItem: React.FC<TProductListItemProps> = ({
  id,
  title,
  imageUrl,
  description,
  price,
  piecesLeft,
  productType,
  sellerName,
}) => {
  return (
    <Link href={`/products/${id}`} className={styles.item}>
      <div className={styles.item__wrapper}>
        <Avatar src={imageUrl} sx={{ width: 40, height: 40 }} />
        <div className={styles.item__main}>
          <SellerInfoBar productType={productType} sellerName={sellerName} />
          <h4>{title}</h4>
          <p className={styles.item__main__description}>{description}</p>
          <div className={styles.item__main__footer}>
            <Price price={price} />
            <PiecesLeftProgress piecesLeft={piecesLeft} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
