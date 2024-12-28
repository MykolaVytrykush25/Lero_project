"use client";

import { forwardRef } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Alert } from "@mui/material";

//components
import { Close } from "@mui/icons-material";

const CustomSnackbar = forwardRef<HTMLDivElement, any>(({ id, message, variant, onClose }: any, ref) => {
	return (
		<Alert
			ref={ref}
			severity={variant}
			action={<Close sx={{ cursor: "pointer" }} fontSize='small' onClick={() => onClose(id)} />}
			sx={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
		>
			{message}
		</Alert>
	);
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			autoHideDuration={2500}
			style={{ maxWidth: "600px", width: "100%" }}
			Components={{
				default: CustomSnackbar,
				error: CustomSnackbar,
				success: CustomSnackbar,
				info: CustomSnackbar,
				warning: CustomSnackbar,
			}}
		>
			{children}
		</SnackbarProvider>
	);
};

export const useToast = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showToast = (message: string, variant: "success" | "info" | "warning" | "error", autoHide?: boolean) => {
		enqueueSnackbar(message, {
			variant,
			autoHideDuration: autoHide ? null : 4000,
			content: (key, message) => (
				<CustomSnackbar id={key} message={message} variant={variant} onClose={() => closeSnackbar(key)} />
			),
		});
	};

	return { showToast };
};
