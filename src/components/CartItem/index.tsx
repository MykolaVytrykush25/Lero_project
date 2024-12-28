import { Avatar } from "@mui/material";
import { useAppDispatch } from "@/redux/store";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";

//styles
import styles from "./CartItem.module.scss";

//components
import Counter from "../Counter";
import IconButton from "../IconButton";
import SellerInfoBar from "../SellerInfoBar";

//redux
import { updateCartAsync } from "@/redux/slices/cart/asyncActions";

//icons
import { DeleteOutline } from "@mui/icons-material";

//types
import { ProductTypes } from "@/@types/enums";
import { TProductPrice } from "@/redux/slices/products/types";

type TCartItemProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  amount: number;
  prices: TProductPrice[];
  piecesLeft: number;
  sellerName: string;
  productType: ProductTypes;
  setIsUpdating: (value: boolean) => void;
};

const CartItem: React.FC<TCartItemProps> = ({
  title,
  imageUrl,
  description,
  piecesLeft,
  amount,
  id,
  sellerName,
  productType,
  setIsUpdating,
  prices,
}) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<number>(amount || 1);
  const prevCountRef = useRef<number>(count);

  const debounceDelay = 400;

  const getPriceForCount = (count: number) => {
    const applicablePrice = prices
      .slice()
      .reverse()
      .find((price) => count >= parseInt(price.amount));
    return applicablePrice ? Number(applicablePrice.price) : 0;
  };

  const price = getPriceForCount(count);

  useEffect(() => {
    const debouncedUpdate = debounce(() => {
      if (prevCountRef.current !== count) {
        setIsUpdating(true);

        dispatch(updateCartAsync({ product_id: id, amount: count, operation: "=" })).finally(() => {
          setIsUpdating(false);
        });

        prevCountRef.current = count;
      }
    }, debounceDelay);

    debouncedUpdate();

    return () => {
      debouncedUpdate.cancel();
    };
  }, [count, dispatch, debounceDelay, setIsUpdating]);

  return (
    <div className={styles.item}>
      <div className={styles.item__wrapper}>
        <Avatar src={imageUrl} sx={{ width: 40, height: 40 }} />
        <div className={styles.item__main}>
          <SellerInfoBar productType={productType} sellerName={sellerName} />
          <h4>{title}</h4>
          <p className={styles.item__main__description}>{description}</p>
          <div className={styles.item__main__footer}>
            <Counter count={count} setCount={setCount} maxCount={piecesLeft} />
            <div className={styles.item__main__footer__price}>
              <p>{(price * count).toFixed(2)}$</p>
              <IconButton
                onClick={() =>
                  dispatch(updateCartAsync({ product_id: id, amount: 0, operation: "=" }))
                }
                variant="tertiary"
                size="sm"
                icon={<DeleteOutline />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
