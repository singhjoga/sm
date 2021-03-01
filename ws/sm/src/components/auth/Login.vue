
<template>
  <div style="height:300px;position:relative;">
    <Panel header="Login" class="centered">
      <div class="p-fluid">
        <div class="p-field p-grid">
          <label for="email" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">E-Mail</label>
          <div class="p-col-12 p-md-10">
            <InputText id="email" type="email" v-model="email" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label for="password" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Password</label>
          <div class="p-col-12 p-md-10">
            <InputText id="password" type="password" v-model="password" />
          </div>
        </div>
      </div>
      <div class="p-p-4">
        <Button label="Login" @click="handleSubmit" class="p-d-block p-mx-auto" />
      </div>
    </Panel>
  </div>
</template>
<script lang="ts">

import { post, ApiError, bus } from "../../api/api";
import { LoginResponse, AccessToken, AuthConstants, User, loginUser } from "./";
import { resolveTransitionHooks, defineComponent } from "vue";
import { getCurrentInstance } from 'vue'

export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "joga.singh@gmail.com",
      password: ""
    };
  },
  methods: {
    handleSubmit(e: any) {
      e.preventDefault();
      const bodyObj = {
        email: this.email,
        password: this.password
      };
      post("/api/login", bodyObj)
        .then(resp => {
          this.handleSuccess(resp);
        })
        .catch(reason => {
          this.handleFailure(reason);
        });
    },
    handleSuccess(resp: LoginResponse) {
      const user: User = loginUser(resp)
      bus.emit("login");
      if (this.$route.params.nextUrl != null) {
        if (Array.isArray(this.$route.params.nextUrl)) {
            this.$router.push(this.$route.params.nextUrl[0]);
        }else{
          this.$router.push(this.$route.params.nextUrl);
        }
      } else {
        if (user.isAdmin) {
          this.$router.push("admin");
        } else if (user.isSysAdmin) {
          this.$router.push("sysadmin");
        } else {
          this.$router.push("customer");
        }
      }
    },
    handleFailure(resp: ApiError) {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: resp.message,
        life: 3000
      });
    }
  }
});
</script>
<style>
.centered {
  position: absolute;
  height: 100px;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 50%;
  margin-left: -100px;
  width: 400px;
}
</style>