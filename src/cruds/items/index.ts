import router from "@/router";
import form from "@/forms/items";
import EditAdd from "@/utils/crud/editAdd";
import EditAddInterface from "@/utils/crud/editAddInterface";

const callBack = (form: any) => {
  router.back();
};
const editAddInterface: EditAddInterface = {
  title: "items",
  table: "items",
  form,
  callBack,
};
const editAddCategory = new EditAdd(editAddInterface);
export default editAddCategory;
