<template>
  <div class="flex flex-col px-5">
    <label class="block py-2 text-2xl">
      Service Description
    </label>
    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="updateDescription"
    >
      <textarea
        name="serviceDescription"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        placeholder="Describe your business"
        v-model.trim="serviceDescription"
        required
      />

      <div class="flex w-full my-4">
        <button
          class="bg-green-600 hover:bg-green-700 h-9 w-full"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>

    <hr class="my-2" />

    <label class="block py-2 text-2xl">
      CEO's Section
    </label>
    <form class="flex flex-col md:w-2/3 lg:w-1/2" @submit.prevent="updateData">
      <label class="block pb-2" for="name">
        Name
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="name"
        required
        placeholder="Name of CEO"
        v-model.trim="name"
      />

      <label class="block py-2" for="designation">
        Designation
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="designation"
        required
        placeholder="Update Designation Text"
        v-model.trim="designation"
      />

      <label class="block py-2" for="words">
        CEO's Words
      </label>
      <textarea
        name="words"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        placeholder="Words of Wisdom by CEO"
        v-model.trim="words"
        required
      />

      <label class="block py-2" for="photo">
        Photo of CEO
      </label>
      <img v-if="photo" class="max-h-48 object-contain mb-3" :src="photo" />
      <button
        else
        type="button"
        @click="$refs.photoInput.click()"
        class="h-9 px-3 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${photo ? 'Change' : 'Select'} Image` }}
      </button>
      <input
        type="file"
        name="photo"
        hidden
        ref="photoInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="photoSelect"
      />

      <div class="text-center text-xs font-bold py-1">OR</div>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="photoURL"
        type="url"
        required
        placeholder="Paste a URL to photo (1:1)"
        v-model.trim="photo"
      />

      <div class="flex w-full my-4">
        <button
          class="bg-green-600 hover:bg-green-700 h-9 w-full"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>

    <hr class="my-2" />

    <label class="block py-2 text-2xl"> <b>Why Choose Us</b> Section </label>
    <form class="flex flex-col md:w-2/3 lg:w-1/2" @submit.prevent="submitForm">
      <label class="block pb-2" for="description">
        Short Description
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="description"
        maxlength="150"
        required
        placeholder="Description of your features (MAX 150 Chars)"
        v-model.trim="description"
      />

      <label class="block py-2 text-xl">
        Features
      </label>
      <div v-if="features.length" class="w-full overflow-auto">
        <table class="border mb-2 table-auto w-full">
          <thead class="border">
            <tr class="text-left">
              <th class="px-2 py-1 border-r">S.No.</th>
              <th class="px-2 py-1 border-r">Title</th>
              <th class="px-2 py-1 border-r">About</th>
              <th class="px-2 py-1 border-r">Icon</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(feature, index) in features"
              :key="feature.id"
              :class="{ 'bg-green-500': index % 2 === 0 }"
              class="text-sm"
            >
              <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
              <td class="px-2 py-1 border-r">{{ feature.title }}</td>
              <td class="px-2 py-1 border-r">{{ feature.about }}</td>
              <td class="px-2 py-1 border-r">
                <img class="w-12 h-12 object-contain" :src="feature.icon" />
              </td>
              <td class="px-2 py-1">
                <div class="flex gap-2 justify-around">
                  <span
                    class="cursor-pointer hover:text-yellow-600"
                    @click="editFeature(feature.id)"
                  >
                    Edit
                  </span>
                  <span
                    class="cursor-pointer hover:text-red-600"
                    @click="deleteFeature(feature.id)"
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
        No Features Yet!
      </div>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        placeholder="Title for the feature"
        v-model.trim="title"
      />

      <label class="block pb-2" for="about">
        About
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="about"
        required
        placeholder="Short gist of the feature"
        v-model.trim="about"
      />

      <label class="block py-2" for="icon">
        Icon
      </label>
      <img v-if="icon" class="max-h-48 object-contain mb-3" :src="icon" />
      <button
        else
        type="button"
        @click="$refs.iconInput.click()"
        class="h-9 px-3 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${icon ? 'Change' : 'Select'} Icon` }}
      </button>
      <input
        type="file"
        name="icon"
        hidden
        ref="iconInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="iconSelect"
      />

      <div class="text-center text-xs font-bold py-1">OR</div>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="iconURL"
        type="url"
        required
        placeholder="Paste a URL to Icon"
        v-model.trim="icon"
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

  interface AdminAboutData {
    features: Array<Record<string, string>>
    app: FirebaseApp

    serviceDescription: string
    serviceDescriptionId: string

    dataId: string
    name: string
    designation: string
    words: string
    photo: string | ArrayBuffer
    photoUpdated: boolean

    description: string
    descriptionId: string

    title: string
    about: string
    icon: string | ArrayBuffer

    editingFeature: string
  }

  export default Vue.extend({
    name: 'AdminAbout',

    layout: 'admin',

    data(): AdminAboutData {
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

        features: [],

        serviceDescription: '',
        serviceDescriptionId: '',

        dataId: '',
        name: '',
        designation: '',
        words: '',
        photo: '',
        photoUpdated: false,

        description: '',
        descriptionId: '',

        title: '',
        about: '',
        icon: '',

        editingFeature: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      async updateDescription() {
        if (this.serviceDescriptionId) {
          await updateDoc(
            doc(this.fireStore, 'about', this.serviceDescriptionId),
            { serviceDescription: this.serviceDescription }
          )
          this.$toast.success('Description updated!')
        } else {
          await addDoc(collection(this.fireStore, 'about'), {
            serviceDescription: this.serviceDescription
          })
          this.$toast.success('Description updated!')
        }
      },

      async updateData() {
        let imageResponse = this.photo

        if (this.photoUpdated) {
          const result = await this.$cloudinary.upload(this.photo.toString(), {
            uploadPreset: this.$config.uploadPreset,
            tags: ['mars', 'about']
          })
          imageResponse = result?.secure_url
        }

        const dataToSave = {
          name: this.name,
          designation: this.designation,
          words: this.words,
          photo: imageResponse
        }

        if (this.dataId) {
          await updateDoc(doc(this.fireStore, 'about', this.dataId), dataToSave)
          this.$toast.success('CEO Details updated!')
        } else {
          await addDoc(collection(this.fireStore, 'about'), dataToSave)
          this.$toast.success('CEO Details updated!')
        }
      },

      resetForm() {
        this.title = ''
        this.about = ''
        this.icon = ''
      },

      editFeature(id: string) {
        const [feature] = this.features.filter((feature) => feature.id === id)
        this.title = feature.title
        this.about = feature.about
        this.icon = feature.icon
        this.editingFeature = id
      },

      async deleteFeature(id: string) {
        const confirmed = confirm(
          `You are about to delete "${
            this.features.filter((feature) => feature.id === id)[0].title
          }" card, are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'features_cards', id))
          this.features = this.features.filter((feature) => feature.id !== id)

          this.$toast.success('Card deleted!')
        }
      },

      photoSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.photo = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
          this.photoUpdated = true
        }
      },

      iconSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.icon = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
        }
      },

      async submitForm() {
        try {
          let imageResponse

          if (this.descriptionId) {
            await updateDoc(doc(this.fireStore, 'about', this.descriptionId), {
              description: this.description
            })
          } else {
            await addDoc(collection(this.fireStore, 'about'), {
              description: this.description
            })
          }

          if (
            this.editingFeature
              ? this.icon !==
                this.features.filter(
                  (feature) => feature.id === this.editingFeature
                )[0].icon
              : true
          ) {
            const result = await this.$cloudinary.upload(this.icon.toString(), {
              uploadPreset: this.$config.uploadPreset,
              tags: ['mars', 'about', 'card', 'icon']
            })
            imageResponse = result?.secure_url
          }

          const dataToSave = {
            title: this.title,
            about: this.about,
            icon: imageResponse?.secure_url || this.icon
          }

          if (this.editingFeature) {
            await updateDoc(
              doc(this.fireStore, 'features_cards', this.editingFeature),
              dataToSave
            )
            this.features = [
              ...this.features.filter(
                (feature) => feature.id !== this.editingFeature
              ),
              { id: this.editingFeature, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'features_cards'),
              dataToSave
            )
            this.features = [
              ...this.features,
              { id: response.id, ...dataToSave }
            ]
          }

          this.$toast.success('Features updated!')
          this.resetForm()
        } catch (e) {
          console.error(e)
        }
      }
    },

    async mounted() {
      try {
        const features = await getDocs(
          collection(this.fireStore, 'features_cards')
        )
        features.forEach((doc) => {
          this.features = [...this.features, { id: doc.id, ...doc.data() }]
        })

        const aboutDocs = await getDocs(collection(this.fireStore, 'about'))
        aboutDocs.forEach((doc) => {
          if (doc.data()['serviceDescription']) {
            this.serviceDescription = doc.data()['serviceDescription']
            this.serviceDescriptionId = doc.id
          }
          if (doc.data()['words']) {
            this.name = doc.data()['name']
            this.designation = doc.data()['designation']
            this.words = doc.data()['words']
            this.photo = doc.data()['photo']

            this.dataId = doc.id
          }
          if (doc.data()['description']) {
            this.description = doc.data()['description']
            this.descriptionId = doc.id
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
