import { Avatar } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

//styles
import styles from "./UserInfo.module.scss";

//components
import Block from "@/components/Block";
import GrayContainedButton from "@/components/GrayContainedButton";
import SalesWithRating from "@/components/SalesWithRating";
import ConfirmOffert from "@/components/ConfirmOffert";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { UserRoles } from "@/@types/enums";

//icons
import { Sell } from "@mui/icons-material";

type TUserInfoProps = {
  isAccess: boolean;
  username: string;
  // insuranceBalance?: number;
  rating: number;
  countSales: number;
  imageUrl: string | null;
  description: string | null;
};

const UserInfo: React.FC<TUserInfoProps> = ({
  username,
  // insuranceBalance,
  imageUrl,
  rating,
  countSales,
  isAccess,
}) => {
  const { userData } = useSelector(userSelector);

  const [isBecomeModalOpened, setIsBecomeModalOpened] = useState<boolean>(false);

  return (
    <Block className={styles.info}>
      <div className={styles.info__wrapper}>
        <Avatar src={imageUrl === null ? "/avatar.png" : imageUrl} sx={{ width: 80, height: 80 }} />
        <div className={styles.info__user}>
          <h3>{username}</h3>
          {/* <p className={styles.info__user__insurance}>
            Insurance balance: <span>{insuranceBalance || 0} $</span>
          </p> */}
          {rating !== undefined && <SalesWithRating rating={rating} countSales={countSales} />}
        </div>
        {isAccess && userData?.role === UserRoles.USER && (
          <GrayContainedButton
            onClick={() => setIsBecomeModalOpened(true)}
            colorText="primary"
            className={styles.info__offer}
          >
            <Sell />
            Become a seller
          </GrayContainedButton>
        )}
        <ConfirmOffert
          isOpened={isBecomeModalOpened}
          handleClose={() => setIsBecomeModalOpened(false)}
        />
      </div>
    </Block>
  );
};

export default UserInfo;
