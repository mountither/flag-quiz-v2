import { Slide, ToastOptions } from "react-toastify";

export const defaultToastConfig: ToastOptions = {
  position: "top-left",
  autoClose: 200,
  closeOnClick: true,
  theme: "dark",
  transition: Slide,
  hideProgressBar: true,
  draggable: true,
  progress: undefined,
};
