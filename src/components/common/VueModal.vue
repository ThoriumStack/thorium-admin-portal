<template>
    <div v-if="modalShown" class="ui modal" v-bind:class="{ fullscreen: fullscreen, tiny: tiny, basic: basic, mini: mini }">
        <i v-if="!unclosable" class="close icon" @click="close()"></i>

        <div  v-if="hasHeaderSlot" class="header">
            <slot name="header"></slot>
        </div>
        <div v-else class="ui icon header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "VueModal",
    data: function () {
      return {}
    },
    props: {
      tiny: Boolean,
      unclosable: Boolean,
      basic: Boolean,
      mini: Boolean,
      fullscreen: Boolean
    },
    computed: {
      modalShown() {
        return $(this.$el)
          .modal("is visible")
      },
      hasHeaderSlot() {
        return !this.basic && !!this.$slots.header
      }
    },
    methods: {

      close: function () {

        $(this.$el)
          .modal('hide');//.remove();
       // this.$destroy();
        //this.$emit("close");
      },
      show() {
        $(this.$el)
          .modal('observeChanges', true);//fix for modals not scrolling
        $(this.$el).modal('show');

      },
      onShow() {

        this.$emit("onShow")
      }
    },
    destroyed() {
      $(this.$el).modal()
        .remove();
    },

    mounted() {
      let vm = this;
      $(this.$el).modal({
        allowMultiple: true,
        closable: !vm.unclosable,
        centered: true,
        // onShow() {
        //   vm.onShow();
        // }

      });

    }
  }
</script>

<style scoped>

</style>