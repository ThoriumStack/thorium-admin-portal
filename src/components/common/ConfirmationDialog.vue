<template>
    <vue-modal tiny  ref="confirmDialog"   id="ErrorDialog">
        <template slot="header">{{title}}</template>
        <template slot="content">{{content}}</template>
        <template slot="actions">
            <button class="ui inverted positive button" @click="accept"><i class="ui checkmark icon"></i> {{$t(acceptButtonText)}}</button>
            <button class="ui inverted negative button" @click="reject"><i class="ui cancel icon"></i> {{$t(rejectButtonText)}}</button>
        </template>
    </vue-modal>

</template>

<script>
  import VueModal from "@/components/common/VueModal";
  export default {
    name: "ConfirmationDialog",
    components: {VueModal},
    data: function () {
      return {
        title: this.$t('confirm'),
        content: '',
        rejectButtonText: 'no',
        acceptButtonText: 'yes',
        onReject: () => {},
        onAccept: () => {}
      }
    },
    methods: {
      show(title, message, acceptButtonText, rejectButtonText, onAccept, onReject) {

        this.title = title;
        this.content = message;
        this.acceptButtonText = acceptButtonText;
        this.rejectButtonText = rejectButtonText;
        this.onAccept = onAccept;
        this.onReject = onReject;

        this.$refs.confirmDialog.show();
      },
      reject() {
        this.onReject();

        this.$refs.confirmDialog.close();
      },
      accept() {
        this.onAccept();

        this.$refs.confirmDialog.close();
      }
    }
  }
</script>

<style scoped>

</style>