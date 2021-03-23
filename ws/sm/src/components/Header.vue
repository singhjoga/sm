<template>
  <div class="layout-topbar">
      <button class="p-link layout-menu-button" @click="onMenuToggle">
        <span class="pi pi-bars"></span>
      </button>
    <div class="layout-topbar-icons">
        <button @click="doLogin1">Login</button>
        <button @click="doVerify1">Verify</button>
        <button @click="doLogout1">Logout</button>
      <span class="layout-topbar-search">
        <InputText type="text" :placeholder="t('menu.search')" />
        <span class="layout-topbar-search-icon pi pi-search"></span>
      </span>
      <LangSwitch class="p-ml-4"/>
    </div>
  </div>
</template>

<script lang="ts">
import { resolveTransitionHooks, defineComponent, computed, watch, ref } from "vue";
import LangSwitch from "./LangSwitch.vue"
import { useI18n } from 'vue-i18n'
import {doLogin, doVerify, doLogout} from '@/assets/test'
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
      },
      doLogin1() {
        doLogin()
      },
      doVerify1() {
        doVerify()
      },
      doLogout1() {
        doLogout()
      }
  },
  components: {
    LangSwitch: LangSwitch
  },
	setup() {
		const {t} = useI18n()
		return {
			t,searchLabel:t('menu.search')
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