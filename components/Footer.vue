<template>
  <div
    class="w-full relative bg-gray-900 text-white px-8 lg:px-12 xl:px-16 py-8 sm:py-14 flex flex-col-reverse sm:flex-row justify-evenly gap-4 bg-world bg-contain bg-opacity-95"
  >
    <div class="flex flex-col lg:justify-end sm:px-3">
      <div
        :class="[
          'text-7xl sm:text-8xl xl:text-9xl font-extrabold',
          { 'text-yellow-500': color }
        ]"
      >
        <span :class="{ 'text-red-700': color }">M</span>ars
      </div>
      <div
        :class="[
          'text-3xl font-bold',
          {
            'text-transparent bg-gradient-to-l from-yellow-500 to-red-700 bg-clip-text': color
          }
        ]"
      >
        IT Services Pvt. Ltd.
      </div>
    </div>
    <div
      class="flex-col hidden md:flex font-bold text-xl gap-1 lg:gap-2 justify-center lg:justify-end px-3"
    >
      <NuxtLink to="/about">About Us</NuxtLink>
      <NuxtLink class="block lg:hidden whitespace-nowrap" to="/services">
        Our Services
      </NuxtLink>
      <NuxtLink to="/training">Training</NuxtLink>
      <NuxtLink to="/careers">Careers</NuxtLink>
      <NuxtLink to="/contact">Contact Us</NuxtLink>
    </div>
    <div
      class="flex-col gap-3 font-light justify-center lg:justify-end hidden lg:flex px-3"
    >
      <NuxtLink class="font-bold text-xl" to="/services">
        Our Services
      </NuxtLink>
      <NuxtLink to="/services/website">Website Development</NuxtLink>
      <NuxtLink to="/services/webapp">Web App Development</NuxtLink>
      <NuxtLink to="/services/desktop">Desktop App Development</NuxtLink>
    </div>
    <form
      class="flex flex-col gap-2 text-xl justify-center lg:justify-end"
      @submit.prevent="join"
    >
      <label class="block font-bold" for="email">
        Subscribe to our mailing list
      </label>
      <input
        class="text-lg mt-1 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        type="email"
        name="email"
        required
        title="Email is required"
        placeholder="johndoe@email.com"
        v-model.trim="email"
      />
      <button
        type="submit"
        class="mt-3 py-1 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
      >
        // Join //
      </button>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Footer',

    data() {
      return {
        email: ''
      }
    },

    computed: {
      color() {
        return this.$route.query.hasOwnProperty('color')
      }
    },

    methods: {
      join() {
        console.log(this.email)
      }
    }
  })
</script>
