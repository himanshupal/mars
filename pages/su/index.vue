<template>
  <div class="flex flex-col px-5">
    <label class="block py-2 text-2xl">
      Homepage
    </label>

    <form class="flex flex-col md:w-2/3 lg:w-1/2" @submit.prevent="updateHome">
      <label class="block py-2" for="title">
        Title
      </label>
      <input
        required
        name="title"
        v-model.trim="title"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
      />

      <label class="block py-2" for="subtitle">
        Subtitle
      </label>
      <textarea
        name="subtitle"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        v-model.trim="subtitle"
      />

      <div class="flex w-full my-4">
        <button
          class="bg-green-600 hover:bg-green-700 h-9 w-full"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { FirebaseApp, initializeApp } from 'firebase/app'
  import {
    doc,
    addDoc,
    collection,
    Firestore,
    getDocs,
    getFirestore,
    updateDoc
  } from 'firebase/firestore'

  interface AdminHomeData {
    app: FirebaseApp

    id: string
    title: string
    subtitle: string
  }

  export default Vue.extend({
    name: 'AdminDash',

    layout: 'admin',

    data(): AdminHomeData {
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
      async updateHome() {
        if (this.id) {
          await updateDoc(doc(this.fireStore, 'homepage', this.id), {
            title: this.title,
            subtitle: this.subtitle
          })
          this.$toast.success('Homepage updated!')
        } else {
          await addDoc(collection(this.fireStore, 'homepage'), {
            title: this.title,
            subtitle: this.subtitle
          })
          this.$toast.success('Details added!')
        }
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
