"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

//styles
import styles from "./NotFound.module.scss";

//components
import MainLayout from "@/components/MainLayout";

export default function NotFound() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className={styles.page}>
        <Image src="/404.gif" alt="404" width={150} height={150} unoptimized />
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="contained" color="primary" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    </MainLayout>
  );
}
