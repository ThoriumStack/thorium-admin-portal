<template>
    <div class="ui dropdown link item">
        <i class="language icon"></i>
        <i class="dropdown icon"></i>
    <div class="ui  menu">

    <!--<div id="language-selector-container" class="ui  item">-->
        <a
                v-for="locale in locales"
                :key="locale.code"
                @click="setLocale(locale.code)"
                class=" item">
            <i v-bind:class="[icons[locale.code], 'flag']"></i>
            {{locale.name}}
        </a>
    </div>
    </div>
    <!--</div>-->
</template>

<script>

  import {locales} from '../config/i18n'
  import { EventBus } from '../EventBus.js';

  export default {
    data() {
      return {
        icons: {
          "en-ZA": "za",
          "en": "gb",
          af: "za",
        },
        locales,
      }
    },
    methods: {
      setLocale: function (code) {
        this.$store.dispatch("setLocale", code).then(()=>{
        EventBus.$emit("changedLocale");
        });

      }
    },
    mounted() {
      $(this.$el)
        .dropdown()
    }
  }
</script>

<style scoped>

</style>
