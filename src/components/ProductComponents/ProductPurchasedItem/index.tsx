import dayjs from "dayjs";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";
import duration from "dayjs/plugin/duration";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

//styles
import styles from "./ProductPurchasedItem.module.scss";

//components
import IconButton from "@/components/IconButton";
import ProlongModal from "@/components/ProlongModal";
import TransactionStatus from "@/components/TransactionStatus";
import SellerInfoBar from "@/components/SellerInfoBar";

//API
import { getProductData } from "@/API/productsService";

//types
import { ProductTypes, TransactionStatuses, Units } from "@/@types/enums";

//icons
import { Download, ShoppingCartOutlined, Visibility } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

dayjs.extend(duration);

type TProductPurchasedItemProps = {
  id: number;
  purchaseId: number;
  name: string;
  country?: string;
  all: number;
  left: number;
  isStatic: boolean;
  unit: Units;
  valid: string;
  date: string;
  sellerName: string;
  categoryId: number;
  status: TransactionStatuses;
  productType: ProductTypes;
  variant?: "transaction" | "purchase";
};

const ProductPurchasedItem: React.FC<TProductPurchasedItemProps> = ({
  id,
  purchaseId,
  name,
  valid,
  date,
  productType,
  all,
  left,
  isStatic,
  unit,
  sellerName,
  status,
  country,
  categoryId,
  variant = "purchase",
}) => {
  const { showToast } = useToast();
  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProlongWindowOpened, setIsProlongWindowOpened] = useState<boolean>(false);

  const isPurchase = variant === "purchase";
  const daysLeft = dayjs(valid).diff(dayjs(), "day");

  const getDate = () => {
    if (isPurchase && productType === ProductTypes.PROXY) {
      return `${dayjs(date).format("DD.MM.YYYY")} / ${daysLeft > 0 ? `${daysLeft} days` : "Expired"
        }`;
    } else {
      return dayjs(date).format("DD.MM.YYYY");
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const data = await getProductData(purchaseId);

      const blob = new Blob([data], { type: "text/plain" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${uuidv4()}.txt`;
      document.body.appendChild(link);

      link.click();

      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.item}>
      <div
        className={cn(
          styles.item__wrapper,
          isPurchase ? styles.item__purchase : styles.item__transaction
        )}
      >
        <p className={styles.item__title}>{`${name} ${country ? `(${country})` : ""}`}</p>
        <p className={styles.item__amount}>
          {isStatic ? `${all}${unit}` : `${left.toFixed(2)}${unit} / ${all.toFixed(2)}${unit}`}
        </p>
        <p className={styles.item__date}>{getDate()}</p>
        {!isPurchase && <TransactionStatus status={status} />}
        <div className={styles.item__actions}>
          <IconButton
            disabled={isStatic}
            variant="tertiary"
            onClick={() => setIsProlongWindowOpened(true)}
            icon={<ShoppingCartOutlined />}
          />
          {isPurchase &&
            (productType === ProductTypes.PROXY ? (
              <Link href={`/generate-proxy?selected=${purchaseId}&category=${categoryId}`}>
                <IconButton variant="primary" icon={<Visibility />} />
              </Link>
            ) : (
              <IconButton
                disabled={isLoading}
                onClick={handleDownload}
                variant="primary"
                icon={isLoading ? <CircularProgress size={24} color="inherit" /> : <Download />}
              />
            ))}
        </div>
        <SellerInfoBar
          className={styles.item__seller}
          productType={productType}
          sellerName={sellerName}
        />
        <ProlongModal
          id={id}
          isOpened={isProlongWindowOpened}
          handleClose={() => setIsProlongWindowOpened(false)}
        />
      </div>
    </div>
  );
};

export default ProductPurchasedItem;
