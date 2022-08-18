import { Action, DatatableIntetrface, HeaderInterface } from "@/types";
import TextHeader from "@/utils/table/header/textHeader";
import ActionsHeader from "@/utils/table/header/actions/actionsHeader";
import Datatable from "@/utils/table/table";
import ImgHeader from "@/utils/table/header/imgHeader";
import DateHeader from "@/utils/table/header/dateHeader";
import filters from "./filters";
import PriceHeader from "@/utils/table/header/priceHeader";
import { create } from "@/tables/actions";
const headers: HeaderInterface[] = [
  new TextHeader("name"),
  new ImgHeader("image"),
  new TextHeader("category"),
  new PriceHeader("price"),
  new TextHeader("estimated_time"),
  new TextHeader("created_at"),
  new ActionsHeader("items", { edit: true, view: false, delete: true }),
];
const url = "items/list";
const actions: Action[] = [create];
const params: DatatableIntetrface = {
  title: "Items Table",
  headers,
  description: "articles_desc",
  url,
  filters,
  actions,
};

const datatable = new Datatable(params);
export default datatable;
