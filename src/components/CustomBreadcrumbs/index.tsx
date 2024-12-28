"use client";

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";

//styles
import styles from "./CustomBreadcrumbs.module.scss";

//redux
import { breadcrumbsSelector } from "@/redux/slices/breadcrumbs/selectors";

//icons
import { NavigateNext } from "@mui/icons-material";

const CustomBreadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const { name, type } = useSelector(breadcrumbsSelector);

  const pathnames = pathname.split("/").filter((x) => x);

  const isProductPage = pathname.includes("products") && pathnames.length > 1;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const breadcrumbs = pathnames.map((value, index) => {
    let formattedValue = value.replace(/-/g, " ");
    let href = "/" + pathnames.slice(0, index + 1).join("/");

    if (pathnames[0] === "profile") {
      if (index === 1) {
        href = `/profile/${pathnames[1]}`;
        formattedValue = "Profile";
      } else if (index === 2) {
        formattedValue = "Settings";
      } else {
        return null;
      }
    } else if (value === "products" && type) {
      formattedValue = type;
      href = `/${type.toLowerCase()}`;
    }

    const isLast = index === pathnames.length - 1;

    if (isLast && isProductPage && name) {
      formattedValue = name;
    }

    const displayText = truncateText(
      formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1),
      40
    );

    return isLast ? (
      <Typography key={href} color="text.primary">
        {displayText}
      </Typography>
    ) : (
      <MuiLink component={Link} key={href} href={href} underline="hover" color="inherit">
        {displayText}
      </MuiLink>
    );
  });

  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
