<template>
    <a class="ui button" @click="onClick" >{{$t(buttonText)}}</a>
</template>

<script>
  export default {
    name: "FormButton",
    props: {
      buttonText: {
        type: String
      },
      onClick: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>