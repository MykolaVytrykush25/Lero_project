import { Box, CircularProgress } from "@mui/material";

//styles
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
	return (
		<Box className={styles.loader}>
			<CircularProgress size={64} />
		</Box>
	);
};

export default Loader;
