import { useState, forwardRef } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";

//icons
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const PasswordField = forwardRef<HTMLDivElement, TextFieldProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField
      {...props}
      autoComplete="off"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{ marginRight: 0, color: "#FFFFFF" }}
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      ref={ref}
    />
  );
});

export default PasswordField;
