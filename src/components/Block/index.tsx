import { forwardRef, ReactNode } from "react";
import cn from "classnames";

//styles
import styles from "./Block.module.scss";

interface IBlockProps {
	withoutPadding?: boolean;
	children: ReactNode;
	className?: string;
	onClick?: (i: any) => void;
}

const Block = forwardRef<HTMLDivElement, IBlockProps>(({ children, className, onClick, withoutPadding = false }, ref) => {
	return (
		<div onClick={onClick} style={withoutPadding ? { padding: 0 } : undefined} ref={ref} className={cn(styles.block, className)}>
			{children}
		</div>
	);
});

export default Block;
