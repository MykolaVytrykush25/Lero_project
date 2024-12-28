import { Fade, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useToast } from "../ToastProvider";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";

//styles
import styles from "./PurchaseWindow.module.scss";

//components
import ModalHead from "../ModalHead";
import RadioBlock from "../RadioBlock";
import GrayContainedButton from "../GrayContainedButton";

//redux
import { userSelector } from "@/redux/slices/user/selectors";
import { fetchUser } from "@/redux/slices/user/asyncActions";

//API
import { makePurchase } from "@/API/productsService";

//types
import { TModalProps } from "@/@types/base";
import { PaymentTypes } from "@/@types/enums";
import { TPurchaseItemData } from "@/@types/products";

//data
import { useData } from "@/data";

type TPurchaseWindowProps = TModalProps & {
  price: number;
  afterSubmit?: () => void;
  items?: TPurchaseItemData[];
};

const PurchaseWindow: React.FC<TPurchaseWindowProps> = ({
  isOpened,
  handleClose,
  price,
  items,
  afterSubmit,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { t } = useTranslation("common");
  const { depositMethods } = useData();
  const { userData, isAuthenticated } = useSelector(userSelector);

  const [selectedPurchaseVariant, setSelectedPurchaseVariant] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const preparePurchaseData = () => {
    const baseData = {
      payment_type: selectedPurchaseVariant as PaymentTypes,
    };

    if (items && items.length === 1) {
      return { ...baseData, ...items[0] };
    }

    if (items && items.length > 1) {
      return { ...baseData, products: items };
    }

    return baseData;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await makePurchase(preparePurchaseData());

      if (!isAuthenticated) {
        await dispatch(fetchUser());
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        handleClose();
        router.push("/payment-success");
      }

      afterSubmit && afterSubmit();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpened) {
      if (userData && userData?.balance >= price) {
        setSelectedPurchaseVariant("balance");
      } else {
        setSelectedPurchaseVariant(depositMethods[0].value);
      }
    }
  }, [isOpened]);

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading={t("base.payForGoods")} />
            <div className={styles.modal__main}>
              <div className={styles.modal__main__methods}>
                {userData && userData?.balance >= price && (
                  <RadioBlock
                    text={t("base.balance")}
                    checked={selectedPurchaseVariant === "balance"}
                    value={"balance"}
                    setValue={setSelectedPurchaseVariant}
                  />
                )}
                {depositMethods.map((i, idx) => (
                  <RadioBlock
                    text={i.label}
                    checked={selectedPurchaseVariant === i.value}
                    key={idx}
                    value={i.value}
                    setValue={setSelectedPurchaseVariant}
                  />
                ))}
              </div>
              <div className={styles.modal__main__total}>
                <p>{t("base.total")}:</p>
                <span>{price.toFixed(2)}&nbsp;$</span>
              </div>
            </div>
            <div className={styles.modal__buttons}>
              <GrayContainedButton fullWidth onClick={handleClose}>
                Cancel
              </GrayContainedButton>
              <LoadingButton
                fullWidth
                loading={isLoading}
                disabled={!selectedPurchaseVariant}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                {t("base.proceedThePayment")}
              </LoadingButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default PurchaseWindow;
