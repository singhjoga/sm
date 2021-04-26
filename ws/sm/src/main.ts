import Vue from 'vue'
import App from './App.vue';
import Keycloak from 'keycloak-js'
import {start} from './start'

const initOptions = {
  url: 'http://127.0.0.1:8080/auth', realm: 'sm', clientId: 'sm-ui'
}

const keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: 'check-sso'}).then((auth) => {
  if (!auth) {
    console.log("Not Authenticated");
    //window.location.reload();
  } else {
    console.log("Authenticated");
  }
  start(true, auth, keycloak)
}).catch(() => {
  console.error("Authentication initialization failed!");
  start(false, false, keycloak)
});
