import Vue from 'vue';
import * as Oidc from "oidc-client";

export const setLoadingFlag = ({commit}, payLoad) => {
    commit('SET_LOADING_FLAG', payLoad);
};

export const setContext = ({commit}, payLoad) => {
  commit('APP_CONTEXT', payLoad);
}

export const setAppName = ({commit}, payLoad) => {
  commit('APP_NAME', payLoad);
}



export const setLocale = ({commit}, payLoad) => {
  commit('LOCALE', payLoad);
}

export const login = (context, payload) => {
  var config = {
    authority: process.env.VUE_APP_OIDC_AUTHORITY,
    client_id: process.env.VUE_APP_OIDC_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_OIDC_REDIRECT_URI,
    response_type: process.env.VUE_APP_OIDC_RESPONSE_TYPE,
    scope:process.env.VUE_APP_OIDC_SCOPE,
    post_logout_redirect_uri : process.env.VUE_APP_OIDC_POST_LOGOUT_REDIRECT_URI,
  };
  var mgr = new Oidc.UserManager(config);

  mgr.signinRedirectCallback().then(function () {
      context.commit('IS_AUTHENTICATED', {
        isAuthenticated: true
      })
  }).catch(function (e) {
    console.error(e);
  });

  function login() {
    mgr.signinRedirect();
  }

  function api() {
    mgr.getUser().then(function (user) {
      var url = "http://localhost:5001/identity";

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        log(xhr.status, JSON.parse(xhr.responseText));
      }
      xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
      xhr.send();
    });
  }

  function logout() {
    mgr.signoutRedirect();
  }
}