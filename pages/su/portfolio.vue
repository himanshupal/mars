<template>
  <div class="flex flex-col px-5">
    <div class="text-5xl pb-2 border-b">
      Portfolio
    </div>
    <div v-if="projects.length" class="w-full overflow-auto">
      <table class="border my-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Title</th>
            <th class="px-2 py-1 border-r">About</th>
            <th class="px-2 py-1 border-r">Link</th>
            <th class="px-2 py-1 border-r">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in projects"
            :key="project.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ project.title }}</td>
            <td class="px-2 py-1 border-r">{{ project.about }}</td>
            <td class="px-2 py-1 border-r">{{ project.link }}</td>
            <td class="px-2 py-1 border-r">
              <a v-if="project.image" :href="project.image" target="_blank">
                {{ project.image.substring(0, 50) }}...
              </a>
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span class="cursor-pointer hover:text-yellow-600">Edit</span>
                <span class="cursor-pointer hover:text-red-600">Delete</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="text-red-500 bg-white rounded p-2 mt-2">
      {{ error }}
    </div>

    <form class="flex flex-col" @submit.prevent="submitForm">
      <label class="block py-2 text-3xl">
        Add Project
      </label>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full lg:w-1/2 h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        placeholder="Project Title"
        v-model.trim="title"
      />
      <label class="block py-2" for="about">
        About
      </label>
      <input
        class="order-r-8 w-full lg:w-1/2 h-9 py-2 px-3 rounded-sm text-gray-900"
        name="about"
        required
        placeholder="Project Description"
        v-model.trim="about"
      />
      <label class="block py-2" for="link">
        Link
      </label>
      <input
        class="order-r-8 w-full lg:w-1/2 h-9 py-2 px-3 rounded-sm text-gray-900"
        name="link"
        placeholder="Link to Project"
        v-model.trim="link"
      />

      <label class="block py-2" for="image">
        Image
      </label>
      <img
        v-if="image"
        class="lg:w-1/2 max-h-48 object-contain mb-3"
        :src="image"
      />
      <button
        else
        type="button"
        @click="$refs.imageInput.click()"
        class="h-9 px-3 lg:w-1/2 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${image ? 'Change' : 'Select'} Image` }}
      </button>
      <input
        type="file"
        name="image"
        hidden
        ref="imageInput"
        accept="image/*"
        @change="imageSelect"
      />

      <div class="flex w-full lg:w-1/2 my-4">
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
    addDoc,
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from 'firebase/firestore'
  import { FirebaseApp, initializeApp } from '@firebase/app'

  interface PortfolioData {
    projects: Array<Record<string, string>>
    app: FirebaseApp
    image: string | ArrayBuffer
    title: string
    about: string
    link: string
    error: string
  }

  export default Vue.extend({
    name: 'AdminPortfolio',

    layout: 'admin',

    data(): PortfolioData {
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

        projects: [],

        image: '',
        title: '',
        about: '',
        link: '',

        error: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      resetForm() {
        this.image = ''
        this.title = ''
        this.about = ''
        this.link = ''
      },

      imageSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.image = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
        }
      },

      async submitForm() {
        try {
          // @ts-ignore

          const imageResponse = await this.$cloudinary.upload(
            this.image.toString(),
            {
              uploadPreset: this.$config.uploadPreset
            }
          )

          await addDoc(collection(this.fireStore, 'portfolio'), {
            title: this.title,
            about: this.about,
            link: this.link,
            image: imageResponse.secure_url
          })

          this.error = 'Uploaded!'
        } catch (e) {
          this.error = e.message
        }
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(collection(this.fireStore, 'portfolio'))
        docs.forEach((doc) => {
          this.projects = [...this.projects, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        this.error = e.message
      }
    }
  })
</script>
