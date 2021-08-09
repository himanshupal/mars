<template>
  <div class="bg-gray-900 text-white">
    <HeroCarousel v-if="slides.length" :slides="slides" />

    <div class="text-4xl my-16 sm:my-24 px-10 lg:px-20 font-bold">
      We provide online &amp; offline trainings for various IT courses
    </div>
    <div
      class="flex flex-col lg:flex-row w-full px-8 lg:px-16 gap-10 items-center lg:items-start"
    >
      <div class="flex flex-col lg:w-2/3 w-full">
        <div class="text-2xl pb-10">Trainings we offer</div>
        <div v-if="trainings.length" class="flex flex-wrap gap-y-5 gap-x-5">
          <div
            v-for="(training, index) in trainings"
            :key="`training-${index + 1}`"
            class="w-80 sm:w-96 bg-white text-gray-900 p-3 rounded-lg flex flex-col"
          >
            <div class="text-2xl font-bold">{{ training.title }}</div>
            <div class="text-lg">{{ training.duration || 'Ongoing' }}</div>
            <div class="text-sm text-justify flex-grow">
              {{ training.description }}
            </div>
            <div class="flex items-center justify-between">
              <div v-if="training.cost" class="text-lg">
                ₹ {{ training.cost }}/-
              </div>
              <button
                class="text-center border-2 text-white border-white bg-gray-900 hover:bg-yellow-600 rounded-full h-10 w-24"
                :class="{ 'self-end': !training.cost }"
                @click="focusForm(index)"
              >
                Enquire
              </button>
            </div>
          </div>
        </div>
      </div>

      <Testimonials
        class="lg:hidden"
        :title="testimonials.title"
        :slides="testimonials.list"
      />

      <div class="flex flex-col w-full sm:w-2/3 lg:w-1/3">
        <div class="text-2xl pb-4">
          Fill in the form below &amp; we will contact you soon
        </div>
        <form
          @submit.prevent="submitForm"
          class="text-white flex flex-col justify-center"
        >
          <label class="block py-2" for="name">
            Your Name
          </label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="name"
            required
            ref="form"
            @keypress="alphaOnly"
            placeholder="John Doe"
            v-model.trim="name"
          />

          <label class="block py-2" for="email">
            E-Mail Address
          </label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="email"
            name="email"
            required
            @keypress="emailCharsOnly"
            placeholder="johndoe@email.com"
            v-model.trim="email"
          />

          <label class="block py-2" for="mobile">
            Mobile Number
          </label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="mobile"
            required
            maxlength="10"
            @blur="validateContact"
            placeholder="+XX-XXX-XXX-XXXX"
            v-model.trim="mobile"
          />
          <span class="text-xs text-yellow-300 pt-1 max-w-xs">
            {{ mobileError }}
          </span>

          <label class="block py-2" for="city">Location</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="city"
            required
            @keypress="charsOnly"
            placeholder="Where are you from ?"
            v-model.trim="location"
          />

          <label class="block py-2" for="course">Course &amp; Semester</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="course"
            required
            @keypress="charsOnly"
            placeholder="Your course &amp; semester"
            v-model.trim="course"
          />

          <label class="block py-2" for="college">College</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="college"
            required
            @keypress="charsOnly"
            placeholder="Name of your college"
            v-model.trim="location"
          />

          <label class="block py-2" for="medium">
            Preferred Medium
          </label>
          <select
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            required
            type="text"
            name="medium"
            @blur="validateMedium"
            v-model.trim="medium"
          >
            <option hidden value="-1">
              Select training type
            </option>
            <option>Online</option>
            <option>Offline</option>
          </select>
          <span class="text-xs text-yellow-300 pt-1 max-w-xs">
            {{ mediumError }}
          </span>

          <!-- <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="medium"
            required
            placeholder="Your current and remaining mediums"
            v-model.trim="medium"
          /> -->

          <label class="block py-2" for="enquiry">Course interested in</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="enquiry"
            required
            disabled
            @keypress="charsOnly"
            placeholder="Please select a course from courses list"
            v-model.trim="enquiryFor"
          />

          <!-- <label class="block py-2" for="subject">
            Message
          </label>
          <textarea
            class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
            name="message"
            rows="3"
            placeholder="Have any query or message for us..."
            v-model.trim="message"
          /> -->

          <button
            type="submit"
            class="mt-7 mb-5 py-1.5 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <Testimonials
      class="pb-12 hidden lg:block"
      :title="testimonials.title"
      :slides="testimonials.list"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validation from '@/mixins/validation'
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import {
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'

  interface TrainingData {
    slides: Array<Record<string, string>>
    trainings: Array<Record<string, string>>

    app: FirebaseApp

    trainingSelected: boolean
    mobileError: string
    mediumError: string

    name: string
    email: string
    mobile: string
    location: string
    message: string
    course: string
    medium: string
    college: string
    enquiryFor: string
  }

  export default Vue.extend({
    name: 'TrainingPage',

    mixins: [validation],

    data(): TrainingData {
      return {
        slides: [],
        trainings: [],

        trainingSelected: false,
        mobileError: '',
        mediumError: '',

        name: '',
        email: '',
        mobile: '',
        location: '',
        message: '',
        course: '',
        medium: '-1',
        college: '',
        enquiryFor: '',

        app: initializeApp({
          apiKey: this.$config.apiKey,
          authDomain: this.$config.authDomain,
          projectId: this.$config.projectId,
          storageBucket: this.$config.storageBucket,
          messagingSenderId: this.$config.messagingSenderId,
          appId: this.$config.appId,
          measurementId: this.$config.measurementId
        })
      }
    },

    methods: {
      submitForm(): void {
        console.log({
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          location: this.location,
          message: this.message,
          course: this.course,
          medium: this.medium,
          college: this.college,
          enquiryFor: this.enquiryFor
        })
      },
      focusForm(training: number): void {
        this.trainingSelected = true
        // @ts-ignore
        this.form.enquiryFor = this.trainings.list[training].title
        const form = this.$refs?.form as HTMLElement
        form.focus()
      },
      validateContact(e: InputEvent): void {
        if (/([6-9][\d]{9})+/.test(this.mobile)) this.mobileError = ''
        else this.mobileError = 'First digit of mobile must be between 6 & 9'
      },
      validateMedium(e: InputEvent): void {
        if (this.medium === '-1') {
          this.mediumError = 'Please select mode of training'
        } else {
          this.mediumError = ''
        }
      }
    },

    computed: {
      testimonials(): Object {
        return this.$store.state.testimonials.students
      },
      fireStore(): Firestore {
        return getFirestore(this.app)
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
        // @ts-ignore
        this.$toast.error(e)
      }
    }
  })
</script>
