import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

//icons
import AllIcon from "@/assets/icons/accounts/all.svg";
import DiscordIcon from "@/assets/icons/accounts/discord.svg";
import TwitterIcon from "@/assets/icons/accounts/x.svg";
import TelegramIcon from "@/assets/icons/accounts/telegram.svg";
import InstagramIcon from "@/assets/icons/accounts/instagram.svg";
import TiktokIcon from "@/assets/icons/accounts/tiktok.svg";
import FacebookIcon from "@/assets/icons/accounts/facebook.svg";
import MailIcon from "@/assets/icons/accounts/mail.svg";
import { Person, ShoppingCart, PeopleAlt, CallReceived, Sell } from "@mui/icons-material";

//redux
import { userSelector } from "./redux/slices/user/selectors";

//types
import { UserRoles } from "./@types/enums";

export const useData = () => {
  const { t } = useTranslation("common");
  const { userData } = useSelector(userSelector);

  return {
    langs: ["en", "ru", "ua", "es", "ko", "zh", "ja", "de", "hi", "ar"],
    limit: 20,
    depositVariants: ["10", "20", "50", "100"],
    accountsTypes: [
      { href: "/accounts", title: "All", icon: AllIcon },
      { href: "/accounts/mail", title: "Mail", icon: MailIcon },
      { href: "/accounts/discord", title: "Discord", icon: DiscordIcon },
      { href: "/accounts/twitter", title: "Twitter / X", icon: TwitterIcon },
      { href: "/accounts/telegram", title: "Telegram", icon: TelegramIcon },
      { href: "/accounts/instagram", title: "Instagram", icon: InstagramIcon },
      { href: "/accounts/tiktok", title: "Tiktok", icon: TiktokIcon },
      { href: "/accounts/facebook", title: "Facebook", icon: FacebookIcon },
    ],
    profileMenu: [
      { href: `/profile/${userData?.username}`, title: t("profileMenu.profile"), icon: Person },
      { href: "/my-purchases", title: t("profileMenu.myPurchases"), icon: ShoppingCart },
      { href: "/transactions", title: "Transactions", icon: CallReceived },
      ...(userData?.role === UserRoles.SELLER
        ? [{ href: "/seller", title: "Seller", icon: Sell }]
        : []),
      { href: "/referral", title: t("profileMenu.referral"), icon: PeopleAlt },
    ],
    protocols: [
      { label: "HTTP(S)", value: "http" },
      { label: "SOCKS5", value: "socks5" },
    ],
    formats: [
      { value: "1", label: "ip:port:login:password" },
      { value: "2", label: "ip:port@login:password" },
      { value: "3", label: "login:password@ip:port" },
      { value: "4", label: "login:password:ip:port" },
    ],
    countryTypes: [
      { value: "0", label: t("generateProxyPage.location.options.random") },
      { value: "1", label: t("generateProxyPage.location.options.country") },
    ],
    sessionTypes: [
      { value: "dynamic", label: t("generateProxyPage.sessionType.options.dynamic") },
      { value: "static", label: t("generateProxyPage.sessionType.options.static") },
    ],
    depositMethods: [
      { value: "cryptomus", label: "Cryptomus" },
      { value: "crypto", label: "Gemups" },
    ],
    statuses: [
      { label: "All", value: "all" },
      { label: "Success", value: "paid,paid_over" },
      { label: "Pending", value: "check,process,confirmation_check,confirmations" },
      { label: "Cancel", value: "cancel,failed,wrong_amount,fail,locked,system_fail" },
    ],
  };
};
