export default {
  'SET_LOADING_FLAG' (state, payLoad) {
    state.isLoading = payLoad;
  },
  'IS_AUTHENTICATED' (state, payload) {
    state.isAuthenticated = payload.isAuthenticated
  },
  'APP_CONTEXT' (state, payLoad) {
    state.appContext = payLoad;
  },
  'APP_NAME' (state, payLoad) {
    state.appName = payLoad;
  },


  'LOCALE' (state, payload) {
    state.locale = payload
  }
};