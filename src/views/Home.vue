<template xmlns:v-auth-show="">
    <div v-shortkey="['ctrl', 'shift', 'g']" @shortkey="imAHotKey()">
        <div id="main-toolbar" v-bind:class="barTheme" class="ui top inverted massive menu top fixed ">
            <a @click="toggleMenu" class="header item"><i class="bars icon"></i> </a>
            <router-link class="header item left aligned" to="/" tag="a">
                <i v-bind:style="logoStyle" id="main-header-icon" class="ui icon"></i>
                {{$t($store.state.appName )}}
            </router-link>
            <div class="ui button item" @click="imAHotKey"><i class="ui fast forward icon"></i></div>

            <context-switcher></context-switcher>
            <locale-switcher></locale-switcher>

        </div>
        <div id="main-container" class="ui container">
            <div id="sidebar-main" class="ui sidebar  attached inverted massive vertical menu">

                <div class="ui attached segment inverted">
                    <div class="content ">
                        <i class="user icon huge floating left floated"></i>

                        <span class="header right">
                               {{ $store.getters.user.given_name }}
                            </span>
                    </div>
                    <div class="extra content">
                        <div class="ui">


                        </div>
                    </div>
                </div>
                <router-link class="header item" v-on:click.native="toggleMenu" to="/" tag="a">
                    {{$t('home')}}
                    <i class="ui home icon"></i>
                </router-link>
                <router-link
                        v-auth-show:customer_search
                        class="header item" v-on:click.native="toggleMenu" to="/customers" tag="a">
                    {{$t('customer_search')}}<i class="ui search icon"></i>
                </router-link>
                <div class="header item">{{$t('comms')}}<i class="talk icon"></i>
                    <div class="menu">
                        <router-link
                                v-on:click.native="toggleMenu"
                                v-auth-show:sms_send
                                class="item" to="/comms/sms" tag="a">
                            {{$t('sms')}}
                        </router-link>
                    </div>
                </div>

                <div
                        v-auth-show:configuration_read
                        class="header item">
                    Configuration<i class="ui settings icon"></i>
                    <div class="menu  ">

                        <router-link
                                v-auth-show:user_access

                                v-on:click.native="toggleMenu"
                                class="ui tiny  item" to="/configuration/authorization" tag="a">
                            {{$t('access_control')}}
                        </router-link>

                    </div>
                </div>


                <div id="logout-div" class="ui  simple segment">
                    <div id="logout-button" @click="logOut" class="ui right negative stretched aligned  button"><i
                            class="inverted power off icon"></i> {{$t('logout')}}
                    </div>
                </div>
            </div>
            <transition
                    name="fade"
                    mode="out-in"
            >
                <router-view/>
            </transition>

        </div>


    </div>
</template>

<script>
  // @ is an alias to /src
  import LocaleSwitcher from "../components/LocaleSwitcher";
  import Mgr from "../common/SecurityService";
  import ContextSwitcher from "../components/ContextSwitcher";
  import VueModal from "@/components/common/VueModal";
  import TextField from "@/components/common/form-components/TextField";

  import  themes from '@/common/themeSetup'

  export default {
    name: "home",

    data() {
      return {
        barTheme: []
        ,
        logoStyle: {},
        mgr: new Mgr(),
        signedIn: true,
        policyNumber: '',
        isGotoPolicyLoading: false
      };
    },
    components: {
      TextField,
      VueModal,
      ContextSwitcher,
      LocaleSwitcher
    },
    mounted() {

        if (this.$store.state.appContext === '') {
          this.$store.commit('APP_CONTEXT', 'tenant1.za')
        }
      this.setContext(this.$store.state.appContext )
      $('.ui.dropdown')
        .dropdown({})
      ;


    },
    computed: {
      appContext () {
        return this.$store.state.appContext;

      },
      currentLocale() {
        return this.$route.params.locale;
      }
    },
    watch: {
      appContext(newContext, oldContext) {
        this.setContext(newContext);

      }
    },
    methods: {
      setContext(newContext) {
        this.logoStyle["background-image"] = `url('${themes[newContext].logo}')`;
        this.barTheme = [];
        this.$store.commit('APP_NAME', themes[newContext].appName);
        this.barTheme.push(themes[newContext].toolbar)
      },
      toggleMenu: function () {
        $("#sidebar-main").sidebar("toggle");
      },
      logOut: function () {
        this.mgr.signOut();
      },
      imAHotKey() {
        alert('hotkey activated')
      },

    }
  };
</script>

<style scoped>
    .tenant1-toolbar {
        background-color: #0c85d0 !important;
    }
    .tenant2-toolbar {
        background-color: red!important;
    }

</style>
