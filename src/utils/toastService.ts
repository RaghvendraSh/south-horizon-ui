// src/utils/toastService.ts
import toast from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "info";
type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export const showToast = (
  message: string,
  type: ToastType = "info",
  duration = 3000,
  position: ToastPosition = "bottom-right"
) => {
  // Dismiss all existing toasts before showing the new one
  toast.dismiss();

  const options = { duration, position };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "loading":
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
  }
};
