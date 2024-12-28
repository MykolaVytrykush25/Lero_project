"use client";

//styles
import { ThemeProvider } from "@mui/material/styles";

//theme
import { theme } from "@/theme";

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
