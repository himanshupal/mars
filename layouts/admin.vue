<template>
  <main>
    <AdminHeader :routes="routes" />

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

    <div class="flex">
      <AdminMenu
        class="hidden lg:flex w-1/5 min-h-screen pt-20"
        :routes="routes"
      />
      <Nuxt
        class="w-full lg:w-4/5 min-h-screen pt-20 bg-green-400 text-white"
      />
    </div>
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
        }),
        routes: [
          { path: '/su', text: 'Home' },
          { path: '/su/portfolio', text: 'Portfolio' },
          { path: '/su/trainings', text: 'Trainings' },
          { path: '/su/services', text: 'Services' },
          { path: '/su/jobs', text: 'Jobs' },
          { path: '/su/about', text: 'About Us' },
          { path: '/su/feedback_student', text: 'Testimonials - Students' },
          { path: '/su/feedback_client', text: 'Testimonials - Clients' },
          { path: '/su/applications', text: 'Job Applications' },
          { path: '/su/contact_requests', text: 'Contact Requests' },
          { path: '/su/training_requests', text: 'Training Requests' },
          { path: '/su/subscriptions', text: 'Subscriptions' }
        ]
      }
    },

    beforeMount(): void {
      onAuthStateChanged(getAuth(this.app), (user) => {
        if (!user) {
          this.$router.replace('/su/login')
        }
      })
    },

    mounted(): void {
      window.addEventListener('scroll', this.toggleIcon)
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
