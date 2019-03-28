<template>
    <page title="create_role" :is-loading="isLoading" translate="true" icon="shield">
        <form class="ui form">

            <text-field v-model="currentRole.description" label="description"></text-field>
            <div class="ui segment">
                <h5 class="ui header">Permissions</h5>
                <div class="field">
                    <div class="ui checkbox">

                        <input v-model="currentPermission.ownerScoped" class="ui checkbox" type="checkbox"/>
                        <label>Owner Scoped</label>
                    </div>
                </div>
                <div class="field">
                    <vue-drop-down v-model="currentPermission.permissionType"
                                   :options="permissionTypes"></vue-drop-down>
                </div>
                <div class="field">
                    <vue-drop-down v-model="selectedResource" :options="resources"></vue-drop-down>
                </div>
                <div class="field">
                    <vue-drop-down loading="resourceLoading" v-model="currentPermission.resourceDetailId"
                                   :options="resourceDetails"></vue-drop-down>
                </div>
                <button @click.prevent="addPermission" class="ui positive button"><i class="plus icon"></i> Add
                </button>
                <div class="ui relaxed divided list">

                    <div v-for="permissionItem in currentRole.rolePermissions" class="ui item">
                        <div class="header">
                            {{ permissionItem.resourceDescription }}
                        </div>
                        <div class="right floated content">
                            <div @click="removePermissionItem(permissionItem)" class="ui negative icon button"><i
                                    class="ui  trash icon"></i></div>
                        </div>
                        <div class="content">
                            <em> {{ permissionItem.permissionTypeDescription }}</em> {{
                            permissionItem.resourceDetailDescription }}
                            <span v-if="permissionItem.ownerScoped">(Owner Scoped)</span>
                        </div>

                    </div>
                </div>
            </div>
            <button id="btnSave" @click.prevent="saveRole" class="ui primary button"><i class="save icon"></i> {{$t('save')}}
            </button>
        </form>
    </page>
</template>

<script>
  import TextField from "@/components/common/form-components/TextField";
  import VueDropDown from "@/components/common/VueDropDown";
  import {AuthorizationAdminClient} from "@/modules/authorization/api/v1_0/AuthorizationAdminClient_v1_0";
  import Page from "@/components/common/Page";

  export default {
    name: "EditRole",
    components: {Page, VueDropDown, TextField},
    data: function () {
      return {
        isLoading: false,
        resources: [],
        permissionTypes: [{description: 'Allow', id: 1}, {description: 'Deny', id: 2}],
        selectedResource: null,
        resourceDetails: [],
        resourceLoading: false,
        currentPermission: {},
        currentRole: {
          rolePermissions: []
        }
      }
    },
    watch: {
      selectedResource() {
        let vm = this;
        let adminClient = new AuthorizationAdminClient();
        vm.currentPermission.resourceDetailId = null;
        vm.resourceLoading = true;
        adminClient.GetResourceDetails(vm.selectedResource, 0, 100)
          .then((resourceDetails) => {
            vm.resourceLoading = false;
            vm.resourceDetails = resourceDetails.items;
          })
      }
    },
    methods: {
      saveRole() {
        let vm = this;
        let adminClient = new AuthorizationAdminClient();
        vm.isLoading = true;
        if (vm.$route.params.roleId) {
          adminClient.UpdateRole(vm.currentRole)
            .then((result) => {
              let roleId = vm.$route.params.roleId;
              adminClient.GetRole(roleId)
                .then((role) => {
                  vm.currentRole = role;
                  vm.isLoading = false;
                })
            });
        }
        else {
          adminClient.AddRole(vm.currentRole)
            .then((result) => {
              this.$router.push({name: "editRole", params: {roleId: result.id}})

              vm.isLoading = true;
            });
        }
      },
      removePermissionItem(item) {
        this.currentRole.rolePermissions.splice(this.currentRole.rolePermissions.indexOf(item), 1)
      },
      getResourceDescription(resourceId) {
        return this.resources.filter(_ => _.id == resourceId)[0].description;
      },
      getResourceDetailDescription(resourceDetailId) {
        return this.resourceDetails.filter(_ => _.id == resourceDetailId)[0].description;
      },
      getPermissionType(permissionTypeId) {
        return this.permissionTypes.filter(_ => _.id == permissionTypeId)[0].description;
      },

      addPermission() {
        this.currentPermission.permissionTypeDescription = this.getPermissionType(this.currentPermission.permissionType);
        this.currentPermission.resourceDescription = this.getResourceDescription(this.selectedResource);
        this.currentPermission.resourceDetailDescription = this.getResourceDetailDescription(this.currentPermission.resourceDetailId);
        this.currentRole.rolePermissions.push(_.cloneDeep(this.currentPermission))
      }
    },
    mounted() {
      let vm = this;
      let adminClient = new AuthorizationAdminClient();


      this.isLoading = true;
      adminClient.GetAllResources(0, 100)
        .then((roles) => {
          vm.resources = roles.items;
          if (vm.$route.params.roleId) {
            let roleId = vm.$route.params.roleId;
            adminClient.GetRole(roleId)
              .then((role) => {
                vm.currentRole = role;
                vm.isLoading = false;
              })
          }
          else {
            vm.isLoading = false;
          }
        });
    }
  }
</script>

<style scoped>

</style>