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

    <hr />

    <label class="block py-2 text-2xl">
      Social Links
    </label>

    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="updateSocials"
    >
      <label class="block py-2" for="email">
        E-Mail
      </label>
      <input
        type="email"
        name="email"
        v-model.trim="email"
        placeholder="Company Email Address"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
      />

      <label class="block py-2" for="facebook">
        Facebook
      </label>
      <input
        type="url"
        name="facebook"
        v-model.trim="facebook"
        placeholder="Facebook Profile URL"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
      />

      <label class="block py-2" for="instagram">
        Instagram
      </label>
      <input
        type="url"
        name="instagram"
        v-model.trim="instagram"
        placeholder="Instagram Profile URL"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
      />

      <label class="block py-2" for="linkedIn">
        LinkedIn
      </label>
      <input
        type="url"
        name="linkedIn"
        v-model.trim="linkedIn"
        placeholder="LinkedIn Profile URL"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
      />

      <label class="block py-2" for="whatsApp">
        WhatsApp
      </label>
      <input
        type="text"
        maxlength="10"
        name="whatsApp"
        v-model.trim="whatsApp"
        @keypress="numericOnly"
        placeholder="WhatsApp Mobile Number"
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
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
  import validation from '@/mixins/validation'
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

    socialsId: string
    email: string
    facebook: string
    instagram: string
    linkedIn: string
    whatsApp: string
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
        subtitle: '',

        socialsId: '',
        email: '',
        facebook: '',
        instagram: '',
        linkedIn: '',
        whatsApp: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    mixins: [validation],

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
      },

      async updateSocials() {
        const dataToSave = {
          email: this.email,
          facebook: this.facebook,
          instagram: this.instagram,
          linkedIn: this.linkedIn,
          whatsApp: this.whatsApp
        }

        if (this.socialsId) {
          await updateDoc(
            doc(this.fireStore, 'socials', this.socialsId),
            dataToSave
          )
          this.$toast.success('Socials updated!')
        } else {
          await addDoc(collection(this.fireStore, 'socials'), dataToSave)
          this.$toast.success('Socials added!')
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

        const socials = await getDocs(collection(this.fireStore, 'socials'))

        if (socials.docs.length) {
          const doc = socials.docs[0]

          this.socialsId = doc.id
          const data = doc.data()

          this.email = data.email
          this.facebook = data.facebook
          this.instagram = data.instagram
          this.linkedIn = data.linkedIn
          this.whatsApp = data.whatsApp
        }
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
