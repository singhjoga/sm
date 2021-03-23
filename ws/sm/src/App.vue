
<template>
  <div :class="containerClass" @click="onWrapperClick">
    <Header @menu-toggle="onMenuToggle" />
    <transition name="layout-sidebar">
      <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
        <div class="layout-logo">
          <router-link to="/">
            <img alt="Logo" src="./assets/logo.png" height="50" />
          </router-link>
        </div>
        <UserProfile />
        <LeftPanel :model="menu" @menuitem-click="onMenuItemClick" />
      </div>
    </transition>
    <Toast position="top-center" />
    <div class="layout-main">
      <router-view />
    </div>
    <ShoppingCart :layoutMode="layoutMode" :layoutColorMode="layoutColorMode" @layout-change="onLayoutChange" @layout-color-change="onLayoutColorChange"/>
    <Footer />
  </div>
</template>

<script >
import Header from "./components/Header.vue";
import LeftPanel from "./components/LeftPanel.vue";
import UserProfile from "./components/UserProfile.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import Footer from "./components/Footer.vue";
import {defineComponent,ref} from "vue";
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
export default defineComponent({
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "menu.dashboard",
          icon: "pi pi-fw pi-home",
          to: "/",
          visible: () => this.user != null
        },
        {
          label: "menu.restaurant-management",
          icon: "pi pi-fw pi-sitemap",
          visible: () => this.user != null && !this.user.isCustomer,
          items: [
            {
              label: "menu.restaurant-list",
              icon: "pi pi-fw pi-table",
              to: "/restaurants"
            },
            { label: "menu.restaurant-menu", icon: "pi pi-fw pi-list", to: "/menus" }
          ]
        },
        {
          label: "menu.customer-management",
          icon: "pi pi-fw pi-globe",
          visible: () => this.user != null && this.user.isSysAdmin,
          items: [
            { label: "menu.customer-list", icon: "pi pi-fw pi-list", to: "/customers" }
          ]
        },
        {
          label: 'menu.about',
          icon: "pi pi-fw pi-question",
          to: "/about"
        },
        {
          label: "menu.help",
          icon: "pi pi-fw pi-question",
          to: "/help"
        }
      ]
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;
      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }
          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }
      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
        else return true;
      } else {
        return true;
      }
    },
    isUserLoggedIn() {
      return this.$store.getters["auth/loggedUser"] != null;
    }
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$appState.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.ripple === false
        }
      ];
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light"
        }
      ];
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "assets/layout/images/logo-white.svg"
        : "assets/layout/images/logo.svg";
    },
    user: function() {
      const ret = this.$store.getters["auth/loggedUser"];
      return ret;
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    Header: Header,
    UserProfile: UserProfile,
    LeftPanel: LeftPanel,
    ShoppingCart: ShoppingCart,
    Footer: Footer,
  }
});
</script>

<style lang="scss">
//@import './App.scss';
</style>
