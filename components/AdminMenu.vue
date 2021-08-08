<template>
  <div class="flex-col bg-green-500 text-white font-semibold">
    <NuxtLink
      class="pl-10 py-2 m-2 rounded-br-xl rounded-tl-xl transition-all hover:bg-green-300 hover:text-green-500"
      exact-active-class="bg-white text-green-400"
      v-for="(route, index) in routes"
      :key="`link-${index}`"
      :to="route.path"
    >
      {{ route.text }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'AdminMenu',

    props: {
      routes: {
        type: Array,
        required: true
      }
    }
  })
</script>
