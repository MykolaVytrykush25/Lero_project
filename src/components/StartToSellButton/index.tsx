import cn from "classnames";
import Link from "next/link";
import { useSelector } from "react-redux";

//styles
import styles from "./StartToSellButton.module.scss";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//icons
import { Add } from "@mui/icons-material";

//types
import { UserRoles } from "@/@types/enums";

type TStartToSellButton = {
  className?: string;
};

const StartToSellButton: React.FC<TStartToSellButton> = ({ className }) => {
  const { userData } = useSelector(userSelector);

  return (
    <>
      {process.env.NODE_ENV === "development" && userData?.role === UserRoles.SELLER && (
        <Link href="/seller" className={cn(styles.sell, className)}>
          <Add />
          Start to sell
        </Link>
      )}
    </>
  );
};

export default StartToSellButton;
