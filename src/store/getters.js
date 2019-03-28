export default {
  isAuthenticated () {
    return vueAuth.isAuthenticated()
  },

  appContext (state) {
    return state.appContext;
  },
  appName (state) {
    return state.appName;
  },


  locale(state){
    return state.locale;
  }

  
}