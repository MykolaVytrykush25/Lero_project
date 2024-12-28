import { useEffect, useState } from "react";
import { useData } from "@/data";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

//styles
import styles from "./UserProducts.module.scss";

//components
import ProductItem from "@/components/ProductComponents/ProductItem";
import CustomPagination from "@/components/CustomPagination";
import ProductItemSkeleton from "@/components/ProductComponents/ProductItemSkeleton";

//API
import { getSellerOffers } from "@/API/sellerService";

//types
import { IUserProducts } from "@/@types/user";

//redux
import { userSelector } from "@/redux/slices/user/selectors";
import EmptyState from "@/components/EmptyState";
import { StorefrontOutlined } from "@mui/icons-material";


type TUserProductsProps = {
  id: number;
}


const UserProducts: React.FC<TUserProductsProps> = ({ id }) => {
  const { userData } = useSelector(userSelector);
  const { limit } = useData();
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IUserProducts | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await getSellerOffers({ id, page, limit });
        setProducts(data);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return (
    <div className={styles.products}>
      <div className={styles.products__wrapper}>
        <div className={styles.products__list}>
          {!isLoading ? products?.products.map((i) => (
            <ProductItem
              key={i.id}
              id={i.id}
              category={i.category}
              tags={i.tags}
              rating={i.rating}
              isVerified={false}
              shopName={userData?.username as string}
              title={i.title}
              price={i.prices[0].price}
              piecesLeft={i.in_stock}
              description={i.short_description}
              imageUrl={i.photo}
            />
          )) : [...Array(6)].map((_, idx) => (
            <ProductItemSkeleton key={idx} />
          ))}
        </div>
        {products && products?.total_pages > 1 &&
          <CustomPagination
            className={styles.products__pagination}
            page={page}
            count={products.total_pages}
            onChange={(_, val) => setPage(val)}
          />
        }
        {!isLoading && products?.products.length === 0 &&
          <EmptyState
            title="No products here yet"
            desc="Looks like I haven't added any products yet. Stay tuned!"
            icon={<StorefrontOutlined />}
          />
        }
      </div>
    </div>
  );
};

export default UserProducts;
