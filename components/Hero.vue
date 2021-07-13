<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between max-w-full py-14"
  >
    <div
      class="flex flex-col gap-10 h-full justify-evenly px-10 pb-14 sm:pb-0 sm:px-14 lg:px-20 max-w-3xl text-center sm:text-left items-center sm:items-start"
    >
      <div class="text-5xl md:text-6xl lg:text-7xl leading-snug">
        We Provide Best IT Services
      </div>
      <div class="text-xl">
        Mars brings the power of data science &amp; artificial intelligence to
        every business
      </div>
      <button
        @click="next"
        class="py-3 px-6 rounded-full border-2 bg-yellow-600 text-gray-900 font-bold text-lg w-48"
      >
        EXPLORE
      </button>
    </div>
    <img
      class="max-h-96 object-contain"
      src="@/assets/images/hero.svg"
      alt="Hero"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Hero',

    methods: {
      next(): void {
        document
          .getElementById('services')
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })
</script>
