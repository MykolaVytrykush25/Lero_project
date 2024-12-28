import { useSelector } from "react-redux";
import Link from "next/link";

//styles
import styles from "./UserBanner.module.scss";

//components
import GrayContainedButton from "@/components/GrayContainedButton";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//icons
import { EditOutlined } from "@mui/icons-material";

type TUserBannerProps = {
  isAccess: boolean;
  imageUrl: string | null;
};

const UserBanner: React.FC<TUserBannerProps> = ({ imageUrl, isAccess }) => {
  const { userData } = useSelector(userSelector);

  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${imageUrl || "/banner.png"})` }}>
      {isAccess && (
        <Link href={`/profile/${userData?.username}/settings`}>
          <GrayContainedButton disableElevation className={styles.banner__button} colorText="white">
            <EditOutlined />
            Edit profile
          </GrayContainedButton>
        </Link>
      )}
    </div>
  );
};

export default UserBanner;
