import { TToastVariants } from "@/@types/base";

export const copyToClipboard = async (
  text: string,
  showToast: (message: string, type: TToastVariants) => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied", "info");
  } catch (err) {
    showToast("Failed to copy text", "error");
  }
};
