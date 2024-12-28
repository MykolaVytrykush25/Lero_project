"use client";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

//styles
import styles from "./SettingsTabs.module.scss";

//components
import ChangeBanner from "../ChangeBanner";
import ChangeAvatar from "../ChangeAvatar";
import ChangeUserInfo from "../ChangeUserInfo";
import ChangePrivacy from "../ChangePrivacy";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

const SettingsTabs: React.FC = () => {
  const { userData } = useSelector(userSelector);

  const [currentTab, setCurrentTab] = useState<string>("1");

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={(_, val) => setCurrentTab(val)}>
          <Tab label="General" value="1" />
          <Tab label="Privacy" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ padding: "0" }}>
        {userData && (
          <div className={styles.tab}>
            <ChangeBanner initialPhotoUrl={userData.banner} />
            <ChangeAvatar initialPhotoUrl={userData.avatar} />
            <ChangeUserInfo />
          </div>
        )}
      </TabPanel>
      <TabPanel value="2" sx={{ padding: "0" }}>
        <div className={styles.tab}>
          <ChangePrivacy />
        </div>
      </TabPanel>
    </TabContext>
  );
};

export default SettingsTabs;
