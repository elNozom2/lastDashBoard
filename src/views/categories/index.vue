<template>
  <div class="py-12">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            :label="$t('search')"
            @input="searchItem"
            solo-inverted
            dense
            rounded
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>
          <v-alert
            border="left"
            v-else-if="groups.length == 0"
            color="red lighten-2"
            class="my-8 text-center"
            dark
          >
            {{ $t("no_categories") }}
          </v-alert>
          <v-card v-else class="my-5">
            <v-card-text>
              <v-treeview
                transition
                rounded
                ref="tree"
                :search="search"
                hoverable
                item-key="name"
                :items="groups"
              >
                <template v-slot:append="{ item }">
                  <v-icon
                    v-for="(action, index) in actions"
                    v-show="action.isVisible(item)"
                    class="mx-2"
                    :key="index"
                    @click.prevent="action.clickAction(item)"
                  >
                    {{ action.icon }}
                  </v-icon>
                  <!-- <v-icon v-if="item.level < 2">
                    {{ actions[3].icon }}
                  </v-icon> -->
                </template>
              </v-treeview>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="no-padding">
          <router-view class="no-padding" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import bus from "@/bus";
import { groupsHierarchyResponse } from "@/models/group";
import { ListHierarchy } from "@/repositories/group";
import { openDialog } from "@/utils/dialog/dialog";
import { openImageDialog } from "@/utils/imageDialog/Dialogbar";
import { actions } from "@/store/ui/actions";
import Api from "@/utils/axios/Api";
const Http = Api.getInstance();
const route = router.currentRoute;
export default {
  data() {
    return {
      search: "",
      loading: true,
      actions: [
        {
          icon: "mdi-square-edit-outline",
          isVisible: (item: groupsHierarchyResponse) => true,
          clickAction: (item: groupsHierarchyResponse) => {
            if (
              route.name == "categories-edit" &&
              route.params.id == item.groupCode.toString()
            ) {
              return;
            }
            bus.$emit("editAddFind", item.groupCode);
            router.push({
              name: "categories-edit",
              params: { id: item.groupCode.toString() },
            });
          },
        },
        {
          icon: "mdi-trash-can-outline",
          isVisible: (item: groupsHierarchyResponse) => {
            return item.childrenLength == 0;
          },
          clickAction: (item: groupsHierarchyResponse) => {
            openDialog("Warning", "mmms", () => {
              Http.delete(`group/${item.groupCode}`);
            });
          },
        },
        {
          icon: "mdi-image-area",
          isVisible: (item: groupsHierarchyResponse) => {
            return item.imagePath.length > 0;
          },
          clickAction: (item: groupsHierarchyResponse) => {
            openImageDialog("ssss", item.imagePath);
          },
        },
        {
          icon: "mdi-plus-circle-outline",
          isVisible: (item: groupsHierarchyResponse) => {
            return item.level < 2 ? true : false;
          },
          clickAction: (item: groupsHierarchyResponse) => {
            // bus.$emit('resetAppForm')
            //  bus.$emit('changeFormFocus' , "groupName")
            let elem = document.querySelector(".v-input.groupName input");
            elem!.focus();

            this.goToCreate();

            bus.$emit("changeFormStateKey", {
              key: "parentCode",
              value: item.code,
              reset: true,
            });
            console.log(elem);
          },
        },
      ],
      groups: [] as groupsHierarchyResponse[],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      ListHierarchy().then((res: groupsHierarchyResponse[]) => {
        if (res.length == 0) {
          this.goToCreate();
        }
        this.loading = false;
        this.groups = res;
      });
    },
    goToCreate() {
      if (router.currentRoute.name !== "categories-create")
        router.push({ name: "categories-create" });
    },
    searchItem(search: string) {
      let state: boolean = false;
      if (search != null && search.length > 0) {
        state = true;
      }
      this.$refs.tree.updateAll(state);
    },
  },
  mounted() {
    this.getData();
    bus.$on("getGroupsTree", () => {
      this.getData();
    });
  },
};
</script>
