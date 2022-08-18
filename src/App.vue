<template>
  <v-app>
    <ImageDialog />
    <deleteDialog />
    <!-- <loading v-if="loading" /> -->
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Loading from "@/components/layouts/Loading.vue";
import { mapGetters } from "vuex";
import { switchLanguage } from "@/utils/helpers";
import deleteDialog from "@/components/utils/dialog.vue";
import ImageDialog from "@/components/utils/imageDialog.vue";

export default Vue.extend({
  name: "App",
  components: {
    Loading,
    ImageDialog,
    deleteDialog,
  },
  computed: {
    ...mapGetters({
      loading: "ui/loading",
    }),
  },
  methods: {
    init() {
      // handle default  language
      const locale = localStorage.getItem("locale") || "ar";
      switchLanguage(locale, this);

      // handle default  theme
      const mode = localStorage.getItem("mode");
      // check if mode is set to make the change
      if (mode) {
        this.$vuetify.theme.dark = mode !== "light";
      }

      setTimeout(() => {
        this.$store.commit("ui/appLoaded");
        console.log("asdasdasd");
      }, 2000);
    },
  },
  created() {
    this.init();
  },
});
</script>
<style src="@/scss/global/app.css" rel="stylesheet" type="text/css" />
