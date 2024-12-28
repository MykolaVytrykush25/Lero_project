import { Pagination, PaginationProps } from "@mui/material";

const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <Pagination
      sx={{ alignSelf: "center" }}
      showFirstButton
      showLastButton
      boundaryCount={1}
      siblingCount={1}
      {...props}
    />
  );
};

export default CustomPagination;
