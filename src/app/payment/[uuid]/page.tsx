"use client";

import { NextPage } from "next";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useToast } from "@/components/ToastProvider";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import cn from "classnames";
import { useParams, useRouter } from "next/navigation";

//styles
import styles from "./Payment.module.scss";

//components
import Timer from "@/components/Timer";
import CloseButton from "@/components/CloseButton";
import CustomSelect from "@/components/CustomSelect";

//API
import { getCryptoPaymentMethods, getInvoice, setInvoice } from "@/API/paymentService";

//utils
import { copyToClipboard } from "@/utils/copyToClipboard";

//icons
import { AttachMoney, Check, ContentCopy } from "@mui/icons-material";
import LogoIcon from "@/assets/icons/logo.svg";
import LogoTextIcon from "@/assets/icons/logo-text.svg";

//types
import { TCryptoCurrency, TInvoice } from "@/@types/payment";

const PaymentPage: NextPage = () => {
  const now = dayjs();

  const router = useRouter();
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { uuid }: { uuid: string } = useParams();

  const [fiatAmount, setFiatAmount] = useState<number>(0);
  const [cryptoAmount, setCryptoAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [cryptoCurrencies, setCryptoCurrencies] = useState<TCryptoCurrency[]>([]);
  const [crypto, setCrypto] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [variant, setVariant] = useState<"select" | "pay" | "paid">("select");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSelectMode = async () => {
    try {
      await setInvoice({ uuid, currency: crypto, network });
      const data: TInvoice = await getInvoice(uuid);

      if (data.is_active) isPayActive(data);
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  };

  const isPayActive = (data: TInvoice) => {
    const { network, currency, amount, to_address, expiration_dt, status } = data;

    setTimeLeft(dayjs(expiration_dt).diff(now, "seconds"));
    setVariant(status === "paid" ? "paid" : "pay");
    setNetwork(network);
    setCrypto(currency);
    setAddress(to_address);
    setCryptoAmount(amount);
  };

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const invoiceData: TInvoice = await getInvoice(uuid);

        if (!invoiceData.is_active) {
          const data = await getCryptoPaymentMethods();
          setCryptoCurrencies(data);
          setFiatAmount(invoiceData.amount_usd);

          if (data.length > 0) {
            setCrypto(data[0].currency);
            if (data[0].networks.length > 0) {
              setNetwork(data[0].networks[0]);
            }
          }
        } else {
          isPayActive(invoiceData);
        }
      } catch (error) {
        showToast("Failed to load data", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceData();

    const interval = setInterval(() => {
      fetchInvoiceData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page__payment}>
        <div className={styles.page__payment__wrapper}>
          <div className={styles.page__payment__head}>
            <div className={styles.page__payment__head__logo}>
              <LogoIcon />
              <LogoTextIcon />
            </div>
            <CloseButton onClick={() => router.push("/")} />
          </div>
          {!isLoading ? (
            <>
              {variant === "pay" && (
                <div className={cn(styles.page__payment__block, styles.page__payment__expiration)}>
                  {timeLeft > 0 && (
                    <div className={styles.page__payment__expiration__progress}>
                      <CircularProgress
                        sx={{ position: "absolute", left: 0, color: "#1C2430" }}
                        size={64}
                        value={100}
                        variant="determinate"
                      />
                      <CircularProgress
                        color="primary"
                        disableShrink
                        size={64}
                        sx={{
                          animationDuration: "1.5s",
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.page__payment__expiration__text}>
                    <p>{timeLeft > 0 ? "Expiration time" : "Invoice has been expired"}</p>
                    <Timer
                      totalTime={12 * 3600}
                      secondsToEnd={timeLeft}
                      className={styles.page__payment__expiration__text__timer}
                    />
                  </div>
                </div>
              )}
              {variant === "paid" && (
                <div className={cn(styles.page__payment__block, styles.page__payment__success)}>
                  <div className={styles.page__payment__success__img}>
                    <Check />
                  </div>
                  <p>Payment success</p>
                </div>
              )}
              {((timeLeft > 0 && variant === "pay") || variant === "select") && (
                <>
                  <div className={cn(styles.page__payment__block, styles.page__payment__fields)}>
                    {variant === "pay" && (
                      <div className={styles.page__payment__fields__qr}>
                        <QRCode value={address} size={160} />
                      </div>
                    )}
                    <div className={styles.page__payment__fields__main}>
                      <div className={styles.page__payment__fields__main__item}>
                        <p>
                          The <span>EXACT</span> amount to be sent
                        </p>
                        <TextField
                          value={`${variant === "select" ? fiatAmount : cryptoAmount} ${
                            variant === "pay" ? crypto : ""
                          }`}
                          fullWidth
                          type="text"
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    copyToClipboard(cryptoAmount.toString(), showToast)
                                  }
                                >
                                  {variant === "select" ? <AttachMoney /> : <ContentCopy />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      {variant === "select" ? (
                        <>
                          <CustomSelect
                            data={cryptoCurrencies.map((i) => ({
                              label: i.currency,
                              value: i.currency,
                            }))}
                            value={crypto}
                            setValue={setCrypto}
                            label="Cryptocurrency"
                          />
                          <CustomSelect
                            data={
                              cryptoCurrencies
                                .find((item) => item.currency === crypto)
                                ?.networks.map((network) => ({
                                  label: network,
                                  value: network,
                                })) || []
                            }
                            value={network}
                            setValue={setNetwork}
                            label="Network"
                          />
                        </>
                      ) : (
                        <div className={styles.page__payment__fields__main__item}>
                          <p>
                            Recipient&apos;s wallet address (Network <span>{network}</span>)
                          </p>
                          <TextField
                            value={address}
                            fullWidth
                            type="text"
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => copyToClipboard(address, showToast)}>
                                    <ContentCopy />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {variant === "select" && (
                    <Button onClick={handleSelectMode} variant="contained" color="primary">
                      Proceed to the payment
                    </Button>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Skeleton width="100%" variant="rounded" height={120} />
              <Skeleton width="100%" variant="rounded" height={240} />
            </>
          )}
          {variant === "paid" && (
            <Button href="/" variant="contained" color="primary">
              Return to homepage
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
