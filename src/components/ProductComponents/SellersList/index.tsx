import { Drawer } from "@mui/material";

//styles
import styles from "./SellersList.module.scss";

//components
import CloseButton from "@/components/CloseButton";
import SellersListItem from "../ProductListItem";

//types
import { TProductOtherSellersOffer } from "@/redux/slices/products/types";

type TSellersListProps = {
  offers: TProductOtherSellersOffer[];
  open: boolean;
  onClose: () => void;
};

const SellersList: React.FC<TSellersListProps> = ({ open, onClose, offers }) => {
  return (
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <div className={styles.list}>
        <div className={styles.list__wrapper}>
          <div className={styles.list__head}>
            <h2>
              Other sellers <span>{offers.length}</span>
            </h2>
            <CloseButton onClick={onClose} />
          </div>
          <div className={styles.list__items}>
            {offers.map((i, idx) => (
              <SellersListItem
                key={idx}
                productType={i.product.type}
                sellerName={i.seller_info.name}
                id={i.product.id}
                imageUrl={i.product.photo}
                piecesLeft={i.product.in_stock}
                price={i.product.price}
                description={i.product.short_description}
                title={i.product.title}
              />
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SellersList;
