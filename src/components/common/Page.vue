<template>
    <div class="ui container left aligned">
        <div class="ui dimmer">
            <div class="ui text loader">{{$t('loading')}}</div>
        </div>
        <div  v-if="crumbs" class="ui breadcrumb">


            <span v-for="(crumb, index) in crumbs">
            <a v-if="crumb.route" @click="crumbNavigate(crumb)" class="section">{{ $t(crumb.title) }}</a>
            <span v-else  class="section">{{ $t(crumb.title) }}</span>

            <span v-if="index !== crumbs.length - 1" class="divider">/</span>
            </span>

        </div>
        <div class="ui dimmable raised segment page-container" v-bind:class="{ loading: isLoading }">
            <h3 v-if="title" class="ui very padded header">

                <i v-if="icon" class="icon" :class="icon"></i>

                {{ translate ? $t(title) : title }}

            </h3>
            <div v-if="title" class="ui clearing divider"></div>
            <slot ></slot>
        </div>

    </div>
</template>

<script>
  export default {
    name: "Page",
    props: ["title", "icon", "isLoading", "translate", "crumbs"],
    data: function () {
      return {
        // crumbs: null
      };
    },
    methods: {
      crumbNavigate(crumb) {
        this.$router.push(crumb.route)
      }
    }
  }
</script>

<style scoped>
    @media (max-width: 480px) {
         .container {
            margin-left: 0px!important;
            margin-right: 0px!important;
        }
        .segment {
            border-style: none!important;
            margin-left: 0px!important;
            margin-right: 0px!important;
            box-shadow: none!important;

        }
        .header {
            text-align: center;
        }
    }

    .loading {
        animation-delay: 1s;
    }

    .page-container {
        /*column-count:                12;*/

    }
    .container {
        margin-top: 65px;
    }
</style>