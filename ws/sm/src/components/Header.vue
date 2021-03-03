<template>
  <div class="layout-topbar">
    
      <button class="p-link layout-menu-button" @click="onMenuToggle">
        <span class="pi pi-bars"></span>
      </button>
   

    <div class="layout-topbar-icons">
      <span class="layout-topbar-search">
        <InputText type="text" placeholder="Search" />
        <span class="layout-topbar-search-icon pi pi-search"></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { resolveTransitionHooks, defineComponent, computed } from "vue";

const comp = defineComponent({
  name: "Header",
  data() {
    return {
      items: []
    };
  },
  methods: {
      onMenuToggle(event: any) {
          this.$emit('menu-toggle', event);
      }
  }

});
export default comp;
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--surface-d);
}
</style>