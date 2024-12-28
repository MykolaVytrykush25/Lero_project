"use client";

import { Fade, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useToast } from "../ToastProvider";
import { useState } from "react";
import { useTranslation } from "react-i18next";

//styles
import styles from "./DepositModal.module.scss";

//components
import RadioBlock from "../RadioBlock";
import NumericInput from "../NumericInput";
import ModalHead from "../ModalHead";

//API
import { deposit } from "@/API/userService";

//types
import { TModalProps } from "@/@types/base";

//data
import { useData } from "@/data";

const DepositModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { depositVariants, depositMethods } = useData();
  const router = useRouter();

  const initialDepositMethod = depositMethods?.[0]?.value || "";
  const initialDepositVariant = depositVariants?.[0] || "";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [depositMethod, setDepositMethod] = useState<string>(initialDepositMethod);
  const [selectedDepositValue, setSelectedDepositValue] = useState<string>(initialDepositVariant);
  const [individualDeposit, setIndividualDeposit] = useState<string>(initialDepositVariant);

  const handleChangeIndividualDeposit = (val: string) => {
    if (depositVariants.includes(val)) {
      setSelectedDepositValue(val);
    } else {
      setSelectedDepositValue("");
    }
    setIndividualDeposit(val);
  };

  const handleSelectDeposit = (val: string) => {
    setSelectedDepositValue(val);
    setIndividualDeposit(val);
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const amount = selectedDepositValue || individualDeposit;
      const data = await deposit({ amount, payment_type: depositMethod });

      if (data.url) {
        router.push(data.url);
      } else {
        showToast(t("error.paymentError"), "error");
      }
    } catch (err: any) {
      showToast(err?.response?.data?.error || t("error.default"), "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Modal open={isOpened} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading={t("base.deposit")} />
            <div className={styles.modal__main}>
              <div className={styles.modal__main__service}>
                {depositMethods.map((method, idx) => (
                  <RadioBlock
                    key={idx}
                    text={method.label}
                    value={method.value}
                    checked={depositMethod === method.value}
                    setValue={setDepositMethod}
                  />
                ))}
              </div>
              <div className={styles.modal__main__amount}>
                <p>{t("base.amount")}:</p>
                <div className={styles.modal__main__amount__fields}>
                  <div className={styles.modal__main__amount__fields__select}>
                    {depositVariants.map((i, idx) => (
                      <RadioBlock
                        key={idx}
                        text={`${i} $`}
                        checked={selectedDepositValue === i}
                        value={i}
                        setValue={handleSelectDeposit}
                      />
                    ))}
                  </div>
                  <NumericInput
                    label={t("base.yourAmount")}
                    maxLength={4}
                    value={individualDeposit}
                    setValue={handleChangeIndividualDeposit}
                  />
                </div>
              </div>
              <LoadingButton
                disabled={!individualDeposit || parseFloat(individualDeposit) < 1}
                onClick={handleCheckout}
                variant="contained"
                loading={isLoading}
                fullWidth
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

export default DepositModal;
