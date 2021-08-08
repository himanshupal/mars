<template>
  <div class="flex flex-col text-center gap-6 py-10">
    <div class="text-4xl font-bold">Our Portfolio</div>

    <div class="text-sm font-light px-4 max-w-lg mx-auto">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit quam eum
      expedita impedit non! Voluptatibus atque doloribus minus reiciendis ad ab
      praesentium eos vel excepturi.
    </div>

    <div class="flex flex-wrap gap-10 px-10 pt-5 justify-evenly w-full">
      <div
        :key="id"
        v-for="(project, id) in projects"
        class="flex flex-col justify-between rounded-xl shadow-xl w-72 bg-white text-gray-900 pb-3"
      >
        <img
          loading="lazy"
          class="w-full h-52 rounded-t-xl object-cover"
          :src="project.image"
          :alt="project.title"
        />
        <div class="text-xl py-3 px-3 font-semibold text-black">
          {{ project.title }}
        </div>
        <div class="text-sm font-light py-1 px-3">
          {{ project.about }}
        </div>
        <a
          :href="project.link"
          class="px-3 py-1 font-semibold text-xs text-right"
        >
          More...
        </a>
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

  interface PortfolioData {
    projects: Array<Record<string, string>>
    app: FirebaseApp
  }

  export default Vue.extend({
    name: 'Portfolio',

    data(): PortfolioData {
      return {
        projects: [],
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

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(collection(this.fireStore, 'portfolio'))
        docs.forEach((doc) => {
          this.projects = [...this.projects, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        // @ts-ignore
        this.$toast.error(e)
      }
    }
  })
</script>
