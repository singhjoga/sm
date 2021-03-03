
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createApp } from 'vue';
import { reactive } from 'vue';
import App from './App.vue';

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
const app = createApp(App);
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