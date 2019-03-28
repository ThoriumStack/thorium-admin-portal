<template>
    <div v-if="uiTranslationsLoaded">
        <slot />
    </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'

  import { locales } from '../config/i18n'
  import { switchDocumentLocale } from '../services/i18n/util'
  import { setUiLocale, t, currentLocale } from '../services/i18n'
  import * as moment from  "moment";

  import { EventBus } from '../EventBus.js';



  export default {
    data() {
      return {
        uiTranslationsLoaded: false,
      }
    },

    methods: {
      set(locale) {
        this.uiTranslationsLoaded = false

        setUiLocale(locale)
          .then(() => {
            Vue.prototype.$t = t



            moment.defineLocale('en-ZA', {
              longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'MMM D HH:mm', // Changed here
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
            });

            moment.locale(locale)
            Vue.prototype.$moment = moment

            this.uiTranslationsLoaded = true

            const dir = _.find(locales, l => l.code === locale).dir

            switchDocumentLocale(
              locale,
              dir,
              {
                withRTL: [
                  '/static/styles/vendor/GhalamborM/bootstrap4-rtl.css',
                  '/static/styles/rtl.css',
                ],
              },
            )
          })
          /* eslint-disable no-console */
          .catch(err => console.error(err))
      },
    },

    mounted() {
      this.set(this.$store.getters.locale);
      let vm = this;
      EventBus.$on('changedLocale', () => {
        vm.set(this.$store.getters.locale);
      });
    }
  }
</script>
