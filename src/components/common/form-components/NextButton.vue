<template>
    <button id="btnNext" class="ui primary submit button " @keyup.ctrl.enter="activate" @click.prevent="activate">{{$t('next')}}<i class="right arrow icon"></i></button>
</template>

<script>
  export default {
    name: "NextButton",
    methods: {
      activate() {
        this.$emit('activated')
      }
    }

  }
</script>

<style scoped>

</style>