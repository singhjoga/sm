import Vue from 'vue'
import App from './App.vue';
import './registerServiceWorker'
import {setupRouter} from './router'
import store from './store'
import { createApp } from 'vue';
import { reactive } from 'vue';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Ripple from 'primevue/ripple';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
//import '@fullcalendar/core/main.min.css';
//import '@fullcalendar/daygrid/main.min.css';
//import '@fullcalendar/timegrid/main.min.css';
import './assets/layout/layout.scss';
import './assets/layout/flags/flags.css';

import Toolbar from 'primevue/toolbar';
import Menubar from 'primevue/menubar';
import Panel from 'primevue/panel';
import { makeServer } from './api/mocks/server'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import { setupI18n } from './i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import {initAuth} from '@/api/auth'

export function start(initSuccess: boolean, loginSuccess: boolean, keycloak) {
  initAuth(initSuccess,loginSuccess,keycloak)
  const i18n = setupI18n({
    // globalInjection: true,
     legacy: false,
     locale: 'en',
     fallbackLocale: 'en',
     messages: {
       en
     } 
   })
  const router = setupRouter(i18n)
  const app = createApp(App).use(i18n);
  app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
  app.config.globalProperties.$primevue = reactive({ ripple: true });
  app.use(PrimeVue);
  app.use(router)
  app.use(ToastService);
  app.use(store)

  app.component('InputText', InputText);
  app.component('Button', Button);
  app.component('Toolbar', Toolbar)
  app.component('Menubar', Menubar)
  app.component('Panel', Panel)
  app.component('Toast', Toast);
  app.mount('#app')
  if (process.env.NODE_ENV === "development") {
    makeServer()
  }
  if (loginSuccess) {
    store.dispatch("auth/loginChanged")
  }
}