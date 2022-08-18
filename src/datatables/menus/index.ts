import { Action, DatatableIntetrface, HeaderInterface } from "@/types";
import TextHeader from "@/utils/table/header/textHeader";
import ActionsHeader from "@/utils/table/header/actions/actionsHeader";
import Datatable from "@/utils/table/table";
import ImgHeader from "@/utils/table/header/imgHeader";
import DateHeader from "@/utils/table/header/dateHeader";
// import filters from "./filters";
import PriceHeader from "@/utils/table/header/priceHeader";
import { create } from "@/tables/actions";
const headers: HeaderInterface[] = [
  new TextHeader("name"),
  new TextHeader("created_at"),
  new ActionsHeader("menus", { edit: true, view: false, delete: true }),
];
const url = "menus/list";
const actions: Action[] = [create];
const params: DatatableIntetrface = {
  title: "menus Table",
  headers,
  description: "articles_desc",
  url,
  actions,
};

const datatable = new Datatable(params);
export default datatable;
