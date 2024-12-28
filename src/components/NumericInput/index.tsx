import { TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

type TNumericInputProps = {
  setValue: (i: string) => void;
  value: string;
  maxLength?: number;
  label?: string;
  endAdornment?: ReactNode;
  placeholder?: string;
};

const NumericInput: React.FC<TNumericInputProps> = ({
  label,
  endAdornment,
  placeholder,
  setValue,
  value,
  maxLength,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <TextField
      type="text"
      size="small"
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      inputMode="numeric"
      autoComplete="off"
      slotProps={{
        input: {
          endAdornment: endAdornment,
        },
      }}
      inputProps={{ maxLength: maxLength }}
    />
  );
};

export default NumericInput;
