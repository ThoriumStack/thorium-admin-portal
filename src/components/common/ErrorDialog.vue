<template>
    <vue-modal tiny ref="ErrorDialog" @close="close()" id="ErrorDialog">
        <template slot="header">{{title}}</template>
        <template slot="content">{{content}}</template>
        <template slot="actions"><button class="ui button red danger deny" @click="close()">Ok</button></template>
    </vue-modal>
</template>

<script>
  import VueModal from "./VueModal";
  export default {
    name: "ErrorDialog",
    components: {VueModal},
    data: function () {
      return {
        title: "",
        content: ""
      }
    },
    methods: {
      show: function (title, content) {
        this.title = title;
        this.content = content;
        this.$refs.ErrorDialog.show();

      },
      close: function () {
        this.$refs.ErrorDialog.close();
      }
    }
  }
</script>

<style scoped>

</style>