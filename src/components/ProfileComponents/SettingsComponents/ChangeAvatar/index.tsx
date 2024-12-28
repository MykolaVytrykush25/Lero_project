import { Avatar } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { useTranslation } from "react-i18next";

//styles
import styles from "./ChangeAvatar.module.scss";

//components
import Block from "@/components/Block";
import ErrorButton from "@/components/ErrorButton";

//API
import { deletePhoto, uploadPhoto } from "@/API/userService";

//icons
import { DeleteOutline } from "@mui/icons-material";

//types
import { ImageTypes } from "@/@types/enums";

type TChangeAvatarProps = {
  initialPhotoUrl: string | null;
};

const ChangeAvatar: React.FC<TChangeAvatarProps> = ({ initialPhotoUrl }) => {
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
        const data = await uploadPhoto(file, ImageTypes.AVATAR);
        setPhotoUrl(data.url);
      } catch (err: any) {
        showToast(err?.response?.data?.message || t("base.defaultError"), "error");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhoto(ImageTypes.AVATAR);
      setPhotoUrl(null);
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  }

  return (
    <Block className={styles.avatar}>
      <div className={styles.avatar__wrapper}>
        <div className={styles.avatar__main}>
          <Avatar src={!photoUrl ? "/avatar.png" : photoUrl} sx={{ width: 80, height: 80 }} />
          <div className={styles.avatar__main__text}>
            <h3>Change Avatar</h3>
            <p>
              <span onClick={handleUploadClick}>Upload file</span> max 50mb
            </p>
          </div>
        </div>
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleUpload} hidden />
        {photoUrl && (
          <ErrorButton onClick={handleDelete}>
            <DeleteOutline />
            Remove
          </ErrorButton>
        )}
      </div>
    </Block>
  );
};

export default ChangeAvatar;
