<template>
    <page title="edit_resource" :is-loading="isLoading" translate="true" icon="shield">
            <form class="ui form">

                <text-field v-model="currentResource.description" label="description"></text-field>
                <text-field v-model="currentResource.key" label="key"></text-field>
                <div class="ui segment">
                    <h5 class="ui header">Details</h5>

                    <text-field label="description" v-model="currentResourceDetail.description"></text-field>
                    <text-field label="key" v-model="currentResourceDetail.key"></text-field>
                    <button @click.prevent="addResourceDetail" class="ui positive button"><i class="plus icon"></i> Add
                    </button>
                    <div class="ui relaxed divided list">

                        <div v-for="resourceDetail in currentResource.resourceDetails" class="ui item">
                            <div class="header">
                                {{ resourceDetail.resourceDescription }}
                            </div>
                            <div class="right floated content">
                                <div @click="removeResourceDetail(resourceDetail)" class="ui negative icon button"><i
                                        class="ui  trash icon"></i></div>
                            </div>
                            <div class="content">
                                <h3> {{ resourceDetail.description }}</h3>
                                <p>{{resourceDetail.key}}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <button id="btnSave" @click.prevent="saveResource" class="ui primary button"><i class="save icon"></i> {{$t('save')}}
                </button>
            </form>
    </page>
</template>

<script>
  import {AuthorizationAdminClient} from "@/modules/authorization/api/v1_0/AuthorizationAdminClient_v1_0";
  import TextField from "@/components/common/form-components/TextField";
  import Page from "@/components/common/Page";

  export default {
    name: "ResourceAdmin",
    components: {Page, TextField},
    data: function () {
      return {
        isLoading: false,
        currentResource: {
          resourceDetails: []
        },
        currentResourceDetail: {}
      }
    },
    methods: {
      removeResourceDetail(resourceDetail) {
        let index = this.currentResource.resourceDetails.indexOf(resourceDetail);
        this.currentResource.resourceDetails.splice(index, 1);
      },
      addResourceDetail() {
        this.currentResource.resourceDetails.push(_.cloneDeep(this.currentResourceDetail))
      },
      saveResource() {
        let vm = this;
        let authClient = new AuthorizationAdminClient();
        vm.isLoading = true;
        if (this.currentResource.id) {
         authClient.UpdateResource(this.currentResource)
           .then((result) => {
             authClient.GetResource(this.currentResource.id)
               .then((resource) => {
                 vm.isLoading = false;
               });

           });
        }
        else {
          vm.isLoading = true;
          authClient.AddResource(
            vm.currentResource
          )
            .then((response) => {
              vm.isLoading = false;
              this.$router.push({name: "editResource", params: {resourceId: response.id}})
            });
        }
      }
    },
    mounted() {
      let vm = this;
      let authClient = new AuthorizationAdminClient();
      if (this.$route.params.resourceId) {
        let resourceId = this.$route.params.resourceId;
        authClient.GetResource(resourceId)
          .then((resource) => {
            vm.currentResource = resource;
          });

      }
    }
  }
</script>

<style scoped>

</style>