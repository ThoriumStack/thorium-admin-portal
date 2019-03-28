import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Dashboard from '@/components/Dashboard.vue'

import {configurationRoutes} from './configurationRoutes'

import ContactDetails from "@/modules/contactdetail/pages/ContactDetails";



Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: "dashboard",
          component: Dashboard
        },

        {
          path: 'contacts',
          name: 'contactDetails',
          component: ContactDetails
        }
      ],
    },


    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/configuration',
      component: Home,
      children: configurationRoutes
    },



  ],
})
