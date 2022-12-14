import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import dateImputComponent from "@/components/form/Date.vue";
import {
  DefaultInputInterface,
  SelectInputInterface,
  DateInputInterface,
} from "@/types";
import { required } from "@/utils/validations/validations";
import { num } from "@/utils/validations/validations";
export const Name: DefaultInputInterface = {
  name: "name",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "filterName",
  cols: 6,
  type: "text",
  required: false,
  value: "",
};
export const DateFrom: DateInputInterface = {
  name: "DateFrom",
  generateInputHtml: () => Vue.extend(dateImputComponent),
  label: "DateFromFilter",
  cols: 6,
  type: "text",
  required: false,
  value: "",
  min: "",
  max: "",
  limit: "date",
};
export const DateTo: DateInputInterface = {
  name: "DateTo",
  generateInputHtml: () => Vue.extend(dateImputComponent),
  label: "DateToFilter",
  cols: 6,
  type: "text",
  required: false,
  value: "",
  min: "",
  max: "",
  limit: "date",
};
export const category: SelectInputInterface = {
  name: "groupCode",
  cache: false,
  initialFetch: true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  label: "categoryFilter",
  cols: 6,
  type: "text",
  required: false,
  valueKey: "id",
  text: "name",
  url: "groups/list",
};
export const priceFrom: DefaultInputInterface = {
  name: "priceFrom",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => num(value)],
  label: "priceFromFilter",
  cols: 6,
  type: "number",
  required: false,
  value: "",
};
export const priceTo: DefaultInputInterface = {
  name: "priceTo",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => num(value)],
  label: "priceToFilter",
  cols: 6,
  type: "number",
  required: false,
  value: "",
};
