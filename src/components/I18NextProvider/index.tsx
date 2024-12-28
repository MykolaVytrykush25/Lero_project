"use client";

import React, { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

interface I18nextProviderWrapperProps {
	children: ReactNode;
}

const I18nextProviderWrapper: React.FC<I18nextProviderWrapperProps> = ({ children }) => {
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nextProviderWrapper;
