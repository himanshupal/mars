<template>
  <div class="flex flex-col px-5">
    <div v-if="jobs.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Title</th>
            <th class="px-2 py-1 border-r">Description</th>
            <th class="px-2 py-1 border-r">Location</th>
            <th class="px-2 py-1 border-r">No. of Vacancies</th>
            <th class="px-2 py-1 border-r">Apply Before</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(job, index) in jobs"
            :key="job.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}</td>
            <td class="px-2 py-1 border-r">{{ job.title }}</td>
            <td class="px-2 py-1 border-r">{{ job.description }}</td>
            <td class="px-2 py-1 border-r">{{ job.location }}</td>
            <td class="px-2 py-1 border-r">{{ job.vacancies }}</td>
            <td v-if="job.lastDate" class="px-2 py-1 border-r">
              {{ Intl.DateTimeFormat('en-IN').format(new Date(job.lastDate)) }}
            </td>
            <td v-else class="px-2 py-1 border-r" />
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editJob(job.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteJob(job.id)"
                >
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-5xl font-bold text-center py-7">
      No Jobs Yet!
    </div>

    <form class="flex flex-col md:w-2/3 lg:w-1/2" @submit.prevent="submitForm">
      <label class="block py-2 text-3xl border-b">
        Add Job
      </label>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        maxlength="100"
        placeholder="Project Title (100 chars MAX)"
        v-model.trim="title"
      />

      <label class="block py-2" for="description">
        Description
      </label>
      <textarea
        name="description"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        placeholder="Job Description"
        v-model.trim="description"
        required
      />

      <label class="block py-2" for="location">
        Location
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="location"
        placeholder="Job Location"
        v-model.trim="location"
      />

      <label class="block py-2" for="vacancies">
        No. of Vacancies
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="vacancies"
        type="number"
        min="1"
        placeholder="Number of Vacancies"
        v-model.trim="vacancies"
      />

      <label class="block py-2" for="lastDate">
        Apply Before
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="lastDate"
        type="date"
        :min="today"
        placeholder="Last date to apply"
        v-model.trim="lastDate"
      />

      <div class="flex w-full my-4">
        <button class="bg-green-600 hover:bg-green-700 w-1/2 h-9" type="submit">
          Save
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 w-1/2 h-9"
          type="reset"
          @click="resetForm"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    doc,
    addDoc,
    collection,
    Firestore,
    getDocs,
    deleteDoc,
    getFirestore,
    updateDoc
  } from 'firebase/firestore'
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import computed from '@/mixins/computed'

  interface AdminCareerData {
    jobs: Array<Record<string, string>>
    app: FirebaseApp
    title: string
    description: string
    location: string
    vacancies: string
    lastDate: string

    editing?: string
  }

  export default Vue.extend({
    name: 'AdminCareers',

    layout: 'admin',

    mixins: [computed],

    data(): AdminCareerData {
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

        jobs: [],

        title: '',
        description: '',
        location: '',
        vacancies: '',
        lastDate: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      resetForm() {
        this.title = ''
        this.description = ''
        this.location = ''
        this.vacancies = ''
        this.lastDate = ''

        this.editing = ''
      },

      editJob(id: string) {
        const [project] = this.jobs.filter((job) => job.id === id)
        this.title = project.title
        this.description = project.description
        this.location = project.location
        this.vacancies = project.vacancies
        this.lastDate = project.lastDate

        this.editing = id
      },

      async deleteJob(id: string) {
        const confirmed = confirm(
          `You are about to delete job for "${
            this.jobs.filter((job) => job.id === id)[0].title
          }", are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'jobs', id))
          this.jobs = this.jobs.filter((job) => job.id !== id)

          // @ts-ignore
          this.$toast.success('Job deleted!')
        }
      },

      async submitForm() {
        try {
          const dataToSave = {
            title: this.title,
            description: this.description,
            location: this.location,
            vacancies: this.vacancies,
            lastDate: this.lastDate
          }

          if (this.editing) {
            await updateDoc(
              doc(this.fireStore, 'jobs', this.editing),
              dataToSave
            )
            this.jobs = [
              ...this.jobs.filter((job) => job.id !== this.editing),
              { id: this.editing, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'jobs'),
              dataToSave
            )
            this.jobs = [...this.jobs, { id: response.id, ...dataToSave }]
          }

          // @ts-ignore
          this.$toast.success(
            this.editing ? 'Job details updated!' : 'New Job added to list!'
          )
          this.resetForm()
        } catch (e) {
          // @ts-ignore
          this.$toast.error(e)
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(collection(this.fireStore, 'jobs'))
        docs.forEach((doc) => {
          this.jobs = [...this.jobs, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        // @ts-ignore
        this.$toast.error(e)
      }
    }
  })
</script>
