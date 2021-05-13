<template>
  <span class="locale-switcher">
    <select v-model="locale">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">{{locale.name}}</option>
    </select>
  </span>
</template>

<script>
import { getSupportedLocales } from "@/i18n";
import { bus } from "@/api/api";
import {defineComponent,ref} from "vue";
import { useI18n } from 'vue-i18n'
export default defineComponent({
  data: () => ({
    locales: getSupportedLocales(),
    locale1: ""
  }),
  methods: {
    changeLocale(e) {
      const locale = e.target.value;
      bus.emit("localeChange", locale);
    }
  },
  watch: {
    locale: function(newLocale, oldLocale) {
      bus.emit("localeChange", newLocale);
    }
  },

  setup() {
    const {locale} = useI18n()
    const localeValue= ref(locale.value)
    return {locale:localeValue}
  }
});
</script>