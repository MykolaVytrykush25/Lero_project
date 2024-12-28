import { useAppDispatch } from "@/redux/store";
import { Drawer, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

//styles
import styles from "./Cart.module.scss";

//components
import CloseButton from "@/components/CloseButton";
import PurchaseWindow from "../PurchaseWindow";
import EmptyState from "../EmptyState";
import CartItem from "../CartItem";

//redux
import { getCartAsync } from "@/redux/slices/cart/asyncActions";
import { cartSelector } from "@/redux/slices/cart/selectors";

//types
import { Status } from "@/@types/base";

//icons
import { PlaylistAdd } from "@mui/icons-material";

type TCartProps = {
  open: boolean;
  onClose: () => void;
};

const Cart: React.FC<TCartProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { items, count, total, isCartLoaded, status } = useSelector(cartSelector);

  const [isPurchaseWindowOpened, setIsPurchaseWindowOpened] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!isCartLoaded) {
      dispatch(getCartAsync());
    }

    if (open) {
      dispatch(getCartAsync());
    }
  }, [open, isCartLoaded]);

  return (
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <div className={styles.cart}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__head}>
            <h2>Cart {count !== 0 && <span>{count}</span>}</h2>
            <CloseButton onClick={onClose} />
          </div>
          <div className={styles.cart__items}>
            {status === Status.LOADING && (
              <>
                {[...Array(4)].map((_, idx) => (
                  <Skeleton key={idx} width={"100%"} height={"120px"} variant="rounded" />
                ))}
              </>
            )}
            {status === Status.SUCCESS && items.length === 0 && (
              <EmptyState
                title="Cart is empty"
                desc="Add items you like and enjoy a seamless checkout!"
                icon={<PlaylistAdd />}
              />
            )}
            {status === Status.SUCCESS &&
              items.length > 0 &&
              items.map((i, idx) => (
                <CartItem
                  id={i.product.id}
                  key={idx}
                  imageUrl={i.product.photo || "/avatar.png"}
                  piecesLeft={120}
                  sellerName={i.seller_info?.name}
                  productType={i.product.type}
                  amount={i.amount}
                  prices={i.product.prices}
                  description={i.product.description}
                  title={i.product.title}
                  setIsUpdating={setIsUpdating}
                />
              ))}
          </div>
          {items.length > 0 && (
            <div className={styles.cart__footer}>
              <div className={styles.cart__footer__text}>
                <p>For Payment</p>
                <span>{total.toFixed(2)}$</span>
              </div>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={() => setIsPurchaseWindowOpened(true)}
                loading={isUpdating}
              >
                Place an order
              </LoadingButton>
            </div>
          )}
          <PurchaseWindow
            afterSubmit={onClose}
            items={items.map((i) => ({
              id: i.product.id,
              quantity: i.amount,
              options: i.product.options,
            }))}
            price={total}
            isOpened={isPurchaseWindowOpened}
            handleClose={() => setIsPurchaseWindowOpened(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default Cart;
