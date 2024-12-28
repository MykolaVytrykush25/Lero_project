import Image from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";
import ScrollContainer from "react-indiana-drag-scroll";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { useToast } from "@/components/ToastProvider";
import { Avatar, AvatarGroup, capitalize } from "@mui/material";
import { useRouter } from "next/navigation";

//styles
import styles from "./ProductItem.module.scss";

//components
import CustomChip from "@/components/CustomChip";
import PiecesLeftProgress from "@/components/PiecesLeftProgress";
import UploadProductsModal from "@/components/UploadProductsModal";
import VerifiedBadge from "@/components/VerifiedBadge";
import IconButton from "@/components/IconButton";
import Fade from "@/components/Animations/Fade";
import Price from "@/components/Price";
import Counter from "@/components/Counter";
import Block from "@/components/Block";

//redux
import { updateCartAsync } from "@/redux/slices/cart/asyncActions";

//icons
import {
  Check,
  EditOutlined,
  KeyboardArrowDown,
  ShoppingCartOutlined,
  StarRateRounded,
} from "@mui/icons-material";

//types
import { TProductTag } from "@/redux/slices/products/types";


type TProductItemProps = {
  variant?: "default" | "view" | "edit";
  id: number;
  tags: TProductTag[];
  imageUrl: string;
  rating: number;
  shopName: string;
  countSellers?: number;
  description: string;
  title: string;
  price: number;
  category: string;
  piecesLeft: number;
  isVerified: boolean;
  otherSellersAvatars?: string[];
};

const ProductItem: React.FC<TProductItemProps> = ({
  id,
  tags,
  imageUrl,
  shopName,
  rating,
  category,
  description,
  title,
  price,
  piecesLeft,
  isVerified,
  countSellers,
  otherSellersAvatars,
  variant,
}) => {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const counterRef = useRef<HTMLDivElement | null>(null);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isTextShown, setIsTextShown] = useState<boolean>(false);
  const [isCartClicked, setIsCartClicked] = useState<boolean>(false);
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const isCart = category !== "isp";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (variant !== "edit") {
      handleClickCart(e);
    } else {
      setIsUploadModalOpened(true);
    }
  };

  const handleClickCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isCart) {
      router.push(`/products/${id}`);
      return;
    }

    if (isTextShown) {
      setIsTextShown(false);
    }

    setIsCartClicked((prev) => {
      if (prev) {
        dispatch(updateCartAsync({ product_id: id, amount: count, operation: "+" }));
        setCount(1);
        showToast("Added to cart", "success");
      }
      return !prev;
    });
  };

  const variants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        counterRef.current &&
        !counterRef.current.contains(event.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setIsCartClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Block
      className={cn(styles.item, { [styles.view]: variant === "view" })}
      onClick={() => {
        if (isUploadModalOpened) return;

        if (variant !== "view") {
          router.push(`/products/${id}`);
        }
      }}
    >
      <div className={styles.item__wrapper}>
        <ScrollContainer className={styles.item__tags}>
          {isVerified && <VerifiedBadge />}
          {tags?.length > 0 &&
            tags.map((t, idx) => <CustomChip key={idx} label={t.name} isActive />)}
        </ScrollContainer>
        <motion.div
          initial="visible"
          animate={isTextShown ? "hidden" : "visible"}
          variants={variants}
          className={styles.item__image}
        >
          <Image width={512} height={512} src={imageUrl || "/avatar.png"} alt="account" />
        </motion.div>
        <motion.div
          initial="visible"
          animate={isTextShown ? "hidden" : "visible"}
          variants={variants}
          className={styles.item__info}
        >
          <div className={styles.item__info__item}>
            <div className={styles.item__info__item__rating}>
              <div className={styles.item__info__item__rating__wrapper}>
                <StarRateRounded />
                <span>{rating}</span>
              </div>
            </div>
            <p>{capitalize(shopName)}</p>
          </div>
          {countSellers && countSellers > 0 ? (
            <div className={styles.item__info__item}>
              <AvatarGroup max={3}>
                {[...Array(countSellers)].slice(0, 3).map((_, idx) => (
                  <Avatar
                    key={idx}
                    sx={{ width: 24, height: 24, borderColor: "#090e15 !important" }}
                    src={otherSellersAvatars?.[idx]}
                  />
                ))}
              </AvatarGroup>
              <div className={styles.item__info__item__sellers}>
                <p>{countSellers} sellers</p>
              </div>
            </div>
          ) : null}
        </motion.div>
        <div className={cn(styles.item__title, isTextShown ? styles.shown : "")}>
          <p className={styles.item__title__ellipsis}>{title}</p>
          <motion.div
            initial="hidden"
            animate={isTextShown ? "visible" : "hidden"}
            variants={variants}
            className={styles.item__title__hidden}
          >
            <p className={styles.item__title__hidden__description}>{description}</p>
          </motion.div>
          <button
            className={styles.item__title__button}
            onClick={(e) => {
              e.stopPropagation();
              setIsTextShown((prev) => !prev);
            }}
          >
            <KeyboardArrowDown />
          </button>
          <motion.div
            initial="hidden"
            animate={isCartClicked ? "visible" : "hidden"}
            variants={variants}
            ref={counterRef}
            className={styles.item__title__counter}
          >
            <Counter count={count} setCount={setCount} maxCount={piecesLeft} />
          </motion.div>
        </div>
        <div className={styles.item__footer}>
          <Price price={price * count} />
          <PiecesLeftProgress piecesLeft={piecesLeft} />
          <IconButton
            ref={cartButtonRef}
            size="sm"
            variant={variant !== "edit" ? "tertiary" : "secondary"}
            icon={
              variant !== "edit" ? (
                <Fade open={true}>{isCartClicked ? <Check /> : <ShoppingCartOutlined />}</Fade>
              ) : (
                <Fade open={true}>
                  <EditOutlined />
                </Fade>
              )
            }
            onClick={handleButtonClick}
          />
          <UploadProductsModal
            id={id}
            isOpened={isUploadModalOpened}
            handleClose={() => {
              setIsUploadModalOpened(false);
            }}
          />
        </div>
      </div>
    </Block>
  );
};

export default ProductItem;
