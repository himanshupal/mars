<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between max-w-full min-h-screen"
  >
    <div
      class="flex flex-col gap-10 h-full justify-evenly px-10 pb-14 sm:pb-0 sm:pl-14 lg:pl-20 text-center md:text-left items-center md:items-start w-3/5"
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
    <div class="flex items-center w-2/5">
      <img
        class="max-h-96 object-contain"
        src="@/assets/images/hero.svg"
        alt="Hero"
      />
    </div>
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