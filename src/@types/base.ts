export type TMenuItem = {
  href: string;
  title: string;
  icon?: React.ElementType;
};

export type TPaginationParams = {
  limit: number;
  page: number;
};

export type TModalProps = {
  isOpened: boolean;
  handleClose: () => void;
};

export type TFieldProps = {
  value: string;
  setValue: (i: string) => void;
};

export enum Status {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error",
}

export type TSelectData = {
  label: string;
  value: string;
};

export type TToastVariants = "success" | "info" | "warning" | "error";
