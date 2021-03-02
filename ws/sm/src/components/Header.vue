<template>
  <div class="content-section implementation card">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" src="../assets/logo.png" height="40" class="p-mr-2" />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
        <Button
          v-if="user"
          label="Logout"
          icon="pi pi-power-off"
          :style="{'margin-left': '0 .5em'}"
          @click="handleLogout"
        />
      </template>
    </Menubar>
  </div>
  <!--
  <Toolbar>
    <template #left>
      <Button label="New" icon="pi pi-plus" class="p-mr-2" />
      <Button label="Upload" icon="pi pi-upload" class="p-button-success" />
      <i class="pi pi-bars p-toolbar-separator p-mr-2" />
      <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-warning"></SplitButton>
    </template>

    <template #right>
      <Button icon="pi pi-search" class="p-mr-2" />
      <Button icon="pi pi-calendar" class="p-button-success p-mr-2" />
      <Button icon="pi pi-times" class="p-button-danger" />
    </template>
  </Toolbar>
  -->
</template>

<script lang="ts">
const menuItems = [
  {
    label: "File",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus"
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash"
      },
      {
        separator: true
      },
      {
        label: "Export",
        icon: "pi pi-fw pi-external-link"
      }
    ]
  }
];
import { resolveTransitionHooks, defineComponent, computed } from "vue";
import { Options, Vue } from "vue-class-component";
import { post, ApiError, bus } from "../api/api";
import { LoginResponse, AccessToken, AuthConstants, User, api } from "../api/auth";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore()
    const router = useRouter()
    function handleLogout() {
      api.logoutUser();
      //bus.emit("logout");
            console.log("Call logout")
      store.dispatch('auth/logout')
      router.push("/login");
    }
    function getUser() {
      const ret = store.getters['auth/loggedUser']
      return ret
    }
    return {
      items: menuItems,
      user:computed(() => getUser()),
      handleLogout: handleLogout
    }
  }
});
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--surface-d);
}
</style>