<template>
  <div class="flex flex-col px-5">
    <div v-if="list.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">E-Mail</th>
            <th class="px-2 py-1 border-r">Subscribed at</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(sub, index) in list"
            :key="sub.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">
              <a :href="`mailto:${sub.email}`" target="_blank">
                {{ sub.email }}
              </a>
            </td>
            <td class="px-2 py-1 border-r">
              {{ new Date(Number(sub.savedAt)).toLocaleString('en-IN') }}
            </td>
            <td class="px-2 py-1">
              <span
                class="cursor-pointer hover:text-red-600"
                @click="deleteSubscription(sub.id)"
              >
                Remove
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-5xl font-bold text-center py-7">
      No Subscriptions Yet!
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

  interface AdminSubscriptionsData {
    list: Array<Record<string, string>>
    app: FirebaseApp
  }

  export default Vue.extend({
    name: 'AdminSubscriptions',

    layout: 'admin',

    data(): AdminSubscriptionsData {
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

        list: []
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      async deleteSubscription(id: string) {
        const confirmed = confirm(
          `You are about to remove "${
            this.list.filter((sub) => sub.id === id)[0].email
          }" from mailing list, are you sure ?`
        )
        if (confirmed) {
          try {
            await deleteDoc(doc(this.fireStore, 'subscriptions', id))

            this.list = this.list.filter((sub) => sub.id !== id)

            this.$toast.success('Email deleted from list!')
          } catch (e) {
            console.error(e)
          }
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(collection(this.fireStore, 'subscriptions'))
        docs.forEach((doc) => {
          this.list = [...this.list, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
