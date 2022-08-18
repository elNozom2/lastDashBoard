<template>
  <v-container>
    <v-form ref="menuName">
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="nameRules" outlined label="menu name"></v-text-field
        ></v-col>
      </v-row>
    </v-form>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="search"
              outlined
              label="Search"
              class="mx-4"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-combobox outlined label="category"></v-combobox>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-data-table
              :headers="headers"
              item-key="name"
              :search="search"
              fixed-header
              height="400px"
              :items="items"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn class="app-btn" @click="addItemToMenu(item)"> add To menu</v-btn>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="6">
            <v-data-table
              :headers="headers"
              fixed-header
              :search="search"
              height="400px"
              :items="selections"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn class="app-btn" @click="removeItem(item)"> remove from menu</v-btn>
              </template>
              <template v-slot:item.price="props">
                <v-edit-dialog :return-value.sync="props.item.price" large persistent>
                  <div>{{ props.item.price }}</div>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">Update price</div>
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
    <v-row>
      <v-col cols="12">
        <v-btn @click="sendMenu" class="app-btn" width="100%"> submit</v-btn></v-col
      >
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Api from "@/utils/axios/Api";
const Http = Api.getInstance();
export default {
  name: "menusEditAdd",
  data() {
    return {
      search: "" as string,
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
      prices: new Map() as map,
    };
  },
  methods: {
    deleteItem(items, item) {
      for (var i = 0; i < items.length; i++) {
        if (items[i] === item) {
          items.splice(i, 1);
        }
      }
    },
    addItemToMenu(item) {
      this.selections.push(item);
      this.deleteItem(this.items, item);
    },
    removeItem(item) {
      item.price = this.prices.get(item.Id);
      this.items.push(item);
      this.deleteItem(this.selections, item);
    },
    makeStringApi(): string {
      let menu: string = " ";
      for (const item of this.selections) {
        menu += `${item.Id}-${item.price},`;
      }
      menu = menu.slice(0, -1);
      return menu;
    },
    sendMenu() {
      if (this.$refs.menuName.validate()) {
        console.log(this.makeStringApi());
      }
    },
  },
  async mounted() {
    const data = await Http.get("menus/items");
    this.items = data.items;
    for (const item of this.items) {
      this.prices.set(item.Id, item.price);
    }
  },
};
</script>
