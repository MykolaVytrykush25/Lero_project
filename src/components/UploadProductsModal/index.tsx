import { Fade, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useToast } from "../ToastProvider";

//styles
import styles from "./UploadProductsModal.module.scss";

//components
import ModalHead from "../ModalHead";
import GrayContainedButton from "../GrayContainedButton";
import IconButton from "../IconButton";

//types
import { TModalProps } from "@/@types/base";

//API
import { addProductData } from "@/API/productsService";

//icons
import { ChangeCircleOutlined, Close, Description } from "@mui/icons-material";


type TUploadProductsModalProps = TModalProps & {
  id: number;
};

const UploadProductsModal: React.FC<TUploadProductsModalProps> = ({ id, isOpened, handleClose }) => {
  const { showToast } = useToast();
  const { t } = useTranslation("common");

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showToast("No file selected", "error");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showToast("File too large", "error");
      return;
    }

    setIsLoading(true);

    try {
      await addProductData(file, id);
      showToast("File uploaded successfully", "success");
      handleClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Upload products" />
            <div className={styles.modal__main}>
              <div className={styles.modal__main__head}>
                {/* <h3>Upload file</h3> */}
                <p>1 line - 1 product. One by one in line.</p>
              </div>
              {!file ?
                <div className={styles.modal__main__upload}>
                  <div className={styles.modal__main__upload__area} onClick={() => fileInputRef.current?.click()}>
                    <div className={styles.modal__main__upload__area__icon}>
                      <ChangeCircleOutlined />
                    </div>
                    <div className={styles.modal__main__upload__area__text}>
                      <h4>
                        Choose file
                      </h4>
                      <p>Max Size: 50mb</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className={styles.modal__main__upload__text}>
                    <p>Supported format: TXT</p>
                    {/* <p>Max Size: 50mb</p> */}
                  </div>
                </div>
                :
                <div className={styles.modal__main__preview}>
                  <div className={styles.modal__main__preview__wrapper}>
                    <div className={styles.modal__main__preview__icon}>
                      <Description />
                    </div>
                    <div className={styles.modal__main__preview__text}>
                      <p>{file?.name.length > 32 ? `${file.name.slice(0, 32)}...` : file?.name}</p>
                    </div>
                    <IconButton onClick={() => setFile(null)} size="md" icon={<Close />} variant="secondary" />
                  </div>
                </div>
              }
            </div>
            <div className={styles.modal__buttons}>
              <GrayContainedButton fullWidth onClick={handleClose}>
                Cancel
              </GrayContainedButton>
              <LoadingButton
                fullWidth
                loading={isLoading}
                disabled={!file}
                onClick={handleUpload}
                variant="contained"
                color="primary"
              >
                Upload
              </LoadingButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal >
  );
};

export default UploadProductsModal;
