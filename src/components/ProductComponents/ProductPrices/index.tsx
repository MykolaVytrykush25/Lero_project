"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "@/redux/store";

//styles
import styles from "./ProductPrices.module.scss";

//components
import Block from "@/components/Block";
import Counter from "@/components/Counter";
import GrayContainedButton from "@/components/GrayContainedButton";
import CountrySelect from "@/components/CountrySelect";
import PurchaseWindow from "@/components/PurchaseWindow";
import PriceItem from "../PriceItem";

//redux
import { updateCartAsync } from "@/redux/slices/cart/asyncActions";

//types
import { TProductPrice } from "@/redux/slices/products/types";
import { Units } from "@/@types/enums";

//icons
import { ShoppingCartOutlined } from "@mui/icons-material";
import LogoIcon from "@/assets/icons/logo.svg";

type TProductPricesProps = {
  id: number;
  prices: TProductPrice[];
  category?: string;
  unit: Units;
  piecesLeft?: number | null;
  sold?: number;
  variant?: "product" | "prolong";
  isAccess: boolean;
};

const ProductPrices: React.FC<TProductPricesProps> = ({
  id,
  category,
  prices,
  piecesLeft,
  variant = "product",
  sold,
  unit,
  isAccess,
}) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<number>(parseInt(prices[0].amount));
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isPurchaseWindowOpened, setIsPurchaseWindowOpened] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  const isCountryRequired = category === "isp";

  const isButtonDisabled =
    (piecesLeft !== null && piecesLeft !== undefined && (piecesLeft < 1 || count > piecesLeft)) ||
    (isCountryRequired && !selectedCountry) ||
    !isAccess;

  const handleChangeCount = (val: number) => {
    setCount(val);

    const foundItemIdx = prices.findIndex((item, idx) => {
      const nextAmount = prices[idx + 1]?.amount;
      return val >= parseInt(item.amount) && (!nextAmount || val < parseInt(nextAmount));
    });

    setSelectedItem(foundItemIdx !== -1 ? foundItemIdx : null);
  };

  const handleSelectItem = (val: number) => {
    setSelectedItem(val);
    setCount(parseInt(prices[val].amount));
  };

  const getPrice = (): number => {
    if (prices.length === 0) return 0;

    return selectedItem !== null ? Number(prices[selectedItem]?.price) : Number(prices[0]?.price);
  };

  return (
    <Block withoutPadding={variant === "prolong"} className={styles.prices}>
      <div className={styles.prices__wrapper}>
        <div className={styles.prices__items}>
          {prices.map((i, idx) => (
            <PriceItem
              className={styles.prices__items__item}
              idx={idx}
              handleSelect={handleSelectItem}
              isSelected={selectedItem === idx}
              key={idx}
              unit={unit}
              amount={i.amount}
              price={i.price}
            />
          ))}
        </div>
        {isCountryRequired && (
          <CountrySelect id={id} value={selectedCountry} setValue={setSelectedCountry} />
        )}
        <div className={styles.prices__count}>
          <Counter count={count} setCount={handleChangeCount} maxCount={piecesLeft as number} />
          <p>{count && prices.length > 0 ? `${(getPrice() * count).toFixed(2)} $` : "0.00 $"}</p>
        </div>
        {variant === "product" && (
          <div className={styles.prices__info}>
            <p>
              Only&nbsp;
              <span className={styles.highlighted}>
                {piecesLeft === null ? <LogoIcon /> : piecesLeft}
              </span>
              &nbsp;pieces left
            </p>
            <p>
              <span className={styles.highlighted}>Sold {sold}</span> pieces per month
            </p>
          </div>
        )}
        <PurchaseWindow
          items={[{ id, quantity: count, options: { country: selectedCountry } }]}
          price={getPrice() * count}
          isOpened={isPurchaseWindowOpened}
          handleClose={() => setIsPurchaseWindowOpened(false)}
        />
        <div className={styles.prices__buttons}>
          {variant === "product" && (
            <Button
              disabled={isButtonDisabled}
              onClick={() =>
                dispatch(
                  updateCartAsync({
                    product_id: id,
                    amount: count,
                    options: { country: selectedCountry },
                    operation: "+",
                  })
                )
              }
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<ShoppingCartOutlined />}
            >
              Add to
            </Button>
          )}
          <GrayContainedButton
            fullWidth
            disabled={isButtonDisabled}
            colorText="primary"
            onClick={() => setIsPurchaseWindowOpened(true)}
          >
            Buy 1 click
          </GrayContainedButton>
        </div>
      </div>
    </Block>
  );
};

export default ProductPrices;
