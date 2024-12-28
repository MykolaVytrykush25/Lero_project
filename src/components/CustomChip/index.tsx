import { alpha, capitalize, Chip, ChipProps } from "@mui/material";

type TCustomChipProps = ChipProps & {
  label: string;
  onClick?: () => void;
  isActive: boolean;
};

const CustomChip: React.FC<TCustomChipProps> = ({ isActive, onClick, label, ...props }) => {
  return (
    <Chip
      size={props.size || 'medium'}
      label={capitalize(label)}
      style={{
        backgroundColor: isActive ? alpha("#13F195", 0.1) : "",
        color: isActive ? "#13F195" : "",
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default CustomChip;
