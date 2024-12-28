import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useData } from "@/data";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";

//styles
import styles from "./SellerOffers.module.scss";

//components
import AddOfferModal from "@/components/AddOfferModal";
import ProductItem from "@/components/ProductComponents/ProductItem";
import ProductItemSkeleton from "@/components/ProductComponents/ProductItemSkeleton";
import CustomPagination from "@/components/CustomPagination";
import ProductTypeTabs from "@/components/ProductTypeTabs";
import EmptyState from "@/components/EmptyState";

//API
import { getMyProducts } from "@/API/sellerService";

//types
import { ProductTypes } from "@/@types/enums";
import { ISellerProducts } from "@/@types/seller";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//icons
import { Add, StorefrontOutlined } from "@mui/icons-material";

const SellerOffers: React.FC = () => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { userData } = useSelector(userSelector);
  const { limit } = useData();
  
  const [isOfferModalOpened, setIsOfferModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [tab, setTab] = useState<ProductTypes>(ProductTypes.ALL);
  const [products, setProducts] = useState<ISellerProducts | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await getMyProducts({
          page,
          limit,
          type: tab !== "all" ? tab : undefined,
        });
        setProducts(data);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tab, page]);

  const hasProducts = products && products?.products.length > 0;

  return (
    <div className={styles.offers}>
      <div className={styles.offers__wrapper}>
        <div className={styles.offers__head}>
          <h3>Offers</h3>
          <Button
            onClick={() => setIsOfferModalOpened(true)}
            startIcon={<Add />}
            variant="contained"
            size="small"
            color="primary"
          >
            Add offer
          </Button>
          <AddOfferModal
            isOpened={isOfferModalOpened}
            handleClose={() => setIsOfferModalOpened(false)}
          />
        </div>
        <ProductTypeTabs tab={tab} setTab={setTab} />

        {!isLoading && !hasProducts && (
          <EmptyState
            title="No products available"
            desc="You do not have any products yet."
            icon={<StorefrontOutlined />}
          />
        )}

        <div className={styles.offers__list}>
          {isLoading
            ? [...Array(9)].map((_, idx) => <ProductItemSkeleton key={idx} />)
            : hasProducts
            ? products?.products.map((i, idx) => (
                <ProductItem
                  key={idx}
                  id={i.id}
                  imageUrl={i.photo}
                  description={i.short_description}
                  title={i.title}
                  piecesLeft={i.in_stock}
                  category={i.category.title}
                  isVerified={products.is_verified}
                  price={i.prices[0].price}
                  shopName={userData?.username || ""}
                  tags={i.tags}
                  rating={i.rating}
                  variant="edit"
                />
              ))
            : null}
        </div>
        {products && products?.total_pages > 1 && (
          <CustomPagination
            page={page}
            count={products?.total_pages}
            onChange={(_, val) => setPage(val)}
          />
        )}
      </div>
    </div>
  );
};

export default SellerOffers;
