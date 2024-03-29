<template>
  <div class="w-full relative">
    <div
      class="bg-gray-900 text-white flex px-8 lg:px-12 xl:px-16 pt-8 sm:pt-14 pb-6 flex-col-reverse sm:flex-row justify-evenly gap-4 bg-world bg-contain bg-opacity-95"
    >
      <div class="flex flex-col items-center lg:justify-end sm:px-3">
        <img
          class="w-52 sm:w-full"
          src="/logo.png"
          alt="Mars IT Services Logo"
        />
      </div>

      <div
        class="flex-col hidden md:flex font-bold text-xl gap-1 lg:gap-2 justify-center lg:justify-end px-3"
      >
        <NuxtLink to="/about">About Us</NuxtLink>
        <NuxtLink class="block lg:hidden whitespace-nowrap" to="/services">
          Our Services
        </NuxtLink>
        <NuxtLink to="/trainings">Trainings</NuxtLink>
        <NuxtLink to="/careers">Careers</NuxtLink>
        <NuxtLink to="/contact">Contact Us</NuxtLink>
      </div>

      <div
        class="flex-col gap-3 font-light justify-center lg:justify-end hidden lg:flex px-3"
      >
        <NuxtLink class="font-bold text-xl" to="/services">
          Our Services
        </NuxtLink>
        <NuxtLink to="/services/website">Website Development</NuxtLink>
        <NuxtLink to="/services/webapp">Web App Development</NuxtLink>
        <NuxtLink to="/services/desktop">Desktop App Development</NuxtLink>
      </div>

      <form
        class="flex flex-col gap-2 text-xl justify-center lg:justify-end"
        @submit.prevent="submitForm"
      >
        <label class="block font-bold" for="email">
          Subscribe to our mailing list
        </label>
        <input
          class="text-lg mt-1 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
          type="email"
          name="email"
          required
          @keypress="emailCharsOnly"
          title="Email is required"
          placeholder="johndoe@email.com"
          v-model.trim="email"
        />
        <button
          type="submit"
          class="mt-3 py-1 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
        >
          Join
        </button>
      </form>

      <div class="flex sm:flex-col gap-3 justify-center">
        <a
          v-if="$store.state.socials.facebook"
          :href="$store.state.socials.facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-6 h-6 object-contain"
            :src="require(`@/assets/icons/facebook.svg`)"
            alt="Icon"
          />
        </a>

        <a
          v-if="$store.state.socials.instagram"
          :href="$store.state.socials.instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-6 h-6 object-contain"
            :src="require(`@/assets/icons/instagram.svg`)"
            alt="Icon"
          />
        </a>

        <a
          v-if="$store.state.socials.linkedIn"
          :href="$store.state.socials.linkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-6 h-6 object-contain"
            :src="require(`@/assets/icons/linkedin.svg`)"
            alt="Icon"
          />
        </a>

        <a
          v-if="$store.state.socials.whatsApp"
          :href="'https://wa.me/+91' + $store.state.socials.whatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-6 h-6 object-contain"
            :src="require(`@/assets/icons/whatsapp.svg`)"
            alt="Icon"
          />
        </a>
      </div>
    </div>

    <div
      class="flex items-center justify-center text-sm font-light bg-gray-900 opacity-95 text-white px-8 lg:px-12 xl:px-16 py-2"
    >
      &copy; {{ new Date().getFullYear() }} Mars IT Services
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validation from '@/mixins/validation'
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import {
    addDoc,
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'

  interface FooterData {
    app: FirebaseApp
    email: string
  }

  export default Vue.extend({
    name: 'Footer',

    mixins: [validation],

    data(): FooterData {
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

        email: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      async submitForm() {
        try {
          const { id } = await addDoc(
            collection(this.fireStore, 'subscriptions'),
            {
              email: this.email,
              savedAt: Date.now()
            }
          )

          this.$toast.success('Thanks for subscribing.')

          this.email = ''
        } catch (e) {
          console.error(e)
        }
      }
    },

    async mounted() {
      try {
        if (!this.$store.state.socials.email) {
          const socials = await getDocs(collection(this.fireStore, 'socials'))

          if (socials.docs.length) {
            await this.$store.dispatch(
              'socials/saveSocials',
              socials.docs[0].data()
            )
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
