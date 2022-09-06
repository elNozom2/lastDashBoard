<template>
  <v-container>
    <!-- <v-form ref="menuName">
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="nameRules" outlined label="menu name"></v-text-field
        ></v-col>
      </v-row>
    </v-form> -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-btn @click="$router.push('/menus')" class="mx-4 btn-color" dark>
            <v-icon dark> mdi-table-large </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <app-form :form="data"> </app-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="search"
              outlined
              clearable
              label="Search"
              class="mx-4"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-combobox
              clearable
              outlined
              item-text="name"
              v-model="cat"
              @change="selectCategory"
              item-value="groupCode"
              :items="categories"
              label="category"
              small-chips
            ></v-combobox>
          </v-col>
        </v-row>
      </v-card-title>
      <!-- <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <v-btn width="100%" @click="addSelectedItems()" class="app-btn"
                  >add all</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <v-btn width="100%" @click="removeSelectedItems()" class="app-btn"
                  >remove all</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title> -->
      <v-card-text>
        <v-row>
          <v-col cols="5.5">
            <v-data-table
              :headers="headers"
              item-key="name"
              :search="search"
              fixed-header
              show-select
              v-model="selected"
              height="400px"
              :items="items"
              :loading="loading"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn class="app-btn" @click="addToMenu(item)"> add To menu</v-btn>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="1">
            <div class="middleArea">
              <div class="btn-container maxHeight">
                <v-row class="halfHeight">
                  <v-col cols="12">
                    <v-btn
                      width="100%"
                      height="100%"
                      @click="addToMenu(null)"
                      class="app-btn"
                    >
                      <v-icon>mdi-arrow-right-thick</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
                <v-row class="halfHeight">
                  <v-col cols="12">
                    <v-btn
                      width="100%"
                      height="100%"
                      @click="deleteFromMenu(null)"
                      class="app-btn select-all-btn"
                    >
                      <v-icon>mdi-arrow-left-thick</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="5.5">
            <v-data-table
              :headers="headers"
              item-key="name"
              fixed-header
              show-select
              v-model="selectedMenu"
              :search="search"
              height="400px"
              :items="selections"
              :loading="loading"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn class="app-btn" @click="deleteFromMenu(item)">
                  remove from menu</v-btn
                >
              </template>
              <template v-slot:item.price="props">
                <v-edit-dialog
                  @save="editPrice(props)"
                  :return-value.sync="props.item.price"
                  large
                  persistent
                >
                  <div>{{ props.item.price }}</div>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">{{ $t("update_price") }}</div>
                    <v-text-field
                      v-model="props.item.price"
                      label="Edit"
                      single-line
                      counter
                      autofocus
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- <v-row>
      <v-col cols="12">
        <v-btn @click="back()" class="app-btn" width="100%">
          {{ $t("submit") }}</v-btn
        ></v-col
      >
    </v-row> -->
  </v-container>
</template>
<script lang="ts">
import bus from "@/bus";
import AppForm from "@/components/form/Form.vue";
import data from "@/forms/menuName";
import Api from "@/utils/axios/Api";
const Http = Api.getInstance();
export default {
  name: "menusEditAdd",
  data() {
    return {
      data,
      dialog: true,
      categoty: "",
      search: "" as string,
      loading: false,
      nameRules: [(v) => !!v || "Name is required"],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Price", sortable: true, value: "price" },
        { text: "category", sortable: true, value: "groupName" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      items: [],
      selections: [],
      selected: [],
      selectedMenu: [],
      categories: [],
    };
  },
  components: {
    "app-form": AppForm,
  },
  beforeUnmount() {
    console.log("unmounted");
    bus.$emit("getTableData");
  },
  methods: {
    async filldata() {
      let groupCode = 0;
      if (this.categoty != null && this.categoty.id) {
        groupCode = this.categoty.id;
      }
      this.loading = true;
      const data = await Http.get(
        `/menus/items?menuId=${this.$route.params.id}&groupCode=${groupCode}`
      );
      console.log(data);
      this.items = data.items;
      this.selections = data.menuItems;
      this.loading = false;
    },
    makeStrApiAdd(item) {
      let apiStr = "";
      if (item != null) {
        apiStr += `${item.Id}-${item.price}`;
      } else {
        for (let i = 0; i < this.selected.length; i++) {
          apiStr += `${this.selected[i].Id}-${this.selected[i].price},`;
        }
        apiStr = apiStr.slice(0, -1);
      }
      return apiStr;
    },
    makeStrApiDelete(item) {
      let apiStr = "";
      if (item != null) {
        apiStr += `${item.MenuItemId}`;
      } else {
        for (let i = 0; i < this.selectedMenu.length; i++) {
          apiStr += `${this.selectedMenu[i].MenuItemId},`;
        }
        apiStr = apiStr.slice(0, -1);
      }
      return apiStr;
    },
    async addToMenu(item) {
      await Http.put(`menus/attach/${this.$route.params.id}`, {
        items: this.makeStrApiAdd(item),
      });
      this.selected = [];
      this.selectedMenu = [];
      this.filldata();
    },
    async deleteFromMenu(item) {
      await Http.put(`menus/detach/${this.$route.params.id}`, {
        items: this.makeStrApiDelete(item),
      });
      this.selected = [];
      this.selectedMenu = [];
      this.filldata();
    },
    editPrice(obj) {
      Http.put("menus/price/edit", {
        id: obj.item.MenuItemId,
        Price: Number(obj.value),
      });
    },
    selectCategory(val) {
      console.log(this.cat);
      this.filldata();
    },
  },
  watch: {
    "$route.params.id": {
      handler: async function (id) {
        if (id) {
          console.log(this.$route.params.id);
          this.dialog = false;
          this.filldata();
          bus.$emit("getTableData");
        } else {
          console.log("no id");
          this.dialog = true;
          this.items = [];
          this.selections = [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    const data = await Http.get("groups/list");
    this.categories = data;
  },
};
</script>
