<template>
  <div class="flex flex-col px-5">
    <label class="block py-2 text-2xl">
      Slides
    </label>
    <div v-if="slides.length" class="w-full overflow-auto">
      <table class="border mb-2 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Title</th>
            <th class="px-2 py-1 border-r">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(slide, index) in slides"
            :key="slide.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ slide.title }}</td>
            <td class="px-2 py-1 border-r">
              <a :href="slide.image" target="_blank">
                View
              </a>
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editSlide(slide.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteSlide(slide.id)"
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
      No Slides Yet!
    </div>

    <label class="block py-2 text-2xl">
      Trainings
    </label>
    <div v-if="trainings.length" class="w-full overflow-auto">
      <table class="border mb-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Title</th>
            <th class="px-2 py-1 border-r">About</th>
            <th class="px-2 py-1 border-r">Duration</th>
            <th class="px-2 py-1 border-r">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(training, index) in trainings"
            :key="training.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ training.title }}</td>
            <td class="px-2 py-1 border-r">{{ training.description }}</td>
            <td class="px-2 py-1 border-r">{{ training.duration }}</td>
            <td class="px-2 py-1 border-r">
              &#8377; {{ Intl.NumberFormat('en-IN').format(training.cost) }}/-
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editTraining(training.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteTraining(training.id)"
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
      No Trainings Yet!
    </div>

    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="submitTrainingForm"
    >
      <label class="block py-2 text-3xl border-b">
        Add Training
      </label>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        maxlength="35"
        placeholder="Course Title (35 chars MAX)"
        v-model.trim="trainingTitle"
      />

      <label class="block py-2" for="description">
        Course Description
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="description"
        required
        maxlength="250"
        placeholder="Training Description (250 chars MAX)"
        v-model.trim="trainingDescription"
      />

      <label class="block py-2" for="duration">
        Duration
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="duration"
        placeholder="Duration of training (e.g. 2 Months)"
        v-model.trim="trainingDuration"
      />

      <label class="block py-2" for="cost">
        Cost
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        min="0"
        name="cost"
        type="number"
        placeholder="Training Cost"
        v-model.trim="trainingCost"
      />

      <div class="flex w-full my-4">
        <button class="bg-green-600 hover:bg-green-700 w-1/2 h-9" type="submit">
          Save
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 w-1/2 h-9"
          type="reset"
          @click="resetTrainingForm"
        >
          Cancel
        </button>
      </div>
    </form>

    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="submitSlideForm"
    >
      <label class="block py-2 text-3xl border-b">
        Add Slide
      </label>

      <label class="block py-2" for="title">
        Title
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="title"
        required
        maxlength="35"
        placeholder="Display Text (35 chars MAX)"
        v-model.trim="slideTitle"
      />

      <label class="block py-2" for="image">
        Image
      </label>
      <img
        v-if="slideImage"
        class="max-h-48 object-contain mb-3"
        :src="slideImage"
      />
      <button
        else
        type="button"
        @click="$refs.imageInput.click()"
        class="h-9 px-3 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${slideImage ? 'Change' : 'Select'} Image` }}
      </button>
      <input
        type="file"
        name="image"
        hidden
        ref="imageInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="imageSelect"
      />

      <div class="text-center text-xs font-bold py-1">OR</div>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="imageURL"
        type="url"
        placeholder="Paste a URL to image (15:4)"
        v-model.trim="slideImage"
      />

      <div class="flex w-full my-4">
        <button class="bg-green-600 hover:bg-green-700 w-1/2 h-9" type="submit">
          Save
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 w-1/2 h-9"
          type="reset"
          @click="resetSlideForm"
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
    trainings: Array<Record<string, string>>
    slides: Array<Record<string, string>>
    app: FirebaseApp

    trainingTitle: string
    trainingDescription: string
    trainingDuration: string
    trainingCost: string

    slideTitle: string
    slideImage: string | ArrayBuffer

    editingTraining?: string
    editingSlide?: string
  }

  export default Vue.extend({
    name: 'AdminTrainings',

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

        trainings: [],
        slides: [],

        trainingTitle: '',
        trainingDescription: '',
        trainingDuration: '',
        trainingCost: '',

        slideTitle: '',
        slideImage: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      resetTrainingForm() {
        this.trainingTitle = ''
        this.trainingDescription = ''
        this.trainingDuration = ''
        this.trainingCost = ''

        this.editingTraining = ''
      },

      resetSlideForm() {
        this.slideTitle = ''
        this.slideImage = ''

        this.editingSlide = ''
      },

      editSlide(id: string) {
        const [slide] = this.slides.filter((slide) => slide.id === id)
        this.slideTitle = slide.title
        this.slideImage = slide.image

        this.editingSlide = id
      },

      editTraining(id: string) {
        const [training] = this.trainings.filter(
          (training) => training.id === id
        )
        this.trainingTitle = training.title
        this.trainingDescription = training.description
        this.trainingDuration = training.duration
        this.trainingCost = training.cost

        this.editingTraining = id
      },

      async deleteSlide(id: string) {
        const confirmed = confirm(
          `You are about to delete "${
            this.slides.filter((slide) => slide.id === id)[0].title
          }" slide, are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'trainings_slides', id))
          this.slides = this.slides.filter((slide) => slide.id !== id)

          this.$toast.success('Slide deleted!')
        }
      },

      async deleteTraining(id: string) {
        const confirmed = confirm(
          `You are about to delete "${
            this.trainings.filter((training) => training.id === id)[0].title
          }" training, are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'trainings', id))
          this.trainings = this.trainings.filter(
            (training) => training.id !== id
          )

          this.$toast.success('Training deleted!')
        }
      },

      imageSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.slideImage = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
        }
      },

      async submitTrainingForm() {
        try {
          const dataToSave = {
            title: this.trainingTitle,
            description: this.trainingDescription,
            duration: this.trainingDuration,
            cost: this.trainingCost
          }

          if (this.editingTraining) {
            await updateDoc(
              doc(this.fireStore, 'trainings', this.editingTraining),
              dataToSave
            )
            this.trainings = [
              ...this.trainings.filter(
                (training) => training.id !== this.editingTraining
              ),
              { id: this.editingTraining, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'trainings'),
              dataToSave
            )
            this.trainings = [
              ...this.trainings,
              { id: response.id, ...dataToSave }
            ]
          }

          this.$toast.success(
            this.editingTraining
              ? 'Details updated!'
              : 'Course added to trainings!'
          )
          this.resetTrainingForm()
        } catch (e) {
          this.$toast.error(e)
        }
      },

      async submitSlideForm() {
        try {
          let imageResponse

          if (
            this.editingSlide
              ? this.slideImage !==
                this.slides.filter((slide) => slide.id === this.editingSlide)[0]
                  .image
              : true
          )
            imageResponse = await this.$cloudinary.upload(
              this.slideImage.toString(),
              {
                uploadPreset: this.$config.uploadPreset,
                tags: ['mars', 'trainings']
              }
            )

          const dataToSave = {
            title: this.slideTitle,
            image: imageResponse?.secure_url || this.slideImage
          }

          if (this.editingSlide) {
            await updateDoc(
              doc(this.fireStore, 'trainings_slides', this.editingSlide),
              dataToSave
            )
            this.slides = [
              ...this.slides.filter((slide) => slide.id !== this.editingSlide),
              { id: this.editingSlide, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'trainings_slides'),
              dataToSave
            )
            this.slides = [...this.slides, { id: response.id, ...dataToSave }]
          }

          this.$toast.success(
            this.editingSlide ? 'Slides updated!' : 'Details added to slides!'
          )
          this.resetSlideForm()
        } catch (e) {
          this.$toast.error(e)
        }
      }
    },

    async mounted() {
      try {
        const trainings = await getDocs(collection(this.fireStore, 'trainings'))
        trainings.forEach((doc) => {
          this.trainings = [...this.trainings, { id: doc.id, ...doc.data() }]
        })

        const slides = await getDocs(
          collection(this.fireStore, 'trainings_slides')
        )
        slides.forEach((doc) => {
          this.slides = [...this.slides, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  })
</script>
