<template>
  <div>
    <div class="layout-profile" v-if="user != null">
      <div>
        <img src="../assets/user.png" alt />
      </div>
      <button class="p-link layout-profile-link" @click="onClick">
        <span class="username">{{user.name}}</span>
        <i class="pi pi-fw pi-cog"></i>
      </button>
      <transition name="layout-submenu-wrapper">
        <ul v-show="expanded">
          <li>
            <button class="p-link">
              <i class="pi pi-fw pi-user"></i>
              <span>Account</span>
            </button>
          </li>
          <li>
            <button class="p-link" @click="handleLogout">
              <i class="pi pi-fw pi-power-off"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </transition>
    </div>
    <div class="layout-menu-container" v-if="user === null">
      <ul class="layout-menu">
        <li>
          <router-link to="/login" :class="'p-ripple'" exact role="menuitem">
            <i class="pi-user"></i>
            <span>Login</span>
          </router-link>
        </li>
        <li>
          <router-link to="/register" :class="'p-ripple'" exact role="menuitem">
            <i class="pi-user"></i>
            <span>Register</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    },
    handleLogout() {
      this.$store.dispatch("auth/logout")
        .then(resp=>{
          this.$router.push("/login");
        })
        .catch(resp => {
          this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: resp.message,
        life: 3000
      });
        });
    }
  },
  computed: {
    user: function() {
      const ret = this.$store.getters["auth/loggedUser"];
      return ret;
    }
  }
};
</script>

<style scoped>
</style>