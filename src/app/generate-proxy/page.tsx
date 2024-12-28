"use client";

import { NextPage } from "next";
import qs from "qs";
import { Autocomplete, Box, Button, capitalize, Divider, Tab, TextField } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { useTranslation } from "react-i18next";
import random from "lodash.random";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TabContext, TabList } from "@mui/lab";
import { useToast } from "@/components/ToastProvider";

//styles
import styles from "./GenerateProxyPage.module.scss";

//components
import Block from "@/components/Block";
import RadioBlock from "@/components/RadioBlock";
import TrafficProgress from "@/components/TrafficProgress";
import GrayContainedButton from "@/components/GrayContainedButton";
import PrivateRoute from "@/components/PrivateRoute";
import CustomSelect from "@/components/CustomSelect";
import Loader from "@/components/Loader";
import Fade from "@/components/Animations/Fade";
import InfoText from "@/components/InfoText";
import NumericInput from "@/components/NumericInput";
import ProlongModal from "@/components/ProlongModal";
import MainLayout from "@/components/MainLayout";
import EmptyState from "@/components/EmptyState";

//API
import { getPurchases } from "@/API/productsService";
import { getProxyGeo, getProxyInfo } from "@/API/proxyService";

//types
import { ProductTypes, Units } from "@/@types/enums";
import { IProductPurchases } from "@/@types/products";
import { TSelectData } from "@/@types/base";
import { TProxyProtocol, TProxyPurchaseInfo } from "@/@types/proxy";

//utils
import generateRandomString from "@/utils/generateRandomString";
import formatProxyGeoData from "@/utils/formatProxyGeoData";

//data
import { useData } from "@/data";

//icons
import { Check, ContentCopy, ExpandMore, Public, VpnLock } from "@mui/icons-material";

const GenerateProxyPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { countryTypes, formats, protocols, sessionTypes } = useData();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProxyLoading, setIsProxyLoading] = useState<boolean>(true);
  const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);
  const [isProlongWindowOpened, setIsProlongWindowOpened] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("1");

  const [proxyList, setProxyList] = useState<string[]>([]);

  const [purchases, setPurchases] = useState<IProductPurchases | null>(null);
  const [proxyPurchaseInfo, setProxyPurchaseInfo] = useState<TProxyPurchaseInfo>(Object());
  const [purchaseCountries, setPurchaseCountries] = useState<TSelectData[]>([]);
  const [purchaseStates, setPurchaseStates] = useState<TSelectData[]>([]);
  const [purchaseCities, setPurchaseCities] = useState<TSelectData[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedProtocol, setSelectedProtocol] = useState<string>(protocols[0].value);
  const [selectedFormat, setSelectedFormat] = useState<string>(formats[0].value);
  const [isRandomLocation, setIsRandomLocation] = useState<string>(countryTypes[0].value);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCountryState, setSelectedCountryState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>(sessionTypes[1].value);
  const [selectedTTL, setSelectedTTL] = useState<string>("");
  const [selectedCount, setSelectedCount] = useState<string>("100");

  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState<boolean>(false);
  const [isCategoryInitialized, setIsCategoryInitialized] = useState<boolean>(false);

  const selectedPlan = purchases?.products?.find(
    (p) => p.purchase.id.toString() === selectedProvider
  );

  const isStatic = selectedPlan?.product.category === "isp";

  const handleCopyAllToClipboard = () => {
    setIsCopied(true);

    const allProxies = proxyList.join("\n");
    navigator.clipboard.writeText(allProxies).then(() => {
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const handleChangePurchase = async (val: string) => {
    if (selectedProvider === val) return;

    setIsProxyLoading(true);
    setSelectedProvider(val);

    setIsRandomLocation("0");
    setSelectedSessionType("static");
    setSelectedTTL("");
    setSelectedCountry("");
    setSelectedCountryState("");
    setSelectedCity("");

    try {
      const data = await getProxyInfo(val);
      setProxyPurchaseInfo(data);

      if (data.ttl) {
        const ttlValues: any = Object.values(data.ttl);
        if (ttlValues.length >= 6) {
          setSelectedTTL(ttlValues[5].toString());
        } else if (ttlValues.length > 0) {
          setSelectedTTL(ttlValues[0].toString());
        }
      }

      const selectedPurchase = purchases?.products?.find((p) => p.purchase.id.toString() === val);

      const countries = await getProxyGeo({
        provider: selectedPurchase?.seller.name,
      });

      setPurchaseCountries(formatProxyGeoData(countries));

      if (data.ttl) {
        const ttlValues = Object.values(data.ttl);
        const fifthTtl: any = ttlValues[5] || ttlValues[0];
        setSelectedTTL(fifthTtl.toString());
      }
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsProxyLoading(false);
    }
  };

  const handleChangeSessionType = (val: string) => {
    if (val === "dynamic") {
      setSelectedTTL("");
    } else if (val === "static" && proxyPurchaseInfo?.ttl) {
      const ttlValues = Object.values(proxyPurchaseInfo.ttl);
      setSelectedTTL(ttlValues.length > 0 ? ttlValues[0].toString() : "");
    }

    setSelectedSessionType(val);
  };

  const handleChangeLocation = (val: string) => {
    if (val === "0") {
      setSelectedCountry("");
      setSelectedCountryState("");
      setSelectedCity("");
    }

    setIsRandomLocation(val);
  };

  const handleSelectCountry = async (newValue: TSelectData | null) => {
    const val = newValue?.value;

    if (val) {
      setSelectedCountry(val);
      setSelectedCountryState("");
      setSelectedCity("");

      try {
        const states = await getProxyGeo({
          country_code: val,
          provider: selectedPlan?.seller.name,
        });
        setPurchaseStates(formatProxyGeoData(states));
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      }
    }
  };

  const handleSelectState = async (val: string) => {
    setSelectedCountryState(val);

    try {
      const cities = await getProxyGeo({
        country_code: selectedCountry,
        state: val,
        provider: selectedPlan?.seller.name,
      });
      setPurchaseCities(formatProxyGeoData(cities));
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  };

  const generateProxy = () => {
    if (!selectedCount || +selectedCount > 10000 || +selectedCount < 1) {
      return;
    }

    const proxyList: string[] = [];
    const isStatic = Array.isArray(proxyPurchaseInfo);

    const processProxyInfo = (proxyInfo: TProxyPurchaseInfo) => {
      const { protocols, login, password, sess_time, session, location, delimiter } = proxyInfo;

      const host =
        selectedSessionType === "dynamic"
          ? protocols?.rotating[selectedProtocol as keyof TProxyProtocol]?.host
          : selectedSessionType === "static"
          ? protocols?.sticky[selectedProtocol as keyof TProxyProtocol]?.host
          : null;

      const portsArray =
        selectedSessionType === "dynamic"
          ? protocols?.rotating[selectedProtocol as keyof TProxyProtocol]?.port
          : selectedSessionType === "static"
          ? protocols?.sticky[selectedProtocol as keyof TProxyProtocol]?.port
          : [];

      const locationPrefix = selectedCountry && `${delimiter}${location.country}`;
      const country = selectedCountry && `${delimiter}${selectedCountry}`;
      const state =
        selectedCountryState && `${delimiter}${location.state}${delimiter}${selectedCountryState}`;
      const city = selectedCity && `${delimiter}${location.city}${delimiter}${selectedCity}`;

      for (let i = 0; i < +selectedCount; i++) {
        const port = random(+portsArray[0], +portsArray[1]);
        const sessionPrefix = `${delimiter}${session}${delimiter}${generateRandomString(8)}`;
        const sessionTimePrefix =
          selectedTTL && `${sessionPrefix}${delimiter}${sess_time}${delimiter}${selectedTTL}`;

        let proxyString = `${selectedProtocol}://`;

        switch (selectedFormat) {
          case "1":
            proxyString += `${host}:${port}:${login}${locationPrefix}${country}${state}${city}${sessionTimePrefix}:${password}`;
            break;
          case "2":
            proxyString += `${host}:${port}@${login}${locationPrefix}${country}${state}${city}${sessionTimePrefix}:${password}`;
            break;
          case "3":
            proxyString += `${login}${locationPrefix}${country}${state}${city}${sessionTimePrefix}:${password}@${host}:${port}`;
            break;
          case "4":
            proxyString += `${login}${locationPrefix}${country}${state}${city}${sessionTimePrefix}:${password}:${host}:${port}`;
            break;
          default:
            return;
        }

        proxyList.push(proxyString);
      }
    };

    if (isStatic) {
      proxyPurchaseInfo.forEach(processProxyInfo);
    } else {
      processProxyInfo(proxyPurchaseInfo);
    }

    setProxyList(proxyList);
  };

  useEffect(() => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const { selected, category } = queryParams;

    if (selected) setSelectedId(selected as string);
    if (category) setSelectedCategory(category as string);

    setIsCategoryInitialized(true);
  }, []);

  useEffect(() => {
    if (!isCategoryInitialized || !selectedCategory) return;

    setIsLoading(true);
    const fetchPurchases = async () => {
      try {
        const data = await getPurchases({
          type: ProductTypes.PROXY,
          page: 1,
          limit: 10,
          category: selectedCategory,
        });
        setPurchases(data);
      } catch (err) {
        router.push("/404");
      } finally {
        setIsLoading(false);
        setIsInitialLoadComplete(true);
      }
    };

    fetchPurchases();
  }, [selectedCategory, isCategoryInitialized]);

  useEffect(() => {
    if (!isInitialLoadComplete || !purchases || purchases.products.length === 0) return;

    const selectedProduct = purchases.products.find(
      (product) => product.purchase.id.toString() === selectedId?.toString()
    );

    const idToSelect = selectedProduct
      ? selectedProduct.purchase.id.toString()
      : purchases.products[0].purchase.id.toString();

    if (selectedPlan && selectedPlan.purchase.id.toString() === idToSelect) {
      return;
    }

    handleChangePurchase(idToSelect);
    setSelectedId(idToSelect);
  }, [isInitialLoadComplete, purchases, selectedId]);

  useEffect(() => {
    const protocols = Array.isArray(proxyPurchaseInfo)
      ? proxyPurchaseInfo[0]?.protocols
      : proxyPurchaseInfo.protocols;

    if (protocols) {
      generateProxy();
    }
  }, [
    proxyPurchaseInfo,
    selectedFormat,
    selectedProtocol,
    selectedSessionType,
    selectedTTL,
    selectedCount,
    selectedCountry,
    selectedCountryState,
    selectedCity,
    isRandomLocation,
  ]);

  useEffect(() => {
    if (Array.isArray(proxyPurchaseInfo)) {
      setSelectedCount(proxyPurchaseInfo.length.toString());
    } else {
      setSelectedCount("100");
    }
  }, [proxyPurchaseInfo]);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            <h1>{t("generateProxyPage.title")}</h1>
            <TabContext value={selectedCategory}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={(_, val) => setSelectedCategory(val)}>
                  <Tab label="Residential" value="1" />
                  <Tab label="ISP" value="2" />
                  <Tab label="Datacenter" value="3" />
                </TabList>
              </Box>
            </TabContext>
            {!isLoading ? (
              <div className={styles.page__main}>
                {purchases && purchases.products.length > 0 ? (
                  <>
                    <div className={styles.page__main__head}>
                      <Block className={styles.page__main__generate}>
                        <div className={styles.page__main__generate__wrapper}>
                          <div className={styles.page__main__generate__providers}>
                            <div className={styles.page__main__generate__providers__proxy}>
                              <InfoText
                                text={`${t("generateProxyPage.availableOrders.title")}:`}
                                tooltip={t("generateProxyPage.availableOrders.tooltip")}
                              />
                              <div className={styles.page__main__generate__providers__proxy__list}>
                                {purchases?.products.map((i, idx) => (
                                  <RadioBlock
                                    key={idx}
                                    width="max-content"
                                    checked={selectedProvider === i?.purchase.id?.toString()}
                                    tooltip={
                                      i.product.category === "isp" ? i.purchase.country : undefined
                                    }
                                    icon={i.product.category === "isp" && <Public />}
                                    text={
                                      <div
                                        className={
                                          styles.page__main__generate__providers__proxy__list__item
                                        }
                                      >
                                        {capitalize(i.seller.name)}&nbsp;
                                        <span>#{i.purchase.id}</span>
                                      </div>
                                    }
                                    value={i?.purchase.id?.toString()}
                                    setValue={handleChangePurchase}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className={styles.page__main__generate__providers__protocol}>
                              <div
                                className={styles.page__main__generate__providers__protocol__item}
                              >
                                <InfoText
                                  text={`${t("generateProxyPage.protocol.title")}:`}
                                  tooltip={t("generateProxyPage.protocol.tooltip")}
                                />
                                <div
                                  className={
                                    styles.page__main__generate__providers__protocol__item__list
                                  }
                                >
                                  {protocols.map((i, idx) => (
                                    <RadioBlock
                                      key={idx}
                                      width="max-content"
                                      checked={selectedProtocol === i.value}
                                      text={i.label}
                                      value={i.value}
                                      setValue={setSelectedProtocol}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div
                                className={styles.page__main__generate__providers__protocol__item}
                              >
                                <InfoText
                                  text={`${t("generateProxyPage.format.title")}:`}
                                  tooltip={t("generateProxyPage.format.tooltip")}
                                />
                                <CustomSelect
                                  data={formats}
                                  value={selectedFormat}
                                  setValue={setSelectedFormat}
                                />
                              </div>
                            </div>
                          </div>
                          <Divider />
                          <div className={styles.page__main__generate__actions}>
                            <GrayContainedButton
                              disabled={isStatic}
                              fullWidth
                              onClick={() => setIsOptionsOpened(!isOptionsOpened)}
                            >
                              {isOptionsOpened
                                ? t("generateProxyPage.hideMoreOptions")
                                : t("generateProxyPage.showMoreOptions")}
                            </GrayContainedButton>
                          </div>
                        </div>
                      </Block>
                      <Block className={styles.page__main__traffic}>
                        <div className={styles.page__main__traffic__wrapper}>
                          <TrafficProgress
                            unit={selectedPlan?.purchase.quantity.unit as Units}
                            isStatic={selectedPlan?.purchase.quantity.is_static}
                            leftTraffic={selectedPlan?.purchase.quantity.left || 0}
                            allTraffic={selectedPlan?.purchase?.quantity?.all || 0}
                          />
                          {selectedPlan?.product.category !== "isp" && (
                            <Button
                              onClick={() => setIsProlongWindowOpened(true)}
                              fullWidth
                              variant="contained"
                            >
                              {t("base.prolong")}
                            </Button>
                          )}
                        </div>
                      </Block>
                      <ProlongModal
                        id={selectedPlan?.product.id as number}
                        handleClose={() => setIsProlongWindowOpened(false)}
                        isOpened={isProlongWindowOpened}
                      />
                    </div>
                    <Fade open={isOptionsOpened && selectedPlan?.product.category !== "isp"}>
                      <Block className={styles.page__main__info}>
                        <div className={styles.page__main__info__wrapper}>
                          <div className={styles.page__main__info__location}>
                            <InfoText
                              text={`${t("generateProxyPage.location.title")}:`}
                              tooltip={t("generateProxyPage.location.tooltip")}
                            />
                            <div className={styles.page__main__info__location__list}>
                              {countryTypes.map((i, idx) => (
                                <RadioBlock
                                  key={idx}
                                  text={i.label}
                                  value={i.value}
                                  setValue={handleChangeLocation}
                                  checked={isRandomLocation === i.value}
                                />
                              ))}
                              <Autocomplete
                                disabled={
                                  isRandomLocation !== "1" || purchaseCountries?.length === 0
                                }
                                value={
                                  purchaseCountries.find(
                                    (country) => country.value === selectedCountry
                                  ) || null
                                }
                                onChange={(_, newValue) => handleSelectCountry(newValue)}
                                options={purchaseCountries}
                                getOptionLabel={(option) => option.label || option.value}
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                                clearIcon={null}
                                popupIcon={<ExpandMore />}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder={t("generateProxyPage.location.options.country")}
                                  />
                                )}
                              />
                              <CustomSelect
                                disabled={
                                  isRandomLocation !== "1" ||
                                  !selectedCountry ||
                                  purchaseStates?.length === 0
                                }
                                placeholder={t("generateProxyPage.location.state")}
                                data={purchaseStates}
                                value={selectedCountryState}
                                setValue={handleSelectState}
                              />
                              <CustomSelect
                                disabled={
                                  isRandomLocation !== "1" ||
                                  !selectedCountry ||
                                  !selectedCountryState ||
                                  purchaseCities?.length === 0
                                }
                                placeholder={t("generateProxyPage.location.city")}
                                data={purchaseCities}
                                value={selectedCity}
                                setValue={setSelectedCity}
                              />
                            </div>
                          </div>
                          <div className={styles.page__main__info__session}>
                            <div className={styles.page__main__info__session__list}>
                              {sessionTypes.map((i, idx) => (
                                <div
                                  key={idx}
                                  className={styles.page__main__info__session__list__item}
                                >
                                  {idx === 0 && (
                                    <InfoText
                                      text={`${t("generateProxyPage.sessionType.title")}:`}
                                      tooltip={t("generateProxyPage.sessionType.tooltip")}
                                    />
                                  )}
                                  <RadioBlock
                                    text={i.label}
                                    value={i.value}
                                    setValue={handleChangeSessionType}
                                    checked={selectedSessionType === i.value}
                                  />
                                </div>
                              ))}
                              <div className={styles.page__main__info__session__list__item}>
                                <InfoText
                                  text={`${t("generateProxyPage.ttl.title")}:`}
                                  tooltip={t("generateProxyPage.ttl.tooltip")}
                                />
                                <CustomSelect
                                  placeholder={t("generateProxyPage.ttl.title")}
                                  disabled={
                                    selectedSessionType !== "static" || !proxyPurchaseInfo?.ttl
                                  }
                                  data={
                                    proxyPurchaseInfo?.ttl
                                      ? Object.entries(proxyPurchaseInfo.ttl).map(
                                          ([label, value]) => ({
                                            label,
                                            value: value.toString(),
                                          })
                                        )
                                      : []
                                  }
                                  value={selectedTTL}
                                  setValue={setSelectedTTL}
                                />
                              </div>
                              <div className={styles.page__main__info__session__list__item}>
                                <InfoText
                                  text={`${t("generateProxyPage.count.title")}:`}
                                  tooltip={t("generateProxyPage.count.tooltip")}
                                />
                                <NumericInput
                                  maxLength={5}
                                  value={selectedCount}
                                  setValue={setSelectedCount}
                                />
                              </div>
                              <Button onClick={() => setIsOptionsOpened(false)} variant="contained">
                                {t("generateProxyPage.saveAndClose")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Block>
                    </Fade>
                    <Fade open={!isProxyLoading && proxyList.length > 0}>
                      <div className={styles.page__main__proxies}>
                        <div className={styles.page__main__proxies__wrapper}>
                          <div className={styles.page__main__proxies__head}>
                            <h4>
                              {proxyList.length} {t("generateProxyPage.proxyGenerated")}
                            </h4>
                            <GrayContainedButton
                              colorText={!isCopied ? undefined : "primary"}
                              size="small"
                              rounded
                              onClick={handleCopyAllToClipboard}
                            >
                              {isCopied ? (
                                <>
                                  <Check fontSize="small" />
                                  {t("base.copied")}
                                </>
                              ) : (
                                <>
                                  <ContentCopy />
                                  {t("base.copy")}
                                </>
                              )}
                            </GrayContainedButton>
                          </div>
                          <div className={styles.page__main__proxies__list}>
                            <List
                              height={480}
                              itemCount={proxyList.length}
                              itemSize={24}
                              width="100%"
                              className={styles.page__main__proxies__list__wrapper}
                            >
                              {({ index, style }) => (
                                <div
                                  className={styles.page__main__proxies__list__row}
                                  style={style}
                                >
                                  <span className={styles.page__main__proxies__list__row__index}>
                                    {index + 1}
                                  </span>
                                  <span className={styles.page__main__proxies__list__row__text}>
                                    {proxyList[index]}
                                  </span>
                                </div>
                              )}
                            </List>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  </>
                ) : (
                  <EmptyState
                    title="No proxy orders yet"
                    desc="Your proxy purchases will appear here once completed"
                    icon={<VpnLock />}
                  />
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default GenerateProxyPage;
