import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import { required, num } from "@/utils/validations/validations";
import { DefaultInputInterface, SelectInputInterface } from "@/types";

export const menuName: DefaultInputInterface = {
  name: "name",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "menu name",
  cols: 12,
  type: "text",
  value: "",
};
