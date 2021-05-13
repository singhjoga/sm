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
        <a class="p-link p-ripple" @click="handleLogin"  role="menuitem">
					<i class="pi pi-fw pi-unlock"></i>
					<span>Login</span>
				</a>
         </li>
        <li>
         <a class="p-link p-ripple" @click="handleRegister"  role="menuitem">
            <i class="pi pi-fw pi-book"></i>
            <span>Register</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {api} from '@/api/auth'
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
     // alert(api.getAccessToken())
      this.$store
        .dispatch("auth/logout")
        .then(resp => {
        //  this.$router.push("/login");
        })
        .catch(resp => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: resp.message,
            life: 3000
          });
        });
    },
    handleLogin() {
     // alert(api.getAccessToken())
      this.$store
        .dispatch("auth/login")
        .then(resp => {
        //  this.$router.push("/login");
        })
        .catch(resp => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: resp.message,
            life: 3000
          });
        });
    },
    handleRegister() {
      console.log("Register")
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