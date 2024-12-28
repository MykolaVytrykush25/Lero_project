import { useEffect, useState } from 'react';
import { useData } from '@/data';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ToastProvider';
import { Skeleton } from '@mui/material';

//styles
import styles from './UserReviews.module.scss'

//components
import Review from '@/components/ProductComponents/Review';
import EmptyState from '@/components/EmptyState';
import CustomPagination from '@/components/CustomPagination';

//API
import { getSellerReviews } from '@/API/sellerService';

//types
import { IProductReviews } from '@/@types/products';

//icons
import { ReviewsOutlined } from '@mui/icons-material';

type TUserReviewsProps = {
    id: number;
}

const UserReviews: React.FC<TUserReviewsProps> = ({ id }) => {
    const { limit } = useData();
    const { showToast } = useToast();
    const { t } = useTranslation('common');

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<IProductReviews | null>(null);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const data = await getSellerReviews({ id, page, limit });
                setReviews(data);
            } catch (err: any) {
                showToast(err?.response?.data?.message || t("base.defaultError"), "error");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [page]);

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__main}>
                {!isLoading ? reviews?.reviews.map((i, idx) => (
                    <Review
                        key={idx}
                        avatar={i.user.avatar}
                        rating={i.rating}
                        author={i.user.name}
                        text={i.text}
                        date={i.created_at}
                    />
                )) : [...Array(6)].map((_, idx) => (
                    <Skeleton key={idx} height={120} width='100%' variant='rounded' />
                ))}
            </div>
            {reviews && reviews?.total_pages > 1 &&
                <CustomPagination
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    count={reviews.total_pages}
                />
            }
            {!isLoading && reviews?.reviews.length === 0 &&
                <EmptyState
                    title="No reviews yet"
                    desc="I haven't received any reviews yet. Be the first to leave one!"
                    icon={<ReviewsOutlined />}
                />
            }
        </div>
    )
}

export default UserReviews