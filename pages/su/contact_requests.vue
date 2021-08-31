<template>
  <div class="flex flex-col px-5">
    <div v-if="requests.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Name</th>
            <th class="px-2 py-1 border-r">Mobile</th>
            <th class="px-2 py-1 border-r">E-Mail</th>
            <th class="px-2 py-1 border-r">Location</th>
            <th class="px-2 py-1 border-r">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(request, index) in requests"
            :key="request.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ request.name }}</td>
            <td class="px-2 py-1 border-r">{{ request.mobile }}</td>
            <td class="px-2 py-1 border-r">{{ request.email }}</td>
            <td class="px-2 py-1 border-r">{{ request.location }}</td>
            <td class="px-2 py-1 border-r">{{ request.message }}</td>
            <td class="px-2 py-1">
              <span
                class="cursor-pointer hover:text-red-600"
                @click="deleteRequest(request.id)"
              >
                Delete
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-5xl font-bold text-center py-7">
      No Requests Yet!
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    doc,
    collection,
    Firestore,
    getDocs,
    deleteDoc,
    getFirestore
  } from 'firebase/firestore'
  import { FirebaseApp, initializeApp } from '@firebase/app'

  interface AdminContactRequestsData {
    requests: Array<Record<string, string>>
    app: FirebaseApp
  }

  export default Vue.extend({
    name: 'AdminContactRequests',

    layout: 'admin',

    data(): AdminContactRequestsData {
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

        requests: []
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      async deleteRequest(id: string) {
        const confirmed = confirm(
          `You are about to delete contact request by ${
            this.requests.filter((request) => request.id === id)[0].name
          }, are you sure ?`
        )
        if (confirmed) {
          try {
            await deleteDoc(doc(this.fireStore, 'requests_contact', id))

            this.requests = this.requests.filter((request) => request.id !== id)

            this.$toast.success('Request Deleted!')
          } catch (e) {
            console.error(e)
          }
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(
          collection(this.fireStore, 'requests_contact')
        )
        docs.forEach((doc) => {
          this.requests = [...this.requests, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
