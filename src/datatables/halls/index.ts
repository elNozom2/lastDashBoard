import { HeaderInterface } from "@/types";
import { DatatableIntetrface } from "@/types";
import TextHeader from "@/utils/table/header/textHeader";
import ActionsHeader from "@/utils/table/header/actions/actionsHeader";
import dateHeader from "@/utils/table/header/dateHeader";
import Datatable from "@/utils/table/table";
import filters from "./filters";
const headers: HeaderInterface[] = [
  new TextHeader("GroupTableName"),
  new TextHeader("StartNo"),
  new TextHeader("TableCount"),
  // new dateHeader("created at"),
  new ActionsHeader("halls", { edit: true, delete: true }),
];
const url = "groupTable/";
const params: DatatableIntetrface = {
  title: "Halls",
  headers,
  description: "categories_desc",
  searchable: true,
  url,
};

const datatable = new Datatable(params);
export default datatable;
