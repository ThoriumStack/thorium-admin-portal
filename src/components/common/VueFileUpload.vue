<template>
    <file-pond
            name="test"
            ref="pond"
            label-idle="Drop files here..."
            :server="{  process, revert,  restore, load, fetch }"
            @init="handleFilePondInit"
            allow-multiple="false"
            :files="myFiles"
            accepted-file-types="image/jpeg, image/png, application/pdf"/>

            <!--v-on:init="handleFilePondInit"-->
</template>

<script>
  import settings from "@/services/restEndpoints/restServiceSettings";
  // Import Vue FilePond
  import vueFilePond from 'vue-filepond';


  // Import FilePond styles
  import 'filepond/dist/filepond.min.css';

  // Import image preview plugin styles
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import {FileStorageClient} from "@/modules/insurance/api/v1_0/FileStorageClient_v1_0";
  import {HttpError} from "@/common/httpError";

  // Create component
  const FilePond = vueFilePond(FilePondPluginFileValidateType);

  /*FilePond.setOptions({
    server: {
      url: settings('FileStorageClient'),
      process: {
        url: './',
        method: 'POST',
        withCredentials: false,
        headers: {},
        timeout: 7000,
        onload: null,
        onerror: null
      },
      revert: null,
      restore: null,
      load: null,
      fetch: null
    }
  });*/
  
  export default {
    name: "VueFileUpload",
    data: function() {
      return { myFiles: [] };
    },
    props: ['server'],
    methods: {
      handleFilePondInit: function() {


        // FilePond instance methods are available on `this.$refs.pond`
      },
      process(fieldName, file, metadata, load, error, progress, abort) {


        let client = new FileStorageClient();
        client.UploadFile(file).then((result)=>{
          load(result.id);
          this.$emit("file_uploaded", {
            id: result.id,
            name: file.name
          });
        }).catch((message) => {
          error(message.message);
        });
      },
      load(uniqueFileId, load, error) {
        // error();
      },

      fetch(url, load, error, progress, abort, headers) {
        error("Local files only");
      },

      restore(uniqueFileId, load, error, progress, abort, headers) {
        // error();
      },

      revert(uniqueFileId, load, error) {

        // load();
      },
    },
    components: {
      FilePond,

    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>