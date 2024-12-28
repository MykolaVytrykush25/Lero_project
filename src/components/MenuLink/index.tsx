import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";

//styles
import styles from "./MenuLink.module.scss";

type TMenuLinkIcon = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const MenuLink: React.FC<TMenuLinkIcon> = ({ href, icon, title }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a
      onClick={() => router.push(href)}
      className={cn(styles.link, pathname.includes(href) ? styles.link__active : "")}
    >
      {icon}
      <span className={styles.link__title}>{title}</span>
    </a>
  );
};

export default MenuLink;
