<template>
    <div class="ui dropdown link item">
        <i class="globe icon"></i>
        <i class="dropdown icon"></i>
        <div class="ui  menu">
            <div  v-for="menu in contexts" class="item">
            <i class="dropdown icon"></i>
            <span class="text"><i v-bind:style="{'background-image': menu.icon}" class="ui icon icon-image"></i> {{menu.description}}</span>
                <div class="menu">
            <a
                    v-for="context in menu.items"
                    @click="switchContext(context)"
                    class="ui item">
                <i v-bind:class="[context.icon, 'flag']" v-bind:style="{'background-color': context.color}"></i>
                <span style="color: black" class="ui black small text">{{context.name}}</span>
            </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "ContextSwitcher",
    data: function () {
      return {
        contexts: [
          {
            description: 'Tenant 1',
            icon: `url("/img/logo.png")`,
            items: [
              {key: "tenant1.za", name: "Tenant 1 ZA", icon: "za flag", color: '#000000'},
              {key: "tenant1.bw", name: "Tenant 1 Botswana", icon: "bw flag", color: '#000000'},
              ]
          },
          {
            description: 'Tenant 2',
            icon: `url("/img/GB.png")`,

            items: [
              {key: "tenant2.za", name: "Tenant 2 ZA", icon: "za flag"},

            ]
          },

        ]
      }
    },
    methods: {
      switchContext(context) {
        console.log("setting context to " + context)
        this.$store.commit('APP_CONTEXT', context.key)
        this.$router.push("/")
      }
    },
    mounted() {
      $(this.$el)
        .dropdown()
    }
  }
</script>

<style scoped>
.icon-image {
    background-size: contain;
    background-repeat: no-repeat;
}
</style>