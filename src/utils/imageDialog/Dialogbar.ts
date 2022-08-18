import store from "@/store";
import { imageDialog } from "./DialogInterface";
export const openImageDialog = (Title: string, url: string) => {
  store.commit("ui/stopImageDialog");
  let dialog: imageDialog = {
    Active: true,
    Title,
    url,
  };
  store.commit("ui/setImageDilaog", dialog);
};

export const closeSnack = () => {
  store.commit("ui/stopDialog");
};
