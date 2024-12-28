"use client";

import cn from "classnames";
import { useState } from "react";
import { Badge, Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useData } from "@/data";

//styles
import styles from "./UserBar.module.scss";
import dropdownStyles from "../DropdownList/DropdownList.module.scss";

//components
import LanguageSelector from "../LanguageSelector";
import MobileMenu from "../MobileMenu";
import StartToSellButton from "../StartToSellButton";
import DepositModal from "../DepositModal";
import DropdownList from "../DropdownList";
import Cart from "../Cart";

//images
import WalletIcon from "@/assets/icons/wallet.svg";
import LogoutIcon from "@/assets/icons/logout.svg";

//redux
import { userSelector } from "@/redux/slices/user/selectors";
import { cartSelector } from "@/redux/slices/cart/selectors";

//utils
import logout from "@/utils/logout";

//types
import { Status } from "@/@types/base";
import { UserRoles } from "@/@types/enums";

//icons
import { Menu, Person, ShoppingCart } from "@mui/icons-material";


const UserBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { count } = useSelector(cartSelector);
  const { profileMenu } = useData();
  const { t } = useTranslation("common");

  const { userData, isAuthenticated, status } = useSelector(userSelector);

  const [isDepositModalOpened, setIsDepositModalOpened] = useState<boolean>(false);
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);

  return (
    <div className={styles.userBar}>
      <div className={styles.userBar__wrapper}>
        <StartToSellButton className={styles.userBar__sell} />
        <div className={styles.userBar__user}>
          <div className={styles.userBar__user__lang}>
            <LanguageSelector />
          </div>
          {isAuthenticated && status === Status.SUCCESS && userData?.username && (
            <>
              <div
                className={cn(styles.userBar__user__block, styles.userBar__user__block__balance)}
                onClick={() => setIsDepositModalOpened(true)}
              >
                <WalletIcon />
                <p>{userData?.balance.toFixed(2)}&nbsp;$</p>
              </div>
              <div className={styles.userBar__user__menu}>
                <DropdownList value={userData?.username} icon={<Person />}>
                  {(closeDropdown) => (
                    <>
                      {profileMenu.map((i, idx) => (
                        <li
                          className={i.href === pathname ? dropdownStyles.active : ""}
                          key={idx}
                          onClick={() => {
                            router.push(i.href);
                            closeDropdown();
                          }}
                        >
                          <i.icon />
                          {i.title}
                        </li>
                      ))}
                      {userData.role !== UserRoles.TG_USER &&
                        <li onClick={logout} className={dropdownStyles.error}>
                          <LogoutIcon /> {t("profileMenu.logout")}
                        </li>
                      }
                    </>
                  )}
                </DropdownList>
              </div>
              <DepositModal
                isOpened={isDepositModalOpened}
                handleClose={() => setIsDepositModalOpened(false)}
              />
            </>
          )}
        </div>
        {!isAuthenticated && !userData?.username && (
          <div className={styles.userBar__actions}>
            <Button href="/login" component="button" size="small" variant="contained">
              {t("base.login")}
            </Button>
            <Button href="/register" size="small" variant="outlined">
              {t("base.register")}
            </Button>
          </div>
        )}
        <Cart open={isCartOpened} onClose={() => setIsCartOpened(false)} />
        <button className={styles.userBar__cart} onClick={() => setIsCartOpened(true)}>
          <Badge
            badgeContent={count}
            sx={{ "& .MuiBadge-badge": { top: "-2px", right: "-2px" } }}
            color="primary"
            max={99}
          >
            <ShoppingCart fontSize="small" />
          </Badge>
        </button>
        <button className={styles.userBar__burger} onClick={() => setIsMobileMenuOpened(true)}>
          <Menu />
        </button>
        <MobileMenu
          isOpened={isMobileMenuOpened}
          handleClose={() => setIsMobileMenuOpened(false)}
        />
      </div>
    </div>
  );
};

export default UserBar;
