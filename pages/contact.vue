<template>
  <div class="justify-center flex bg-contact bg-cover">
    <form
      @submit.prevent="submitForm"
      class="px-8 overflow-auto bg-gray-800 bg-opacity-25 text-white lg:w-2/5 flex flex-col justify-center"
    >
      <label class="block py-2" for="name">
        Your Name
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        type="text"
        name="name"
        required
        @keypress="alphaOnly"
        placeholder="John Doe"
        v-model.trim="name"
      />

      <label class="block py-2" for="email">
        E-Mail Address
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        type="email"
        name="email"
        required
        @keypress="emailCharsOnly"
        placeholder="johndoe@email.com"
        v-model.trim="email"
      />

      <label class="block py-2" for="mobile">
        Mobile Number
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        type="text"
        name="mobile"
        maxlength="10"
        required
        @blur="validateContact"
        @keypress="numericOnly"
        placeholder="+XX-XXX-XXX-XXXX"
        v-model.trim="mobile"
      />
      <span class="text-xs text-yellow-300 pt-1 max-w-xs">
        {{ mobileError }}
      </span>

      <label class="block py-2" for="city">Location</label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        type="text"
        name="city"
        required
        @keypress="charsOnly"
        placeholder="New Delhi, India"
        v-model.trim="location"
      />

      <label class="block py-2" for="subject">
        Subject
      </label>
      <textarea
        class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
        name="subject"
        rows="3"
        placeholder="Write your query in detail here..."
        v-model.trim="message"
      />

      <button
        type="submit"
        class="mt-7 mb-5 py-1.5 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
      >
        Submit
      </button>

      <div v-if="$store.state.socials.email" class="text-center text-sm pb-2">
        or you may contact us at
        <a
          :href="'mailto:' + $store.state.socials.email"
          class="outline-none font-semibold"
          target="_blank"
        >
          {{ $store.state.socials.email }}
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validation from '@/mixins/validation'
  import { Contact } from '@/models/Contact'
  import { initializeApp } from '@firebase/app'
  import {
    addDoc,
    collection,
    Firestore,
    getFirestore
  } from '@firebase/firestore'

  export default Vue.extend({
    name: 'ContactPage',

    data(): Contact {
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

        mobileError: '',

        name: '',
        email: '',
        mobile: '',
        location: '',
        message: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    mixins: [validation],

    methods: {
      async submitForm(): Promise<void> {
        try {
          const { id } = await addDoc(
            collection(this.fireStore, 'requests_contact'),
            {
              name: this.name,
              email: this.email,
              mobile: this.mobile,
              location: this.location,
              message: this.message,
              requestAt: Date.now()
            }
          )

          this.$toast.success('Request Sent!')

          this.name = ''
          this.email = ''
          this.mobile = ''
          this.location = ''
          this.message = ''
        } catch (e) {
          console.error(e)
        }
      },

      validateContact(e: InputEvent) {
        if (/([6-9][\d]{9})+/.test(this.mobile)) this.mobileError = ''
        else this.mobileError = 'First digit of mobile must be between 6 & 9'
      }
    }
  })
</script>
