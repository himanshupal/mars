<template>
  <header class="bg-gray-900 h-20 w-full flex fixed top-0 z-50">
    <div
      class="flex gap-5 items-center justify-between py-3 pl-6 sm:px-10 lg:pl-24 h-full w-full"
    >
      <img
        loading="lazy"
        width="30"
        height="30"
        tabindex="0"
        src="@/assets/icons/menu.svg"
        alt="Menu Icon"
        class="cursor-pointer lg:hidden"
        @click="menu = !menu"
      />

      <NuxtLink class="flex items-center md:pr-10" to="/">
        <img loading="lazy" class="h-14" src="/logo.png" alt="Mars IT Logo" />
      </NuxtLink>

      <div
        class="flex-grow items-center justify-end text-gray-400 flex text-lg"
      >
        <NuxtLink
          v-for="(route, index) in routes"
          :key="`navbar-link-${index}`"
          :to="route.path"
          class="mx-5 hover:shadow-b-2 hover:text-gray-200 transition-shadow hidden lg:block"
          exact-active-class="font-bold text-white hover:text-white hover:shadow-none"
        >
          {{ route.text }}
        </NuxtLink>
        <div
          @click="signout"
          class="py-4 px-5 hover:bg-gray-700 hover:text-gray-200 transition-all cursor-pointer rounded"
        >
          Logout
        </div>
      </div>
    </div>

    <div
      v-if="menu"
      class="flex flex-col lg:hidden text-gray-400 font-medium transition-all top-20 bg-gray-900 absolute w-full z-10"
      @click="menu = false"
    >
      <NuxtLink
        v-for="(route, index) in routes"
        :key="`menu-link-${index}`"
        :to="route.path"
        class="p-4 hover:bg-gray-700 hover:text-gray-200 transition-all"
        exact-active-class="font-bold text-white bg-gray-800 hover:text-white"
      >
        {{ route.text }}
      </NuxtLink>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HeaderModel } from '@/models/Header'
  import { getAuth, signOut } from '@firebase/auth'

  export default Vue.extend({
    name: 'AdminHeader',

    data(): HeaderModel {
      return {
        menu: false,

        routes: [
          { path: '/su', text: 'Home' },
          { path: '/su/portfolio', text: 'Services' },
          { path: '/su/testimonials', text: 'Training' },
          { path: '/su/careers', text: 'Careers' },
          { path: '/su/about', text: 'About Us' },
          { path: '/su/contact', text: 'Contact Us' }
        ]
      }
    },

    mounted(): void {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target as Node)) {
          if (this.menu) this.menu = false
        }
      })
    },

    methods: {
      async signout() {
        await signOut(getAuth())
      }
    }
  })
</script>
