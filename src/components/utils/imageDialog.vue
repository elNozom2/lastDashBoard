<template>
  <div class="text-center">
    <v-dialog v-model="imageDialog.Active" width="500">
      <v-card class="relative-position">
        <v-img width="100%" height="100%" :src="imagePath"></v-img>

        <v-icon class="abTopLeft" @click="imageDialog.Active = false"> mdi-close</v-icon>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters({
      imageDialog: "ui/imageDialog",
    }),
    imagePath() {
      return `${process.env.VUE_APP_IMG_URL}${this.imageDialog.url}`;
    },
  },
});
</script>
