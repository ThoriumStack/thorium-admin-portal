<template>
    <div v-if="signedIn">
        <div id="app">
            <localizer>
                <router-view></router-view>
            </localizer>
        </div>
    </div>

</template>
<script>
  import Localizer from './components/Localizer'
  import ErrorDialog from './components/common/ErrorDialog'
  import Mgr from './common/SecurityService';
  import {AuthClient} from "@/modules/authorization/api/v1_0/authService";

  export default {
    name: 'App',
    components: {

      Localizer,
      ErrorDialog
    },
    data() {
      return {
        mgr: new Mgr(),
        signedIn: true
      };
    },
    mounted() {
      this.mgr.getSignedIn().then(
        success => {
          this.signedIn = success;
          if (success) {
            let auth = new AuthClient();
            auth.GetAuthDetails()
            .then((result) => {
              this.$store.dispatch("loadUserAuthDetail", result)
            });
          }

          this.$store.dispatch("loadUser")
        },
        err => {
          console.log(err);
        }
      );
     }
  }
</script>
<style scoped>

    @import '/styles/semantic/semantic.css';

    /*#app {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;


        }*/

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    body {

    }



</style>
