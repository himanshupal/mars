<template>
  <div class="bg-gray-900 text-white">
    <Services
      :generalServices="services.generalServices"
      :tailoredServices="services.tailoredServices"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'ServicesPage',

    computed: {
      services() {
        return this.$store.state.services
      }
    }
  })
</script>
