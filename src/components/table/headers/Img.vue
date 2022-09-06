<template>
  <td><img class="table-img" :src="src" /></td>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["item", "itemKey"],
  computed: {
    src() {
      const item = this.item as any;
      const key = this.itemKey as any;
      const value = item[key];
      if (value == null || value == "") {
        return `https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg?w=826&t=st=1662199903~exp=1662200503~hmac=e5b24c6839db1e00e57808e1f0db17a6187e7bc937e8caf31bc74a1f71b52806`;
      } else return `${process.env.VUE_APP_IMG_URL}${value}`;
    },
  },
});
</script>
