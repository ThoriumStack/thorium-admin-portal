import 'fomantic-ui/dist/semantic'
import './registerServiceWorker'


import Vue from 'vue'
import App from './App.vue'
import store from './store/store';
import Dialog from './plugins/Dialog'
import AuthShow from '@/modules/authorization/directives/authShow'
import AuthEnable from '@/modules/authorization/directives/authEnable'
import Transitions from 'vue2-transitions'
 import 'fomantic-ui/dist/semantic.min.css'
import './styles/semantic/semantic.min.css'





import router from './router';
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
//import 'semantic-ui-calendar/dist/calendar.min.css'

import Vuex from "vuex";
import {isValidSAID} from './common/validateSaId'


import Mgr from './common/SecurityService';
import * as moment from "moment";
let mgr = new Mgr();
Vue.config.productionTip = false;

Vue.config.keyCodes.f1 = 112;

Vue.use(require('vue-shortkey'));

/*----------main config begin ----------------*/
const inst =new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
/*----------main config end ----------------*/



// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth) {
//     mgr.getRole().then(
//       sucess => {
//         if (to.meta.role == sucess){
//           next();
//         }else {
//           next('/accessdenied');
//         }
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   } else {
//     next();
//   }
// });
import {settings} from '@/common/httpClient'

settings.vueInstance = inst;


Vue.directive("auth-enable", AuthEnable);
Vue.directive("auth-show", AuthShow);

Vue.use(Transitions)

Vue.use(VueToastr, {
  defaultPosition: 'toast-bottom-right',
  defaultType: 'info',
  defaultTimeout: 2000
});

Vue.use(Dialog);

Vue.use(Vuex);

$.fn.form.settings.rules.saId = function(value, param) {
  // Your validation condition goes here
  return isValidSAID(value)
};

import * as dt from "@/common/dateTimeHandler"
Vue.prototype.$dt = dt

import VueDropDown from "@/components/common/VueDropDown";
import TextField from "@/components/common/form-components/TextField";
import VueTable from "@/components/common/VueTable";
import Page from "@/components/common/Page";
import Pagination from "@/components/common/Pagination";
import VueDatePicker from "@/components/common/VueDatePicker";
import VueModal from "@/components/common/VueModal";

Vue.component('vue-drop-down', VueDropDown)





