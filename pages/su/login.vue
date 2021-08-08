<template>
  <div
    class="bg-green-400 min-h-screen p-5 text-white grid place-content-center"
  >
    <div class="text-4xl sm:text-8xl md:text-9xl py-5 font-bold">
      Admin Login
    </div>
    <form
      class="flex flex-col rounded-md p-5 w-80 border bg-gray-800"
      @submit.prevent="login"
    >
      <label for="error" v-if="error" class="text-center text-red-500 pb-3">
        {{ error }}
      </label>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 mb-3 rounded-sm text-gray-900"
        type="email"
        name="email"
        required
        @keypress="emailCharsOnly"
        placeholder="E-Mail Address"
        v-model.trim="email"
      />
      <input
        class="order-r-8 w-full h-9 py-2 px-3 mb-3 rounded-sm text-gray-900"
        type="password"
        name="password"
        required
        placeholder="Password"
        v-model.trim="password"
      />
      <div class="flex justify-between items-center">
        <div class="text-white text-sm cursor-pointer hover:text-green-400">
          Forgot Password ?
        </div>
        <button
          type="submit"
          class="px-8 h-9 hover:bg-green-400 hover:text-white bg-white text-gray-900 rounded-sm"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validation from '@/mixins/validation'
  import {
    Auth,
    AuthErrorCodes,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword
  } from 'firebase/auth'
  import { initializeApp } from 'firebase/app'

  export default Vue.extend({
    name: 'AdminLogin',

    layout: 'empty',

    mixins: [validation],

    data() {
      return {
        email: '',
        password: '',
        error: '',
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
      auth(): Auth {
        return getAuth(this.app)
      }
    },

    methods: {
      async login() {
        try {
          const user = await signInWithEmailAndPassword(
            this.auth,
            this.email,
            this.password
          )
          this.error = ''
          this.$store.dispatch('saveUser', user)
        } catch (e) {
          switch (e.code) {
            case AuthErrorCodes.USER_DELETED:
              this.error = 'User not found!'
              return
            case AuthErrorCodes.INVALID_PASSWORD:
              this.error = 'Invalid password!'
              return
            default:
              this.error = e.code
          }
        }
      }
    },

    mounted() {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.$router.replace('/su')
        }
      })
    }
  })
</script>
