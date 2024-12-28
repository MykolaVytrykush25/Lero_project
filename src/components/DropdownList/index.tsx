import { ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";

//styles
import styles from "./DropdownList.module.scss";

//components
import Fade from "../Animations/Fade";

//types
import { TFieldProps } from "@/@types/base";

type TDropdownListProps = Omit<TFieldProps, "setValue"> & {
	icon?: ReactNode;
	children: (closeDropdown: () => void) => ReactNode;
};

const DropdownList: React.FC<TDropdownListProps> = ({ value, icon, children }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownListRef = useRef<HTMLUListElement>(null);
	const [dropdownPosition, setDropdownPosition] = useState<{ left: number }>({ left: 0 });

	useEffect(() => { 
		if (dropdownRef.current && dropdownListRef.current) {
			const dropdownWidth = dropdownRef.current.getBoundingClientRect().width;
			const dropdownListWidth = dropdownListRef.current.getBoundingClientRect().width;

			if (dropdownListWidth > dropdownWidth) {
				setDropdownPosition({ left: -(dropdownListWidth - dropdownWidth) });
			}
		}
	}, [isOpened]);

	const handleMouseEnter = () => setIsOpened(true);
	const handleMouseLeave = () => setIsOpened(false);
	const closeDropdown = () => setIsOpened(false);

	return (
		<div
			ref={dropdownRef}
			className={styles.dropdown}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className={styles.dropdown__wrapper}>
				<div
					className={cn(
						styles.dropdown__head,
						isOpened ? styles.dropdown__head__opened : ""
					)}
				>
					{icon && <div className={styles.dropdown__head__icon}>{icon}</div>}
					<p>{value}</p>
				</div>
				<Fade open={isOpened}>
					<ul
						ref={dropdownListRef}
						style={{ left: dropdownPosition.left }}
						className={styles.dropdown__list}
					>
						{children(closeDropdown)}
					</ul>
				</Fade>
			</div>
		</div>
	);
};

export default DropdownList;
