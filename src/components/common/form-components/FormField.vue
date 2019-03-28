<template>
    <div class="ui field">
        <label>{{$t(labelText)}}</label>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "FormField",
    props: ["labelText"]
  }
</script>

<style scoped>

</style>