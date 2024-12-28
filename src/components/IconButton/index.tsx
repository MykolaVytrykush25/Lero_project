import cn from "classnames";
import { ButtonHTMLAttributes, forwardRef } from "react";

//styles
import styles from "./IconButton.module.scss";

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant: "primary" | "secondary" | "tertiary";
  icon: React.ReactNode;
};

const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  ({ icon, variant, size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, {
          [styles.button__primary]: variant === "primary",
          [styles.button__secondary]: variant === "secondary",
          [styles.button__tertiary]: variant === "tertiary",
          [styles[`button__${size}`]]: size,
        })}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

export default IconButton;
