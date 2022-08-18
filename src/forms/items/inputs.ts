import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import { required, num } from "@/utils/validations/validations";
import { DefaultInputInterface, SelectInputInterface } from "@/types";

export const name: DefaultInputInterface = {
  name: "name",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "name",
  cols: 6,
  type: "text",
  value: "",
};
export const nameEn: DefaultInputInterface = {
  name: "name_en",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "nameEn",
  rules: [(value: string) => required(value)],
  cols: 6,
  type: "text",
  value: "",
};
export const groupCode: SelectInputInterface = {
  name: "groupCode",
  cache: false,
  text: "name",
  cols: 6,
  initialFetch: true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  clearable: true,
  valueKey: "id",
  value: "name",
  type: "combo",
  url: "groups/list",
  label: "groupCode",
};
export const barCode: DefaultInputInterface = {
  name: "barCode",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "barcode",
  cols: 6,
  type: "text",
  value: "",
};
export const price: DefaultInputInterface = {
  name: "price",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "price",
  rules: [(value: string) => required(value)],
  cols: 6,
  type: "number",
  value: "",
};

export const imgInput: DefaultInputInterface = {
  name: "image",
  generateInputHtml: () => Vue.extend(FileInputComponent),
  label: "Img",
  cols: 6,
  type: "file",
  value: "",
};
export const estimatedTime: DefaultInputInterface = {
  name: "estimated_time",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "estimatedtime",
  rules: [(value: string) => num(value)],
  cols: 6,
  type: "number",
  value: "",
};
