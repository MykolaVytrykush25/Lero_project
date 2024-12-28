import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";

//types
import { ProductTypes } from "@/@types/enums";

type TProductTypeTabs = {
  tab: ProductTypes;
  setTab: (i: ProductTypes) => void;
};

const ProductTypeTabs: React.FC<TProductTypeTabs> = ({ tab, setTab }) => {
  const { t } = useTranslation("common");

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={(_, val) => setTab(val)}>
          <Tab label={"All"} value="all" />
          <Tab label={t("menu.proxy")} value="proxy" />
          <Tab label={t("menu.accounts")} value="account" />
        </TabList>
      </Box>
    </TabContext>
  );
};

export default ProductTypeTabs;
