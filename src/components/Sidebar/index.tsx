"use client";

import Link from "next/link";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useState } from "react";

//styles
import styles from "./Sidebar.module.scss";

//components
import Dropdown from "../Dropdown";
import MenuLink from "../MenuLink";

//images
import LogoIcon from "@/assets/icons/logo.svg";
import LogoTextIcon from "@/assets/icons/logo-text.svg";
import MenuBurgerIcon from "@/assets/icons/menu.svg";

//data
import { useData } from "@/data";

//icons
import {
  HelpOutlineOutlined,
  MenuOpen,
  PeopleAltOutlined,
  ShieldOutlined,
} from "@mui/icons-material";

const Sidebar: React.FC = () => {
  const { accountsTypes } = useData();
  const { t } = useTranslation("common");
  const [isOpened, setIsOpened] = useState<boolean>(true);

  return (
    <aside className={cn(styles.sidebar, !isOpened ? styles.sidebar__hidden : "")}>
      <div className={styles.sidebar__wrapper}>
        <div className={styles.sidebar__head}>
          <Link href="/">
            <LogoIcon />
            <LogoTextIcon />
          </Link>
          <button onClick={() => setIsOpened(false)}>
            <MenuOpen />
          </button>
        </div>
        <nav className={styles.sidebar__menu}>
          <div className={styles.sidebar__menu__item}>
            <p>{t("menu.title")}</p>
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
          <div className={styles.sidebar__menu__item}>
            <p>Support</p>
            <MenuLink
              icon={<HelpOutlineOutlined />}
              href="https://t.me/gemups_support_bot"
              title="Help"
            />
          </div>
        </nav>
        <button onClick={() => setIsOpened(true)} className={styles.sidebar__action}>
          <MenuBurgerIcon />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
