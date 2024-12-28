"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

//styles
import styles from "./HomePage.module.scss";

//components
import MainLayout from "@/components/MainLayout";

//icons
import { PersonOutlined, ShieldOutlined } from "@mui/icons-material";

const HomePage: NextPage = () => {
  const {  } = useTranslation("common");

  return (
    <MainLayout>
      <div className={styles.page}>
        <div className={styles.page__wrapper}>
          <div className={styles.page__main}>
            <div className={styles.page__main__banner}>
              <Swiper
                className={styles.page__main__banner__slider}
                modules={[Autoplay, EffectFade]}
                effect={"fade"}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
              >
                {[...Array(3)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      alt="banner"
                      src={idx === 0 ? "/telego.png" : "/tiktok.png"}
                      unoptimized
                      width={1300}
                      height={320}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.page__main__types}>
              <Link href="/proxy" className={styles.page__main__types__item}>
                <ShieldOutlined /> Proxy
              </Link>
              <Link href="/accounts" className={styles.page__main__types__item}>
                <PersonOutlined /> Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
