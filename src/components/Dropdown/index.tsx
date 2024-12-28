import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";
import Link from "next/link";

//styles
import styles from "./Dropdown.module.scss";

//types
import { TMenuItem } from "@/@types/base";

//icons
import { KeyboardArrowDown } from "@mui/icons-material";

type TDropdownProps = {
  menu: TMenuItem[];
  icon: ReactNode;
  title: string;
  hidden: boolean;
  initOpened?: boolean;
  handleClickLink?: () => void;
};

const Dropdown: React.FC<TDropdownProps> = ({
  menu,
  icon,
  title,
  hidden,
  initOpened,
  handleClickLink,
}) => {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(initOpened || false);

  useEffect(() => {
    const activeMenuItem = menu.some((item) => pathname === item.href);
    if (activeMenuItem) {
      setIsOpened(true);
    }
  }, [pathname, menu]);

  return (
    <div
      className={cn(
        styles.dropdown,
        hidden ? styles.dropdown__hidden : "",
        menu.some((item) => pathname === item.href) ? styles.dropdown__active : ""
      )}
    >
      <div className={styles.dropdown__wrapper}>
        <div
          className={styles.dropdown__head}
          onClick={() => !hidden && setIsOpened((prev) => !prev)}
        >
          <div className={styles.dropdown__head__left}>
            <span className={styles.dropdown__head__left__icon}>{icon}</span>
            <span className={styles.dropdown__head__left__title}>{title}</span>
          </div>
          <div className={styles.dropdown__head__arrow}>
            <KeyboardArrowDown
              className={cn(
                styles.dropdown__head__arrow__icon,
                isOpened ? styles.dropdown__head__arrow__icon__opened : ""
              )}
            />
          </div>
        </div>
        <ul
          className={`${styles.dropdown__list} ${
            !hidden && isOpened ? styles.dropdown__list__opened : ""
          }`}
        >
          {menu.map((i, idx) => (
            <li
              className={cn(
                styles.dropdown__list__item,
                pathname === i.href ? styles.dropdown__list__item__active : ""
              )}
              key={idx}
            >
              <Link href={i.href} onClick={handleClickLink}>
                {i.icon && <i.icon />}
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
