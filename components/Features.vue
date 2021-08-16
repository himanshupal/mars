<template>
  <div class="flex flex-col gap-6 text-center py-10">
    <div class="text-4xl font-bold">Why choose us?</div>
    <div class="text-sm font-light px-4 max-w-sm mx-auto">
      {{ about }}
    </div>
    <div class="flex gap-10 justify-evenly pt-5 flex-wrap px-10">
      <div
        v-for="(feature, index) in features"
        :key="`feature-${index + 1}`"
        class="text-white p-6 pb-4 w-64 flex flex-col items-center justify-between shadow-lg transform border-2 border-gray-800 hover:bg-gray-800 hover:scale-105 transition-all duration-500 rounded-md"
      >
        <div
          class="rounded-full flex items-center justify-center shadow-lg p-6 hover:bg-gray-700"
        >
          <img
            loading="lazy"
            width="40"
            :src="feature.icon"
            :alt="`icon-${feature.icon}`"
          />
        </div>
        <div class="text-2xl font-semibold text-center pt-4 pb-1">
          {{ feature.title }}
        </div>
        <div class="text-sm text-center font-light">
          {{ feature.about }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'
  import { FirebaseApp, initializeApp } from '@firebase/app'

  interface FeaturesData {
    app: FirebaseApp
    features: Array<Record<string, string>>
    about: string
  }

  export default Vue.extend({
    name: 'Features',

    data(): FeaturesData {
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
        features: [],
        about: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    async mounted() {
      const features = await getDocs(
        collection(this.fireStore, 'features_cards')
      )
      features.forEach((doc) => {
        this.features = [...this.features, { id: doc.id, ...doc.data() }]
      })

      const aboutDocs = await getDocs(collection(this.fireStore, 'about'))
      aboutDocs.forEach((doc) => {
        if (doc.data()['description']) {
          this.about = doc.data()['description']
        }
      })
    }
  })
</script>
