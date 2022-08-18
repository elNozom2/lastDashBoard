<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="6">
        <v-text-field
          v-model="search"
          @input="expand"
          :label="$t('search')"
          solo-inverted
          dense
          rounded
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-card class="my-5">
          <v-card-text>
            <v-treeview
              :search="search"
              v-if="loading"
              selectable
              v-model="selections"
              item-key="id"
              ref="tree"
              item-text="name"
              transition
              :items="items"
            >
              <template v-slot:append="{ item }">
                <v-text-field
                  outlined
                  solo-inverted
                  class="my-input"
                  @change="mappingPrices($event, item)"
                  v-if="!item.children"
                  :value="item.id"
                  dense
                  label="price"
                ></v-text-field>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="my-5">
          <v-card-text>
            <v-col cols="12">
              <v-text-field
                outlined
                label="menu name"
                v-model="menuName"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                depressed
                @click="sendStr()"
                class="app-btn"
                width="100%"
                color="primary"
              >
                submit
              </v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Api from "@/utils/axios/Api";
import bus from "@/bus";
const Http = Api.getInstance();
export default {
  name: "createMenu",
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
            },
            {
              id: 10,
              name: "material2 :",
            },
          ],
        },
        {
          id: 15,
          name: "Downloads :",
          children: [
            { id: 16, name: "October : pdf" },
            { id: 17, name: "November : pdf" },
            { id: 18, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          name: "Videos :",
          children: [
            {
              id: 20,
              name: "Tutorials :",
            },
            { id: 24, name: "Intro : mov" },
            { id: 25, name: "Conference introduction : avi" },
          ],
        },
      ],
      selections: [] as string[],
      prices: new Map() as map,
      loading: true as boolean,
      search: "" as string,
      openAll: false as boolean,
      menuName: "" as string,
    };
  },
  methods: {
    mappingPrices(event, item) {
      this.prices.set(item.id, event);
    },
    async sendStr() {
      let allMenus: string = "";
      for (const id of this.selections) {
        allMenus += `${id}-`;
        if (this.prices.get(id) == "" || this.prices.get(id) == undefined) {
          allMenus += "#";
        } else {
          allMenus += this.prices.get(id);
        }
        allMenus += ",";
      }
      allMenus = allMenus.slice(0, -1);
      await Http.post("menus/editadd", {
        name: this.menuName,
        items: allMenus,
      });
      bus.$emit("getTableData");
      this.$router.push("/menus");
    },
    expand(val: string) {
      console.log(val);
      let state: boolean = false;
      if (val != null && val.length > 0) {
        state = true;
      }
      this.$refs.tree.updateAll(state);
    },
  },
  mounted() {
    if (this.$route.params.id == undefined) {
      let defaultItems = [
        {
          id: 1,
          selected: false,
          name: "Applications :",
          children: [
            { id: 2, selected: false, name: "Calendar : app" },
            { id: 3, selected: false, name: "Chrome : app" },
            { id: 4, selected: false, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          selected: false,
          name: "Documents :",
          children: [
            {
              id: 6,
              selected: false,
              name: "vuetify :",
            },
            {
              id: 10,
              selected: false,
              name: "material2 :",
            },
          ],
        },
        {
          id: 15,
          selected: false,
          name: "Downloads :",
          children: [
            { id: 16, selected: false, name: "October : pdf" },
            { id: 17, selected: false, name: "November : pdf" },
            { id: 18, selected: false, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          selected: false,
          name: "Videos :",
          children: [
            {
              id: 20,
              selected: false,
              name: "Tutorials :",
            },
            { id: 24, selected: false, name: "Intro : mov" },
            { id: 25, selected: false, name: "Conference introduction : avi" },
          ],
        },
      ];
    } else {
      let menu = [
        {
          id: 1,
          selected: false,
          name: "Applications :",
          children: [
            { id: 2, selected: true, name: "Calendar : app" },
            { id: 3, selected: true, name: "Chrome : app" },
            { id: 4, selected: true, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          selected: false,
          name: "Documents :",
          children: [
            {
              id: 6,
              selected: false,
              name: "vuetify :",
            },
            {
              id: 10,
              selected: false,
              name: "material2 :",
            },
          ],
        },
        {
          id: 15,
          selected: false,
          name: "Downloads :",
          children: [
            { id: 16, selected: false, name: "October : pdf" },
            { id: 17, selected: false, name: "November : pdf" },
            { id: 18, selected: false, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          selected: false,
          name: "Videos :",
          children: [
            {
              id: 20,
              selected: false,
              name: "Tutorials :",
            },
            { id: 24, selected: true, name: "Intro : mov" },
            { id: 25, selected: true, name: "Conference introduction : avi" },
          ],
        },
      ];
      this.items = menu;
      for (const item of this.items) {
        for (const child of item.children) {
          if (child.selected) {
            this.selections.push(child.id);
          }
        }
      }
    }
  },
};
</script>
