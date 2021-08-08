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
            <td class="px-2 py-1 border-r">
              <a v-if="project.link" :href="project.link" target="_blank">
                {{ project.link }}
              </a>
            </td>
            <td class="px-2 py-1 border-r">
              <a v-if="project.image" :href="project.image" target="_blank">
                Link
              </a>
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editProject(project.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteProject(project.id)"
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
      No Projects Yet!
    </div>

    <form class="flex flex-col" @submit.prevent="submitForm">
      <label class="block py-2 text-3xl border-b">
        Add Project
      </label>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full lg:w-1/2 h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        maxlength="25"
        placeholder="Project Title (25 chars MAX)"
        v-model.trim="title"
      />
      <label class="block py-2" for="about">
        About
      </label>
      <input
        class="order-r-8 w-full lg:w-1/2 h-9 py-2 px-3 rounded-sm text-gray-900"
        name="about"
        required
        maxlength="100"
        placeholder="Project Description (100 chars MAX)"
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
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
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

  interface AdminPortfolioData {
    projects: Array<Record<string, string>>
    app: FirebaseApp
    image: string | ArrayBuffer
    title: string
    about: string
    link: string

    editing?: string
  }

  export default Vue.extend({
    name: 'AdminPortfolio',

    layout: 'admin',

    data(): AdminPortfolioData {
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
        link: ''
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

      editProject(id: string) {
        const [project] = this.projects.filter((project) => project.id === id)
        this.title = project.title
        this.about = project.about
        this.link = project.link
        this.image = project.image

        this.editing = id
      },

      async deleteProject(id: string) {
        const confirmed = confirm(
          `You are about to delete project "${
            this.projects.filter((project) => project.id === id)[0].title
          }", are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'portfolio', id))
          this.projects = this.projects.filter((project) => project.id !== id)

          // @ts-ignore
          this.$toast.success('Project deleted!')
        }
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
          let imageResponse

          if (
            this.editing
              ? this.image !==
                this.projects.filter(
                  (project) => project.id === this.editing
                )[0].image
              : true
          )
            // @ts-ignore
            imageResponse = await this.$cloudinary.upload(
              this.image.toString(),
              {
                uploadPreset: this.$config.uploadPreset,
                tags: ['mars', 'portfolio']
              }
            )

          const dataToSave = {
            title: this.title,
            about: this.about,
            link: this.link,
            image: imageResponse?.secure_url || this.image
          }

          if (this.editing) {
            await updateDoc(
              doc(this.fireStore, 'portfolio', this.editing),
              dataToSave
            )
            this.projects = [
              ...this.projects.filter((project) => project.id !== this.editing),
              { id: this.editing, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'portfolio'),
              dataToSave
            )
            this.projects = [
              ...this.projects,
              { id: response.id, ...dataToSave }
            ]
          }

          // @ts-ignore
          this.$toast.success(
            this.editing ? 'Project updated!' : 'Project added to portfolio!'
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
        const docs = await getDocs(collection(this.fireStore, 'portfolio'))
        docs.forEach((doc) => {
          this.projects = [...this.projects, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        // @ts-ignore
        this.$toast.error(e)
      }
    }
  })
</script>
