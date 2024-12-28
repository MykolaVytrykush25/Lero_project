import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";
import { useSelector } from "react-redux";

//styles
import styles from "./ChangeUserInfo.module.scss";

//redux
import { userSelector } from "@/redux/slices/user/selectors";
import { editUser } from "@/redux/slices/user/asyncActions";

const ChangeUserInfo: React.FC = () => {
  const { t } = useTranslation("common");
  const { userData } = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [newUsername, setNewUsername] = useState<string | undefined>(userData?.username);
  const [newDescription, setNewDescription] = useState<string | undefined>(userData?.description);

  const handleUpdateUser = () => {
    try {
      dispatch(editUser({ username: newUsername, description: newDescription }));
      showToast("Successfully updated", "success");
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    }
  };

  return (
    <div className={styles.info}>
      <div className={styles.info__wrapper}>
        <TextField
          fullWidth
          label="Name"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          type="text"
          inputProps={{ maxLength: 24 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          type="text"
          inputProps={{ maxLength: 128 }}
        />
        <Button
          disabled={!newUsername || newUsername?.length < 4}
          onClick={handleUpdateUser}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ChangeUserInfo;
