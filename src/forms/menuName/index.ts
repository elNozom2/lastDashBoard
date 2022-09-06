import router from "@/router";
import Input from "@/utils/form/inputs/Input";
import Form from "@/utils/form/form";
import { FormInterface } from "@/types";
import { menuName } from "./inputs";
import bus from "@/bus";
import Axios from "axios";
import Api from "@/utils/axios/Api";
const Http = Api.getInstance();
const inputs: Input[] = [new Input(menuName)];

const submit = (form: any): Promise<any> => {
  // if (form.name == "" || form.name == null) {
  //   return new Promise((resolve, reject) => {
  //     reject({ response: { data: "" } });
  //   });
  // } else {
  return new Promise((resolve, reject) => {
    Http.post("menus/editadd", { name: form.name })
      .then((d: any) => {
        router.push(`/menu/edit/${d}`);
        resolve(d);
      })
      .catch((e: any) => {
        reject(e);
      });
  });
  // }
};

// const callBack = (form: any): any => {
//   bus.$emit("closeMenuDiaolog");
// };

const params: FormInterface = {
  title: "menu name",
  submit,
  inputs,
};

const categoryForm = new Form(params);

export default categoryForm;
