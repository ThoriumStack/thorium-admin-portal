import Vue from 'vue';
import Vuex from 'vuex';




import user from './modules/user/user';

import * as actions from './actions';
import mutations from './mutations';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate'
import { defaultLocale } from '../config/i18n'

import authorizationStore from "@/modules/authorization/store/authorizationStore";

Vue.use(Vuex);



export default new Vuex.Store({

  state:{
    isLoading: false,
    isAuthenticated: false,


    locale: defaultLocale,
    appName: '',
    appContext: ''
  },
  plugins: [createPersistedState()],
  actions,
  mutations,
  getters,
  modules:{
    user,
    authorizationStore
  }
});