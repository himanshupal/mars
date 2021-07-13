<template>
  <header class="bg-gray-900 h-20 flex justify-center">
    <div
      class="container flex gap-5 items-center justify-between py-3 px-5 h-full"
    >
      <img
        width="30"
        height="30"
        tabindex="0"
        src="@/assets/icons/menu.svg"
        alt="Menu Icon"
        class="cursor-pointer md:hidden"
        @click="menu = !menu"
      />

      <NuxtLink class="flex items-center md:pr-10" to="/">
        <img class="h-14" src="/logo.png" alt="Mars IT Logo" />
      </NuxtLink>

      <div class="flex-grow items-center text-gray-400 flex text-lg">
        <NuxtLink
          v-for="(route, index) in routes"
          :key="`navbar-link-${index}`"
          :to="route.path"
          class="mx-5 hover:shadow-b-2 hover:text-gray-200 transition-shadow hidden md:block"
          exact-active-class="font-bold text-white hover:text-white hover:shadow-none"
        >
          {{ route.text }}
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="menu"
      class="flex flex-col md:hidden text-gray-400 font-medium transition-all top-20 bg-gray-900 sticky z-10"
      @click="menu = false"
    >
      <NuxtLink
        v-for="(route, index) in routes"
        :key="`menu-link-${index}`"
        :to="route.path"
        class="py-4 px-5 hover:bg-gray-700 hover:text-gray-200 transition-all"
        exact-active-class="font-bold text-white bg-gray-800 hover:text-white"
      >
        {{ route.text }}
      </NuxtLink>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HeaderData } from '@/models/Header'

  export default Vue.extend({
    name: 'Header',

    data(): HeaderData {
      return {
        menu: false,

        routes: [
          { path: '/services', text: 'Services' },
          { path: '/about', text: 'About Us' },
          { path: '/contact', text: 'Contact Us' }
        ]
      }
    },

    mounted(): void {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target as Node)) {
          if (this.menu) this.menu = false
        }
      })
    }
  })
</script>
