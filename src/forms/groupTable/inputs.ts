import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import { required, num } from "@/utils/validations/validations";
import { DefaultInputInterface, SelectInputInterface } from "@/types";

export const name: DefaultInputInterface = {
  name: "GroupTableName",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "name",
  cols: 6,
  type: "text",
  value: "",
};
export const startTable: DefaultInputInterface = {
  name: "StartNo",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value), (value: string) => num(value)],
  label: "start table",
  cols: 6,
  type: "number",
  value: "",
};
export const countTable: DefaultInputInterface = {
  name: "TableCount",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value), (value: string) => num(value)],
  label: "countTable",
  cols: 6,
  type: "number",
  value: "",
};
