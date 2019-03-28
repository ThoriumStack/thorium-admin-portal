<template>
    <table class="ui  fixed very basic table">

        <tbody>
        <tr v-for="(item, index) in value">
            <td>{{index}}</td>
            <td v-if="IsPrimitive(item)">{{item}}</td>
            <td v-if="!IsPrimitive(item)">
                <!--<h1>YES</h1>h1>-->
                <!--{{item}}-->
                <table class="ui table" v-if="isArray(item)">
                    <thead>
                        <th v-for="(row, rowIndex) in value[index][0]">{{rowIndex}}</th>
                    </thead>
                    <tbody>
                    <tr v-for="(row, rowIndex) in value[index]">
                        <td v-for="(td, tdi) in row">{{td}}</td>
                    </tr>
                    </tbody>
                </table>
                <!--{{isArray(item) ? "array" : "not"}}-->
                <!--<v-else simple-display v-model="value[index]"></simple-display>-->
            </td>

        </tr>

        </tbody>
    </table>
</template>

<script>
  export default {
    name: "SimpleDisplay",
    props: ['value'],
    data: function () {
      return {
        columns: []
      }
    },
    methods: {
      IsPrimitive(val) {
        return !(this.isObject(val) || this.isArray(val))
      },
      IsJsonString(str) {
        try {
          console.log(str)
          let val = JSON.parse(str);
          return this.isObject(val) || this.isArray(val)
        } catch (e) {
          return false;
        }
        return true;
      },
      parse(item) {
        console.log("parse", item);
        return JSON.parse(item);
      },
      isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
      },
      isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
      }
    },
    watch: {
      value() {

        for (let key in this.value) {
          console.log(key)
          this.columns.push(key)
        }
      }


    }

  }
</script>

<style scoped>

</style>