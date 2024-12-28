import { Skeleton } from "@mui/material";

//styles
import styles from "./ProductsPageBlockSkeleton.module.scss";

//components
import ProductItemSkeleton from "../ProductItemSkeleton";

const ProductsPageBlockSkeleton: React.FC = () => {
    return (
        <section className={styles.block}>
            <div className={styles.block__wrapper}>
                <div className={styles.block__title}>
                    <Skeleton width={240} height={32} variant="rounded" />
                    <Skeleton width={160} height={24} variant="rounded" />
                </div>
                <div className={styles.block__main}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <ProductItemSkeleton key={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPageBlockSkeleton;
