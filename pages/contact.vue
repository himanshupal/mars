<template>
  <div class="w-full h-content flex bg-contact bg-cover">
    <div class="hidden sm:block w-1/2 md:w-3/5" />
    <form
      @submit.prevent="submitForm"
      class="px-8 flex-grow overflow-auto bg-gray-800 bg-opacity-95 text-white"
    >
      <div class="text-center text-xl pt-5">
        You may always reach us at
        <a :href="`mailto:${siteMail}`" class="outline-none font-semibold">
          {{ siteMail }}
        </a>
        <br />
        OR
        <br />
        Fill the form below &amp;
        <br />
        We will mobile you soon
      </div>

      <hr class="my-5" />

      <label class="block py-2" for="name">
        Your Name
      </label>
      <input
        class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
        type="text"
        name="name"
        required
        placeholder="John Doe"
        v-model="name"
      />

      <label class="block py-2" for="email">
        E-Mail Address
      </label>
      <input
        class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
        type="email"
        name="email"
        required
        placeholder="johndoe@email.com"
        v-model="email"
      />

      <label class="block py-2" for="mobile">
        Mobile Number
      </label>
      <input
        class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
        type="text"
        name="mobile"
        required
        placeholder="+XX-XXX-XXX-XXXX"
        v-model="mobile"
      />

      <label class="block py-2" for="city">Location</label>
      <input
        class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
        type="text"
        name="city"
        required
        placeholder="New Delhi, India"
        v-model="location"
      />

      <label class="block py-2" for="subject">
        Subject
      </label>
      <textarea
        class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
        name="subject"
        rows="3"
        placeholder="Write your query in detail here..."
        v-model="subject"
      />

      <button
        type="submit"
        class="mt-7 mb-5 py-3 px-6 border-2 rounded-full w-full hover:bg-white hover:text-gray-800 hover:font-semibold transition-all text-lg"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ContactData } from '@/models/Contact'

  export default Vue.extend({
    name: 'Contact',

    data(): ContactData {
      return {
        siteMail: 'desk@marsit.org',

        name: '',
        email: '',
        mobile: '',
        location: '',
        subject: ''
      }
    },

    methods: {
      submitForm(): void {
        console.log({
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          location: this.location,
          subject: this.subject
        })
      }
    }
  })
</script>
