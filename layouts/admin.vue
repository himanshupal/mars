<template>
  <main>
    <AdminHeader />

    <div
      class="fixed p-1.5 rounded transform rotate-45 bg-white bottom-5 right-5 z-50 items-center justify-center cursor-pointer flex transition-all duration-500 shadow-xl"
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
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { initializeApp } from '@firebase/app'

  export default Vue.extend({
    name: 'AdminLayout',

    data() {
      return {
        hidden: true,
        app: initializeApp({
          apiKey: this.$config.apiKey,
          authDomain: this.$config.authDomain,
          projectId: this.$config.projectId,
          storageBucket: this.$config.storageBucket,
          messagingSenderId: this.$config.messagingSenderId,
          appId: this.$config.appId,
          measurementId: this.$config.measurementId
        })
      }
    },

    mounted(): void {
      window.addEventListener('scroll', this.toggleIcon)

      onAuthStateChanged(getAuth(this.app), (user) => {
        if (!user) {
          this.$router.replace('/su/login')
        }
      })
    },

    beforeDestroy(): void {
      window.removeEventListener('scroll', this.toggleIcon)
    },

    methods: {
      toggleIcon(): void {
        this.hidden = window.pageYOffset < 250
      },

      goto(): void {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }
  })
</script>
