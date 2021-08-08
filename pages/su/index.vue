<template>
  <div
    class="bg-green-400 min-h-screen p-5 text-white grid place-content-center"
  >
    <div class="text-4xl sm:text-8xl md:text-9xl py-5 font-bold">
      Admin Login
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Auth, getAuth } from 'firebase/auth'
  import { initializeApp } from 'firebase/app'

  export default Vue.extend({
    name: 'AdminDash',

    layout: 'admin',

    data() {
      return {
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
    }
  })
</script>
