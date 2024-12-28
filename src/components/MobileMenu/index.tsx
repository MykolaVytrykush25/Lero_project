import { Drawer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useData } from "@/data";

//styles
import styles from "./MobileMenu.module.scss";

//components
import CloseButton from "../CloseButton";
import MenuLink from "../MenuLink";
import Dropdown from "../Dropdown";
import StartToSellButton from "../StartToSellButton";
import LanguageSelector from "../LanguageSelector";

//types
import { TModalProps } from "@/@types/base";

//icons
import { HelpOutlineOutlined, PeopleAltOutlined, ShieldOutlined } from "@mui/icons-material";

const MobileMenu: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { accountsTypes } = useData();
  const { t } = useTranslation("common");

  return (
    <Drawer classes={{ paper: styles.menu }} anchor="right" open={isOpened} onClose={handleClose}>
      <div className={styles.menu__wrapper}>
        <div className={styles.menu__head}>
          <div className={styles.menu__head__lang}>
            <LanguageSelector />
          </div>
          <StartToSellButton />
          <CloseButton onClick={handleClose} />
        </div>
        <nav className={styles.menu__main}>
          <div className={styles.menu__main__item}>
            <p className={styles.menu__main__item__title}>{t("menu.title")}</p>
            <div className={styles.menu__main__item__list}>
              <MenuLink icon={<ShieldOutlined />} href="/proxy" title={t("menu.proxy")} />
              {process.env.NODE_ENV === "development" && (
                <Dropdown
                  hidden={!isOpened}
                  icon={<PeopleAltOutlined />}
                  title={t("menu.accounts")}
                  menu={accountsTypes}
                />
              )}
            </div>
          </div>
          <div className={styles.menu__main__item}>
            <p className={styles.menu__main__item__title}>Support</p>
            <div className={styles.menu__main__item__list}>
              <MenuLink
                icon={<HelpOutlineOutlined />}
                href="https://t.me/gemups_support_bot"
                title="Help"
              />
            </div>
          </div>
        </nav>
      </div>
    </Drawer >
  );
};

export default MobileMenu;
