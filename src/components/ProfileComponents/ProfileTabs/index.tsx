import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

//components
import UserProducts from "../UserProducts";
import UserDescription from "../UserDescription";
import UserReviews from "../UserReviews";

type TProfileTabsProps = {
  isSeller: boolean;
  userId: number;
  description?: string;
}

const ProfileTabs: React.FC<TProfileTabsProps> = ({ isSeller, userId, description }) => {
  const [currentTab, setCurrentTab] = useState<string>("1");

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={(_, val) => setCurrentTab(val)}>
          <Tab label="Info" value="1" />
          <Tab label="Offers" disabled={!isSeller} value="2" />
          <Tab label="Reviews" disabled={!isSeller} value="3" />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ padding: "0" }}>
        <UserDescription description={description} />
      </TabPanel>
      <TabPanel value="2" sx={{ padding: "0" }}>
        <UserProducts id={userId} />
      </TabPanel>
      <TabPanel value="3" sx={{ padding: "0" }}>
        <UserReviews id={userId} />
      </TabPanel>
    </TabContext>
  );
};

export default ProfileTabs;
