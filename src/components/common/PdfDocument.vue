<template>
    <div v-bind:style="{ width: width, height: height }">

    </div>
</template>

<script>
  import PDFObject from 'pdfobject';
  import VueModal from "@/components/common/VueModal";

  export default {
    name: "PdfDocument",
    components: {VueModal},
    props: {
      documentUrl: String,
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
    },
    watch: {
      documentUrl() {
        console.log("change")
        if (this.documentUrl) {
          PDFObject.embed(this.documentUrl, this.$el);
        }
      }
    },
    mounted() {
      if (this.documentUrl) {
        PDFObject.embed(this.documentUrl, this.$el);
      }
    }
  }
</script>

<style scoped>

</style>