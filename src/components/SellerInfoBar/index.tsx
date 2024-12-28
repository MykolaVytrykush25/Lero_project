import { capitalize } from "@mui/material";
import cn from "classnames";

//styles
import styles from "./SellerInfoBar.module.scss";

type TSellerInfoBarProps = {
  productType: string;
  sellerName?: string;
  className?: string;
};

const SellerInfoBar: React.FC<TSellerInfoBarProps> = ({ className, productType, sellerName }) => {
  return (
    <div className={cn(className, styles.bar)}>
      <span>{capitalize(productType)}</span>
      {sellerName && <p>{capitalize(sellerName)}</p>}
    </div>
  );
};

export default SellerInfoBar;
