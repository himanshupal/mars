<template>
  <div class="flex flex-col px-5">
    <div v-if="requests.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Enquiry ID</th>
            <th class="px-2 py-1 border-r">Name</th>
            <th class="px-2 py-1 border-r">Interested in</th>
            <th class="px-2 py-1 border-r">Medium</th>
            <th class="px-2 py-1 border-r">Enquired at</th>
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
            <td
              class="px-2 py-1 border-r font-semibold cursor-pointer"
              @click="showDetails(request.id)"
            >
              {{ request.id }}
            </td>
            <td class="px-2 py-1 border-r">{{ request.name }}</td>
            <td class="px-2 py-1 border-r">{{ request.enquiryFor }}</td>
            <td class="px-2 py-1 border-r">{{ request.medium }}</td>
            <td class="px-2 py-1 border-r">
              {{ new Date(Number(request.enquiryAt)).toLocaleString('en-IN') }}
            </td>
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
      No Enquiry Yet!
    </div>

    <div v-if="Object.keys(selected).length" class="flex flex-col gap-3">
      <div class="text-3xl border-b">Enquiry Details</div>

      <div class="font-semibold">
        Name: <span class="font-normal">{{ selected.name }}</span>
      </div>
      <div class="font-semibold">
        Interested in:
        <span class="font-normal">{{ selected.enquiryFor }}</span>
      </div>
      <div class="font-semibold">
        Study Medium:
        <span class="font-normal">{{ selected.medium }}</span>
      </div>
      <div class="font-semibold">
        Pursuing Course:
        <span class="font-normal">{{ selected.course }}</span>
      </div>
      <div class="font-semibold">
        College Name: <span class="font-normal">{{ selected.college }}</span>
      </div>
      <div class="font-semibold">
        Mobile Number: <span class="font-normal">{{ selected.mobile }}</span>
      </div>
      <div class="font-semibold">
        E-Mail: <span class="font-normal">{{ selected.email }}</span>
      </div>
      <div class="font-semibold">
        Location: <span class="font-normal">{{ selected.location }}</span>
      </div>
      <!-- <div class="font-semibold">
        Message: <span class="font-normal">{{ selected.message }}</span>
      </div> -->
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

  interface AdminTrainingRequestsData {
    requests: Array<Record<string, string>>
    selected: Record<string, string>
    app: FirebaseApp
  }

  export default Vue.extend({
    name: 'AdminTrainingRequests',

    layout: 'admin',

    data(): AdminTrainingRequestsData {
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

        requests: [],
        selected: {}
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      async showDetails(id: string) {
        this.selected = this.requests.filter((request) => (request.id = id))[0]
      },

      async deleteRequest(id: string) {
        const confirmed = confirm(
          `You are about to delete details submitted by ${
            this.requests.filter((request) => request.id === id)[0].name
          }, are you sure ?`
        )
        if (confirmed) {
          try {
            await deleteDoc(doc(this.fireStore, 'requests_training', id))

            this.requests = this.requests.filter((request) => request.id !== id)

            this.$toast.success('Request deleted!')
          } catch (e) {
            console.error(e)
          }
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(
          collection(this.fireStore, 'requests_training')
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
