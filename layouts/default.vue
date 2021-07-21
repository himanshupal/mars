<template>
  <main>
    <Header />
    <div
      class="fixed w-14 h-14 p-1.5 rounded transform rotate-45 bg-white bottom-3 -right-7 z-50 items-end cursor-pointer flex transition-all duration-500 shadow-xl"
      :class="{ 'opacity-0': hidden }"
      @click="goto"
    >
      <img
        class="transform -rotate-45"
        src="@/assets/icons/arrow.svg"
        alt="Up Arrow"
      />
    </div>
    <Nuxt class="w-full min-h-screen pt-20" />
    <Footer />
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'DefaultLayout',

    data() {
      return {
        hidden: true
      }
    },

    mounted() {
      window.addEventListener('scroll', this.toggleIcon)
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.toggleIcon)
    },

    methods: {
      toggleIcon() {
        this.hidden = window.pageYOffset < 250
      },

      goto() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }
  })
</script>
