import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { UiState } from "./types";
import { RootState } from "../types";

export const state: UiState = {
  loading: true,
  snackBar: {
    Active: false,
    Title: "",
    Msg: "",
  },
  imageDialog: {
    Active: false,
    Title: "",
    url: "",
  },
  dialog: {
    Active: false,
    Title: "",
    Msg: "",
    action: () => {},
  },
  respondModal: false,
  respondModalUserId: 0,
};

const namespaced: boolean = true;

export const ui: Module<UiState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
