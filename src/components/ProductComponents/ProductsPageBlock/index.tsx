//styles
import styles from "./ProductsPageBlock.module.scss";

//components
import ViewAllButton from "../../ViewAllButton";
import ProductItem from "../ProductItem";

//types
import { TProduct } from "@/redux/slices/products/types";


type TProductsPageBlockProps = {
  title: string;
  subtitle?: string;
  products: TProduct[];
  categorySlug?: string;
};

const ProductsPageBlock: React.FC<TProductsPageBlockProps> = ({
  title,
  subtitle,
  categorySlug,
  products
}) => {
  return (
    <section className={styles.block}>
      <div className={styles.block__wrapper}>
        <div className={styles.block__title}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className={styles.block__main}>
          {products?.map((p, idx) => (
            <ProductItem
              id={p.id}
              key={idx}
              category={p.category}
              description={p.short_description}
              otherSellersAvatars={p.other_sellers_avatars}
              imageUrl={p.photo}
              isVerified={p.seller_info.is_verified}
              tags={p.tags}
              title={p.title}
              shopName={p.seller_info.name}
              countSellers={p.other_sellers}
              rating={p.rating}
              price={p.prices[0].price}
              piecesLeft={p.in_stock}
            />
          ))}
        </div>
        {categorySlug && (
          <div className={styles.block__footer}>
            <ViewAllButton href={`/accounts/${categorySlug}`} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPageBlock;
