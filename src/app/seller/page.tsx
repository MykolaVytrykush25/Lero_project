"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

//styles
import styles from "./SellerPage.module.scss";

//components
import MainLayout from "@/components/MainLayout";
import PrivateRoute from "@/components/PrivateRoute";
import SellerStats from "@/components/SellerComponents/SellerStats";
import SellerOffers from "@/components/SellerComponents/SellerOffers";
import SalesHistory from "@/components/SellerComponents/SalesHistory";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { UserRoles } from "@/@types/enums";
import { Status } from "@/@types/base";


const SellerPage: NextPage = () => {
  const router = useRouter();
  const { userData, status } = useSelector(userSelector);

  const [selectedTab, setSelectedTab] = useState<string>("1");

  useEffect(() => {
    if (userData?.role !== UserRoles.SELLER && status === Status.SUCCESS) {
      router.push("/404");
    }
  }, [userData, router]);

  return (
    <MainLayout>
      <PrivateRoute>
        <div className={styles.page}>
          <div className={styles.page__wrapper}>
            <h1>Seller Profile</h1>
            <div className={styles.page__main}>
              <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={(_, val) => setSelectedTab(val)}>
                    <Tab label="Statistics" value="1" />
                    <Tab label="Offers" value="2" />
                    <Tab label="History Sells" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ padding: "0" }}>
                  <SellerStats />
                </TabPanel>
                <TabPanel value="2" sx={{ padding: "0" }}>
                  <SellerOffers />
                </TabPanel>
                <TabPanel value="3" sx={{ padding: "0" }}>
                  <SalesHistory />
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
      </PrivateRoute>
    </MainLayout>
  );
};

export default SellerPage;
