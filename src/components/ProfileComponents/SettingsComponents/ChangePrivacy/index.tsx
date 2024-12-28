import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useSelector } from "react-redux";

//styles
import styles from "./ChangePrivacy.module.scss";

//components
import ChangePasswordModal from "@/components/ChangePasswordModal";
import ResetPasswordModal from "@/components/ResetPasswordModal";
import ChangeEmailModal from "@/components/ChangeEmailModal";

//icons
import { EditOutlined } from "@mui/icons-material";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

const ChangePrivacy: React.FC = () => {
  const [isChangePasswordModalOpened, setIsChangePasswordModalOpened] = useState<boolean>(false);
  const [isChangeMailModalOpened, setIsChangeMailModalOpened] = useState<boolean>(false);
  const [isResetPasswordModalOpened, setIsResetPasswordModalOpened] = useState<boolean>(false);

  const { userData } = useSelector(userSelector);

  return (
    <div className={styles.privacy}>
      <div className={styles.privacy__wrapper}>
        <TextField
          fullWidth
          label="Email"
          type="text"
          value={userData?.email}
          inputProps={{ maxLength: 24 }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ marginRight: 0, color: "#FFFFFF" }}
                  onClick={() => setIsChangeMailModalOpened(true)}
                  edge="end"
                >
                  <EditOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          value="passwordpassword"
          type="password"
          inputProps={{ maxLength: 128 }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ marginRight: 0, color: "#FFFFFF" }}
                  onClick={() => setIsChangePasswordModalOpened(true)}
                  edge="end"
                >
                  <EditOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {userData?.email && (
          <p className={styles.privacy__forgot} onClick={() => setIsResetPasswordModalOpened(true)}>
            Forgot password
          </p>
        )}
        <ChangePasswordModal
          isOpened={isChangePasswordModalOpened}
          handleClose={() => setIsChangePasswordModalOpened(false)}
        />
        <ChangeEmailModal
          isOpened={isChangeMailModalOpened}
          handleClose={() => setIsChangeMailModalOpened(false)}
        />
        <ResetPasswordModal
          isOpened={isResetPasswordModalOpened}
          handleClose={() => setIsResetPasswordModalOpened(false)}
        />
      </div>
    </div>
  );
};

export default ChangePrivacy;
