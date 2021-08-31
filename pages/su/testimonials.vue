<template>
  <div class="flex flex-col px-5">
    <label class="block py-2 text-2xl">
      Client Testimonials
    </label>
    <div v-if="clientTestimonials.length" class="w-full overflow-auto">
      <table class="border mb-2 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Name</th>
            <th class="px-2 py-1 border-r">About</th>
            <th class="px-2 py-1 border-r">Review</th>
            <th class="px-2 py-1 border-r">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(client, index) in clientTestimonials"
            :key="client.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ client.name }}</td>
            <td class="px-2 py-1 border-r">{{ client.about }}</td>
            <td class="px-2 py-1 border-r">{{ client.review }}</td>
            <td class="px-2 py-1 border-r">
              <a :href="client.image" target="_blank">
                View
              </a>
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editClient(client.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteClient(client.id)"
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
      No Client Testimonials Yet!
    </div>

    <label class="block py-2 text-2xl">
      Student Testimonials
    </label>
    <div v-if="studentTestimonials.length" class="w-full overflow-auto">
      <table class="border mb-4 table-auto w-full">
        <thead class="border">
          <tr class="text-left">
            <th class="px-2 py-1 border-r">S.No.</th>
            <th class="px-2 py-1 border-r">Name</th>
            <th class="px-2 py-1 border-r">Course</th>
            <th class="px-2 py-1 border-r">Review</th>
            <th class="px-2 py-1 border-r">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in studentTestimonials"
            :key="student.id"
            :class="{ 'bg-green-500': index % 2 === 0 }"
            class="text-sm"
          >
            <td class="px-2 py-1 border-r font-semibold">{{ index + 1 }}.</td>
            <td class="px-2 py-1 border-r">{{ student.name }}</td>
            <td class="px-2 py-1 border-r">{{ student.about }}</td>
            <td class="px-2 py-1 border-r">{{ student.review }}</td>
            <td class="px-2 py-1 border-r">
              <a :href="student.image" target="_blank">
                View
              </a>
            </td>
            <td class="px-2 py-1">
              <div class="flex gap-2 justify-around">
                <span
                  class="cursor-pointer hover:text-yellow-600"
                  @click="editStudent(student.id)"
                >
                  Edit
                </span>
                <span
                  class="cursor-pointer hover:text-red-600"
                  @click="deleteStudent(student.id)"
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
      No Student Testimonials Yet!
    </div>

    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="submitClientForm"
    >
      <label class="block py-2 text-3xl border-b">
        Add Client Testimonial
      </label>

      <label class="block py-2" for="name">
        Name
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="name"
        required
        placeholder="Client Name"
        v-model.trim="clientName"
      />

      <label class="block py-2" for="about">
        About Client
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="about"
        maxlength="250"
        placeholder="e.g. CTO of XYZ company"
        v-model.trim="clientAbout"
      />

      <label class="block py-2" for="review">
        Review
      </label>
      <textarea
        name="review"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        placeholder="Detailed review by client"
        v-model.trim="clientReview"
        required
      />

      <label class="block py-2" for="image">
        Image
      </label>
      <img
        v-if="clientImage"
        class="max-h-48 object-contain mb-3"
        :src="clientImage"
      />
      <button
        else
        type="button"
        @click="$refs.clientImageInput.click()"
        class="h-9 px-3 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${clientImage ? 'Change' : 'Select'} Image` }}
      </button>
      <input
        type="file"
        name="image"
        hidden
        ref="clientImageInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="clientImageSelect"
      />

      <div class="text-center text-xs font-bold py-1">OR</div>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="imageURL"
        type="url"
        placeholder="Paste a URL to image (1:1)"
        v-model.trim="clientImage"
      />

      <div class="flex w-full my-4">
        <button class="bg-green-600 hover:bg-green-700 w-1/2 h-9" type="submit">
          Save
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 w-1/2 h-9"
          type="reset"
          @click="resetClientForm"
        >
          Cancel
        </button>
      </div>
    </form>

    <form
      class="flex flex-col md:w-2/3 lg:w-1/2"
      @submit.prevent="submitStudentForm"
    >
      <label class="block py-2 text-3xl border-b">
        Add Student Testimonial
      </label>

      <label class="block py-2" for="name">
        Name
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="name"
        required
        placeholder="Student Name"
        v-model.trim="studentName"
      />

      <label class="block py-2" for="about">
        About
      </label>
      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="about"
        placeholder="e.g. Python 3-Months trainee"
        v-model.trim="studentAbout"
      />

      <label class="block py-2" for="review">
        Review
      </label>
      <textarea
        name="review"
        class="order-r-8 w-full h-24 py-2 px-3 rounded-sm text-gray-900"
        placeholder="Detailed review by student"
        v-model.trim="studentReview"
        required
      />

      <label class="block py-2" for="image">
        Image
      </label>
      <img
        v-if="studentImage"
        class="max-h-48 object-contain mb-3"
        :src="studentImage"
      />
      <button
        else
        type="button"
        @click="$refs.studentImageInput.click()"
        class="h-9 px-3 bg-green-500 hover:bg-green-300 hover:text-green-500 rounded-sm font-semibold"
      >
        {{ `${studentImage ? 'Change' : 'Select'} Image` }}
      </button>
      <input
        type="file"
        name="image"
        hidden
        ref="studentImageInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="studentImageSelect"
      />

      <div class="text-center text-xs font-bold py-1">OR</div>

      <input
        class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
        name="imageURL"
        type="url"
        placeholder="Paste a URL to image (1:1)"
        v-model.trim="studentImage"
      />

      <div class="flex w-full my-4">
        <button class="bg-green-600 hover:bg-green-700 w-1/2 h-9" type="submit">
          Save
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 w-1/2 h-9"
          type="reset"
          @click="resetStudentForm"
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

  interface AdminTestimonialsData {
    clientTestimonials: Array<Record<string, string>>
    studentTestimonials: Array<Record<string, string>>
    app: FirebaseApp

    clientName: string
    clientAbout: string
    clientReview: string
    clientImage: string | ArrayBuffer

    studentName: string
    studentAbout: string
    studentReview: string
    studentImage: string

    editingClient?: string
    editingStudent?: string
  }

  export default Vue.extend({
    name: 'AdminTestimonials',

    layout: 'admin',

    data(): AdminTestimonialsData {
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

        clientTestimonials: [],
        studentTestimonials: [],

        clientName: '',
        clientAbout: '',
        clientReview: '',
        clientImage: '',

        studentName: '',
        studentAbout: '',
        studentReview: '',
        studentImage: ''
      }
    },

    computed: {
      fireStore(): Firestore {
        return getFirestore(this.app)
      }
    },

    methods: {
      resetClientForm() {
        this.clientName = ''
        this.clientAbout = ''
        this.clientReview = ''
        this.clientImage = ''

        this.editingClient = ''
      },

      resetStudentForm() {
        this.studentName = ''
        this.studentAbout = ''
        this.studentReview = ''
        this.studentImage = ''

        this.editingStudent = ''
      },

      editClient(id: string) {
        const [client] = this.clientTestimonials.filter(
          (client) => client.id === id
        )
        this.clientName = client.name
        this.clientAbout = client.about
        this.clientReview = client.review
        this.clientImage = client.image

        this.editingClient = id
      },

      editStudent(id: string) {
        const [student] = this.studentTestimonials.filter(
          (student) => student.id === id
        )
        this.studentName = student.name
        this.studentAbout = student.about
        this.studentReview = student.review
        this.studentImage = student.image

        this.editingStudent = id
      },

      async deleteClient(id: string) {
        const confirmed = confirm(
          `You are about to delete ${
            this.clientTestimonials.filter((client) => client.id === id)[0].name
          }'s testimonial, are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'testimonials_client', id))
          this.clientTestimonials = this.clientTestimonials.filter(
            (client) => client.id !== id
          )

          this.$toast.success('Testimonial deleted!')
        }
      },

      async deleteStudent(id: string) {
        const confirmed = confirm(
          `You are about to delete ${
            this.studentTestimonials.filter((student) => student.id === id)[0]
              .name
          }'s testimonial, are you sure ?`
        )
        if (confirmed) {
          await deleteDoc(doc(this.fireStore, 'testimonials_student', id))
          this.studentTestimonials = this.studentTestimonials.filter(
            (student) => student.id !== id
          )

          this.$toast.success('Testimonial deleted!')
        }
      },

      clientImageSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.clientImage = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
        }
      },

      studentImageSelect(e: any) {
        if (e.target.files.length) {
          const [image] = e.target.files

          const reader: FileReader = new FileReader()

          reader.addEventListener(
            'load',
            (e) => (this.studentImage = e.target?.result?.toString() || '')
          )
          reader.readAsDataURL(image)
        }
      },

      async submitClientForm() {
        try {
          let imageResponse

          if (
            this.editingClient
              ? this.clientImage !==
                this.clientTestimonials.filter(
                  (client) => client.id === this.editingClient
                )[0].image
              : true
          )
            imageResponse = await this.$cloudinary.upload(
              this.clientImage.toString(),
              {
                uploadPreset: this.$config.uploadPreset,
                tags: ['mars', 'testimonials', 'client']
              }
            )

          const dataToSave = {
            name: this.clientName,
            about: this.clientAbout,
            review: this.clientReview,
            image: imageResponse?.secure_url || this.clientImage
          }

          if (this.editingClient) {
            await updateDoc(
              doc(this.fireStore, 'testimonials_client', this.editingClient),
              dataToSave
            )
            this.clientTestimonials = [
              ...this.clientTestimonials.filter(
                (client) => client.id !== this.editingClient
              ),
              { id: this.editingClient, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'testimonials_client'),
              dataToSave
            )
            this.clientTestimonials = [
              ...this.clientTestimonials,
              { id: response.id, ...dataToSave }
            ]
          }

          this.$toast.success(
            this.editingClient
              ? 'Review updated!'
              : 'Added to Client Testimonials!'
          )
          this.resetClientForm()
        } catch (e) {
          console.error(e)
        }
      },

      async submitStudentForm() {
        try {
          let imageResponse

          if (
            this.editingStudent
              ? this.studentImage !==
                this.studentTestimonials.filter(
                  (student) => student.id === this.editingStudent
                )[0].image
              : true
          )
            imageResponse = await this.$cloudinary.upload(
              this.studentImage.toString(),
              {
                uploadPreset: this.$config.uploadPreset,
                tags: ['mars', 'testimonials', 'student']
              }
            )

          const dataToSave = {
            name: this.studentName,
            about: this.studentAbout,
            review: this.studentReview,
            image: imageResponse?.secure_url || this.studentImage
          }

          if (this.editingStudent) {
            await updateDoc(
              doc(this.fireStore, 'testimonials_student', this.editingStudent),
              dataToSave
            )
            this.studentTestimonials = [
              ...this.studentTestimonials.filter(
                (student) => student.id !== this.editingStudent
              ),
              { id: this.editingStudent, ...dataToSave }
            ]
          } else {
            const response = await addDoc(
              collection(this.fireStore, 'testimonials_student'),
              dataToSave
            )
            this.studentTestimonials = [
              ...this.studentTestimonials,
              { id: response.id, ...dataToSave }
            ]
          }

          this.$toast.success(
            this.editingStudent
              ? 'Review updated!'
              : 'Added to Student Testimonials!'
          )
          this.resetStudentForm()
        } catch (e) {
          console.error(e)
        }
      }
    },

    async mounted() {
      try {
        const clientTestimonials = await getDocs(
          collection(this.fireStore, 'testimonials_client')
        )
        clientTestimonials.forEach((doc) => {
          this.clientTestimonials = [
            ...this.clientTestimonials,
            { id: doc.id, ...doc.data() }
          ]
        })

        const studentTestimonials = await getDocs(
          collection(this.fireStore, 'testimonials_student')
        )
        studentTestimonials.forEach((doc) => {
          this.studentTestimonials = [
            ...this.studentTestimonials,
            { id: doc.id, ...doc.data() }
          ]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
