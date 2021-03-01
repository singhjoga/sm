<template>
  <div class="content-section implementation card">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" src="../assets/logo.png" height="40" class="p-mr-2" />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
        <Button v-show="showLogoutButton"
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
import { Options, Vue } from "vue-class-component";
import { logoutUser, getUser } from "./auth";
import { post, ApiError, bus } from "../api/api";

@Options({
  props: {
    msg: String
  },
  data() {
    return {
      showLogoutButton: false
    }
  },
  created() {
    bus.on('login',(user) => {
      this.showLogoutButton = true
    })
    bus.on('logout',(user) => {
      this.showLogoutButton = false
    })
  }
})
export default class Header extends Vue {
  items = menuItems;

  handleLogout() {
    logoutUser();
    bus.emit("logout");
    this.$router.push("/");
  }
  isUserLogged() {
    return getUser() != null;
  }
}
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--surface-d);
}
</style>