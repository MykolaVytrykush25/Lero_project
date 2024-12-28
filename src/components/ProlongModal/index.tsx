import { Fade, Modal, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

//styles
import styles from "./ProlongModal.module.scss";

//components
import ModalHead from "../ModalHead";
import ProductPrices from "../ProductComponents/ProductPrices";

//API
import { getProduct } from "@/API/productsService";

//types
import { TModalProps } from "@/@types/base";
import { TProduct } from "@/redux/slices/products/types";

type TProlongModalProps = TModalProps & {
  id: number;
};

const ProlongModal: React.FC<TProlongModalProps> = ({ isOpened, handleClose, id }) => {
  const { t } = useTranslation("common");

  const [product, setProduct] = useState<TProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id && isOpened) {
      setIsLoading(true);
      (async () => {
        try {
          const data = await getProduct(id);
          setProduct(data);
        } catch (err) {
          handleClose();
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isOpened, id]);

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading={t("base.payForGoods")} />
            <div className={styles.modal__main}>
              {!isLoading
                ? product && (
                  <ProductPrices
                    isAccess={true}
                    variant="prolong"
                    unit={product.unit}
                    prices={product?.prices}
                    id={id}
                  />
                )
                : [...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} width={"100%"} height={48} variant="rounded" />
                ))}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ProlongModal;
