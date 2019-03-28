<template>
    <div @keyup.ctrl.enter="$emit('text-submitted', $event.target.value)" class="field">
        <label>{{$t(label)}}</label>
            <input v-if="!multi"
                    v-bind:name="name"
                    v-bind:placeholder="$t(placeholder) || $t(label)"
                    type="text"
                   maxlength="maxlength"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value)"
            >
            <textarea v-else
                    v-bind:name="name"
                    v-bind:placeholder="$t(placeholder) || $t(label)"
                    maxlength="maxlength"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value)"

            ></textarea>

    </div>
</template>

<script>
  export default {
    name: "TextField",
    props: [
      'name',
      'placeholder',
      'label',
      'value',
      'multi',
      'maxlength'
    ]
  }
</script>

<style scoped>

</style>