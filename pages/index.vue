<template>
  <div class="bg-gray-900 text-white">
    <Hero />
    <Services
      :generalServices="services.generalServices"
      :tailoredServices="services.tailoredServices"
    />
    <Features :info="features.info" :features="features.list" />
    <Testimonials title="Client Testimonials" :slides="testimonials" />
    <Portfolio />
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

  interface HomePageData {
    app: FirebaseApp

    testimonials: Array<Record<string, string>>
  }

  export default Vue.extend({
    name: 'Homepage',

    data(): HomePageData {
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

        testimonials: []
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      },

      features() {
        return this.$store.state.features
      },
      services() {
        return this.$store.state.services
      }
    },

    async mounted() {
      try {
        const clientTestimonials = await getDocs(
          collection(this.fireStore, 'testimonials_client')
        )
        clientTestimonials.forEach((doc) => {
          this.testimonials = [
            ...this.testimonials,
            { id: doc.id, ...doc.data() }
          ]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
