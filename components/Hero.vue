<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between max-w-full min-h-screen"
  >
    <div
      class="flex flex-col gap-10 h-full justify-evenly px-10 py-14 md:py-0 sm:pl-14 lg:pl-20 text-center md:text-left items-center md:items-start w-full md:w-3/5"
    >
      <div class="text-5xl md:text-6xl lg:text-7xl leading-snug">
        {{ title }}
      </div>

      <div v-if="subtitle" class="text-xl">
        {{ subtitle }}
      </div>

      <button
        @click="next"
        class="py-3 px-6 rounded-full border-2 bg-white hover:bg-yellow-600 hover:text-white text-gray-900 font-bold text-lg w-48 transition-colors"
      >
        <div class="uppercase">Explore</div>
      </button>
    </div>

    <div class="flex items-center justify-center w-4/5 sm:3/5 md:w-2/5">
      <img
        loading="lazy"
        class="max-h-96 object-contain"
        src="@/assets/images/hero.svg"
        alt="Hero"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import {
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'

  interface HomeHeroData {
    app: FirebaseApp

    id: string
    title: string
    subtitle: string
  }

  export default Vue.extend({
    name: 'Hero',

    data(): HomeHeroData {
      return {
        app: initializeApp({
          apiKey: this.$config.apiKey,
          authDomain: this.$config.authDomain,
          projectId: this.$config.projectId,
          storageBucket: this.$config.storageBucket,
          messagingSenderId: this.$config.messagingSenderId,
          appId: this.$config.appId,
          measurementId: this.$config.measurementId
        }),

        id: '',
        title: '',
        subtitle: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      next(): void {
        document
          .getElementById('services')
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    },

    async mounted() {
      try {
        const details = await getDocs(collection(this.fireStore, 'homepage'))

        if (details.docs.length) {
          const doc = details.docs[0]

          this.id = doc.id
          const data = doc.data()

          this.title = data.title
          this.subtitle = data.subtitle
        }
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
