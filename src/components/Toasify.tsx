import { toast, ToastOptions } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "success" | "warning" | "error" | "default";

export const notify = (message: string, typeNotify: ToastType) => {
  const toastOptions: ToastOptions = {
    type: typeNotify,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
  };

  toast(message, toastOptions);
};
