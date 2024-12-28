import { FormControl, TextField } from "@mui/material";
import { useRef } from "react";

// styles
import styles from "./OTPInput.module.scss";

type TOTPInputProps = {
  value: string[];
  onChange: (otp: string[]) => void;
  length?: number;
  disabled?: boolean;
};

const OTPInput: React.FC<TOTPInputProps> = ({ length = 6, value, onChange, disabled }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newValue = e.target.value;
    const newOtp = [...value];

    if (/[0-9]/.test(newValue) || newValue === "") {
      newOtp[idx] = newValue.slice(-1);
      onChange(newOtp);

      if (newValue && idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      (inputRefs.current[idx - 1] as HTMLInputElement)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");

    const filteredData = pastedData.replace(/[^0-9]/g, '').slice(0, length);
    const newOtp = filteredData.split("").concat(Array(length - filteredData.length).fill("")).slice(0, length);

    onChange(newOtp);

    newOtp.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = char;
      }
    });
  };

  return (
    <div className={styles.otp}>
      <label>Code</label>
      <div className={styles.otp__wrapper}>
        {Array.from({ length }).map((_, index) => (
          <FormControl key={index} variant="outlined" className={styles.otp__control}>
            <TextField
              type="text"
              value={value[index] || ""}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, index)}
              onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              inputProps={{ maxLength: 1 }}
              onPaste={handlePaste}
              variant="outlined"
              sx={{ input: { textAlign: "center" } }}
              disabled={disabled}
            />
          </FormControl>
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
