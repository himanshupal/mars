<template>
  <div
    @click="goto"
    class="flex flex-col items-center justify-center text-center"
  >
    <img loading="lazy" src="@/assets/images/cat.svg" alt="Not found!" />
    <h1 v-if="error.statusCode === 404">
      Page not found!
    </h1>
    <h1 v-else>An error occurred!</h1>
    <p class="text-xs">| Click anywhere to return to Homepage |</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'ErrorLayout',

    props: ['error'],

    methods: {
      async goto() {
        await this.$router.replace('/')
      }
    }
  })
</script>
