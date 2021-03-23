/* eslint-disable */
//import {Keycloak} from 'keycloak-js'
const initOptions = {
    responseMode: 'fragment',
    flow: 'standard',
    enableLogging: true
};
const config={
   
    "clientId": "sm-ui",
    "realm" : "sm",
    "auth-server-url" : "http://localhost:8080/auth/",
    "ssl-required" : "external",
    "resource" : "sm-ui"
}
const kc = null; //Keycloak(config)
function output(data) {
    if (typeof data === 'object') {
        data = JSON.stringify(data, null, '  ');
    }
    alert("Data="+data);
}

function event(event) {
    alert("Event="+event);
}
/*
kc.onAuthSuccess = function () {
    event('Auth Success');
};

kc.onAuthError = function (errorData) {
    event("Auth Error: " + JSON.stringify(errorData) );
};

kc.onAuthRefreshSuccess = function () {
    event('Auth Refresh Success');
};

kc.onAuthRefreshError = function () {
    event('Auth Refresh Error');
};

kc.onAuthLogout = function () {
    event('Auth Logout');
};

kc.onTokenExpired = function () {
    event('Access token expired.');
};

kc.onActionUpdate = function (status) {
    switch (status) {
        case 'success':
            event('Action completed successfully'); break;
        case 'cancelled':
            event('Action cancelled by user'); break;
        case 'error':
            event('Action failed'); break;
    }
};
*/
  export function doVerify() {
    alert('Verify')
    kc.init(initOptions).then(function(authenticated) {
        alert('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
    }).catch(function() {
        alert('Init Error');
    });
}
export function doLogin() {
    alert('Login')
    kc.init(initOptions).then(function(authenticated) {
        alert('Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')');
        kc.login({redirectUri:'http://localhost'});
    }).catch(function() {
        alert('Init Error');
    });
}
export function doLogout() {
    kc.logout()
}
/*
kc.onAuthSuccess = function () {
    alert('Auth Success');
};

kc.onAuthError = function (errorData) {
    alert("Auth Error: " + JSON.stringify(errorData) );
};

*/