import { GetterTree } from "vuex";
import { UiState } from "./types";
import { RootState } from "../types";
import { snackBarModel } from "@/utils/snack/snackbar.model";
import { dialogModel } from "@/utils/dialog/dialogbar";
import { imageDialog } from "@/utils/imageDialog/DialogInterface";

export const getters: GetterTree<UiState, RootState> = {
  loading(state): boolean {
    return state.loading;
  },
  snackBar(state): snackBarModel {
    return state.snackBar;
  },
  dialog(state): dialogModel {
    return state.dialog;
  },
  imageDialog(state): imageDialog {
    return state.imageDialog;
  },
  respondModalStatus(state): boolean {
    return state.respondModal;
  },
  respondModalUserId(state): number {
    return state.respondModalUserId;
  },
};
