<template>
  <div class="flex flex-col bg-gray-900 text-white py-10">
    <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">About Us</div>
    <div class="py-5 px-10 lg:px-24 text-sm font-light sm:w-4/5">
      {{ serviceDescription }}
    </div>
    <Features />
    <!-- <Members /> -->
    <Founder
      :name="name"
      :designation="designation"
      :words="words"
      :photo="photo"
    />
    <Portfolio />
  </div>
</template>

<script lang="ts">
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import {
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'
  import Vue from 'vue'

  interface AdminAboutData {
    app: FirebaseApp

    serviceDescription: string

    name: string
    designation: string
    words: string
    photo: string
  }

  export default Vue.extend({
    name: 'AboutPage',

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    data(): AdminAboutData {
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

        serviceDescription: '',

        name: '',
        designation: '',
        words: '',
        photo: ''
      }
    },

    async mounted() {
      try {
        const aboutDocs = await getDocs(collection(this.fireStore, 'about'))
        aboutDocs.forEach((doc) => {
          if (doc.data()['serviceDescription']) {
            this.serviceDescription = doc.data()['serviceDescription']
          }
          if (doc.data()['words']) {
            this.name = doc.data()['name']
            this.designation = doc.data()['designation']
            this.words = doc.data()['words']
            this.photo = doc.data()['photo']
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  })
</script>
