import { ChangeEvent, useRef, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";

//styles
import styles from "./ChangeBanner.module.scss";

//components
import Block from "@/components/Block";
import ErrorButton from "@/components/ErrorButton";
import GrayContainedButton from "@/components/GrayContainedButton";

//API
import { deletePhoto, uploadPhoto } from "@/API/userService";

//icons
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

//types
import { ImageTypes } from "@/@types/enums";

type TChangeBannerProps = {
  initialPhotoUrl: string | null;
};

const ChangeBanner: React.FC<TChangeBannerProps> = ({ initialPhotoUrl }) => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhotoUrl);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const data = await uploadPhoto(file, ImageTypes.BANNER);
        setPhotoUrl(data.url);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhoto(ImageTypes.BANNER);
      setPhotoUrl(null);
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  }

  return (
    <Block className={styles.banner}>
      <div className={styles.banner__wrapper}>
        <div className={styles.banner__head}>
          <div className={styles.banner__head__text}>
            <h3>Change Banner</h3>
            <p>Upload file max 50mb</p>
          </div>
          <div className={styles.banner__head__actions}>
            <GrayContainedButton colorText="white" onClick={handleUploadClick}>
              <EditOutlined />
              Edit
            </GrayContainedButton>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleUpload} hidden />
            {photoUrl &&
              <ErrorButton onClick={handleDelete}>
                <DeleteOutline /> Remove
              </ErrorButton>
            }
          </div>
        </div>
        <div
          className={styles.banner__image}
          style={{ backgroundImage: `url(${!photoUrl ? "/banner.png" : photoUrl})` }}
        />
      </div>
    </Block>
  );
};

export default ChangeBanner;
