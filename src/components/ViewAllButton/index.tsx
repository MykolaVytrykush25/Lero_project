"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

//styles
import styles from "./ViewAllButton.module.scss";

type TViewAllButtonProps = {
  href: string;
};

const ViewAllButton: React.FC<TViewAllButtonProps> = ({ href }) => {
  const router = useRouter();

  return (
    <div className={styles.button}>
      <Button onClick={() => router.push(href)} variant="contained">
        View all
      </Button>
    </div>
  );
};

export default ViewAllButton;
