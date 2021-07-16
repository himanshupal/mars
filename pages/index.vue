<template>
  <div class="w-full h-content bg-gray-900 text-white overflow-auto">
    <Hero />
    <Services />
    <Features />
    <Portfolio />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Homepage'
  })
</script>
