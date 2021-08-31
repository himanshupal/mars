<template>
  <div class="flex flex-col px-5">
    <div v-if="applications.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Application ID</th>
            <th class="px-2 py-1 border-r">Applicant</th>
            <th class="px-2 py-1 border-r">Experience</th>
            <th class="px-2 py-1 border-r">Applied for</th>
            <th class="px-2 py-1 border-r">Applied at</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(application, index) in applications"
            :key="application.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td
              class="px-2 py-1 border-r font-semibold cursor-pointer"
              @click="showDetails(application.id)"
            >
              {{ application.id }}
            </td>
            <td class="px-2 py-1 border-r">{{ application.name }}</td>
            <td class="px-2 py-1 border-r">
              {{ application.experience }} Months
            </td>
            <td class="px-2 py-1 border-r">{{ application.position }}</td>
            <td class="px-2 py-1 border-r">
              {{
                new Date(Number(application.appliedAt)).toLocaleString('en-IN')
              }}
            </td>
            <td class="px-2 py-1">
              <span
                class="cursor-pointer hover:text-red-600"
                @click="deleteApplication(application.id)"
              >
                Delete
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-5xl font-bold text-center py-7">
      No Applications Yet!
    </div>

    <div v-if="Object.keys(selected).length" class="flex flex-col gap-3">
      <div class="text-3xl border-b">Application Details</div>

      <div class="font-semibold">
        Name: <span class="font-normal">{{ selected.name }}</span>
      </div>
      <div class="font-semibold">
        Experience:
        <span class="font-normal">{{ selected.experience }} Months</span>
      </div>
      <div class="font-semibold">
        Applied for:
        <span class="font-normal">{{ selected.position }}</span>
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
      <div class="font-semibold">
        Message: <span class="font-normal">{{ selected.message }}</span>
      </div>
      <div class="font-semibold">
        Resume/CV:
        <a
          v-if="selected.cv"
          :href="selected.cv"
          target="_blank"
          class="font-normal"
        >
          Open
        </a>
        <div v-else class="font-normal">Not Provided!</div>
      </div>
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
  import {
    ref,
    getStorage,
    FirebaseStorage,
    getDownloadURL,
    deleteObject
  } from '@firebase/storage'

  interface AdminJobApplicationsData {
    applications: Array<Record<string, string>>
    selected: Record<string, string>
    app: FirebaseApp
  }

  export default Vue.extend({
    name: 'AdminPortfolio',

    layout: 'admin',

    data(): AdminJobApplicationsData {
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

        applications: [],
        selected: {}
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      },
      storage(): FirebaseStorage {
        return getStorage(this.app)
      }
    },

    methods: {
      async showDetails(id: string) {
        const current = this.applications.filter(
          (application) => (application.id = id)
        )[0]

        this.selected = {
          ...current,
          cv: await getDownloadURL(ref(this.storage, current.cv))
        }
      },

      async deleteApplication(id: string) {
        const confirmed = confirm(
          `You are about to delete job application by ${
            this.applications.filter((application) => application.id === id)[0]
              .name
          }, are you sure ?`
        )
        if (confirmed) {
          try {
            await deleteObject(
              ref(
                this.storage,
                this.applications.filter(
                  (application) => application.id === id
                )[0].cv
              )
            )
            await deleteDoc(doc(this.fireStore, 'job_applications', id))

            this.applications = this.applications.filter(
              (application) => application.id !== id
            )

            this.$toast.success('Application deleted!')
          } catch (e) {
            console.error(e)
          }
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(
          collection(this.fireStore, 'job_applications')
        )
        docs.forEach((doc) => {
          this.applications = [
            ...this.applications,
            { id: doc.id, ...doc.data() }
          ]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
