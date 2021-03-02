
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
import { LoginResponse, AccessToken, AuthConstants, User, api } from "../../api/auth";
import { resolveTransitionHooks, defineComponent } from "vue";
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "primevue/usetoast";
export default defineComponent({
  name: "Login",

   setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const toast = useToast();

    const email = ref("joga.singh@gmail.com")
    const password = ref('')

    function handleSuccess(resp: LoginResponse) {
      const user: User = api.loginUser(resp)
      store.dispatch('auth/login', user)
      if (route.params.nextUrl != null) {
        if (Array.isArray(route.params.nextUrl)) {
            router.push(route.params.nextUrl[0]);
        }else{
          router.push(route.params.nextUrl);
        }
      } else {
        if (user.isAdmin) {
          router.push("admin");
        } else if (user.isSysAdmin) {
          router.push("sysadmin");
        } else {
          router.push("customer");
        }
      }
    }
    function handleFailure(resp: ApiError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: resp.message,
        life: 3000
      });
    }
    function handleSubmit(e: any) {
      e.preventDefault();
      const bodyObj = {
        email: email.value,
        password: password.value
      };
      post("/api/login", bodyObj)
        .then(resp => {
          handleSuccess(resp);
        })
        .catch(reason => {
          handleFailure(reason);
        });
    }
    return {
      email: email,
      password: password,
      handleSubmit: handleSubmit
    };
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