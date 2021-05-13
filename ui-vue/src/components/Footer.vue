<template>
  <div class="layout-footer">
    <span class="footer-text" style="margin-left: 5px">{{t('messages.footer')}}</span>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: "Footer",
  setup() {
	const {t} = useI18n()
	return {
		t
	}
  }
});
</script>

<style scoped>
</style>