<template>
  <div class="bg-gray-900 text-white">
    <Carousel :slides="slides" />
    <div class="text-4xl my-16 sm:my-24 px-10 lg:px-20 font-semibold">
      We provide online &amp; offline trainings for various IT &amp; non IT
      courses
    </div>
    <div
      class="flex flex-col lg:flex-row w-full px-8 lg:px-16 gap-10 items-center lg:items-start"
    >
      <div class="flex flex-col lg:w-2/3 w-full">
        <div class="text-2xl pb-10">Trainings we offer</div>
        <div class="flex flex-wrap gap-y-5 gap-x-5">
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
            placeholder="John Doe"
            v-model.trim="form.name"
          />

          <label class="block py-2" for="email">
            E-Mail Address
          </label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="email"
            name="email"
            required
            placeholder="johndoe@email.com"
            v-model.trim="form.email"
          />

          <label class="block py-2" for="mobile">
            Mobile Number
          </label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="mobile"
            required
            placeholder="+XX-XXX-XXX-XXXX"
            v-model.trim="form.mobile"
          />

          <label class="block py-2" for="city">Location</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="city"
            required
            placeholder="Where are you from ?"
            v-model.trim="form.location"
          />

          <label class="block py-2" for="course">Course</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="course"
            required
            placeholder="Your college course and joining year"
            v-model.trim="form.course"
          />

          <label class="block py-2" for="semester">Semester</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="semester"
            required
            placeholder="Your current and remaining semesters"
            v-model.trim="form.semester"
          />

          <label class="block py-2" for="college">College</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="college"
            required
            placeholder="College name"
            v-model.trim="form.location"
          />

          <label class="block py-2" for="enquiry">Enquiring for</label>
          <input
            class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
            type="text"
            name="enquiry"
            required
            :disabled="trainingSelected"
            placeholder="What do you want to learn about ?"
            v-model.trim="form.enquiryFor"
          />

          <label class="block py-2" for="subject">
            Message
          </label>
          <textarea
            class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
            name="message"
            rows="3"
            placeholder="Have any query or message for us..."
            v-model.trim="form.message"
          />

          <button
            type="submit"
            class="mt-7 mb-5 py-1.5 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Training } from 'models/Training'

  export default Vue.extend({
    name: 'Training',

    data(): Training {
      return {
        trainingSelected: false,

        slides: [
          {
            title: 'Data Science live training',
            image: 'https://picsum.photos/1366/350?random=1&grayscale&blur'
          },
          {
            title: 'Machine Learning on demand lectures',
            image: 'https://picsum.photos/1366/350?random=2&grayscale&blur'
          },
          {
            title: 'System Design & Development',
            image: 'https://picsum.photos/1366/350?random=3&grayscale&blur'
          },
          {
            title: 'DevOps & Agile Lifecycle',
            image: 'https://picsum.photos/1366/350?random=4&grayscale&blur'
          },
          {
            title: 'System Administration Lectures',
            image: 'https://picsum.photos/1366/350?random=5&grayscale&blur'
          }
        ],

        trainings: [
          {
            title: 'IT Course 1',
            duration: '2 Months',
            description:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique inventore pariatur tempora harum saepe! At temporibus eligendi natus deleniti aliquid iste pariatur quaerat? Rerum blanditiis.',
            cost: 2_599
          },
          {
            title: 'IT Course 2',
            description:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique inventore pariatur tempora harum saepe! At temporibus eligendi natus deleniti aliquid iste pariatur quaerat? Rerum blanditiis corrupti beatae pariatur odit, ipsa reiciendis fuga.',
            cost: 1_570
          },
          {
            title: 'IT Course 3',
            duration: '9 Months',
            description:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique inventore pariatur tempora harum saepe! At temporibus eligendi natus deleniti aliquid iste pariatur quaerat? Rerum blanditiis corrupti beatae pariatur odit, ipsa reiciendis fuga ab animi accusamus eum tempora placeat, dicta incidunt eius, nemo officiis veritatis! Necessitatibus.',
            cost: 3_000
          }
        ],

        form: {
          name: '',
          email: '',
          mobile: '',
          location: '',
          message: '',
          course: '',
          semester: '',
          college: '',
          enquiryFor: ''
        }
      }
    },

    methods: {
      submitForm() {
        console.log(this.form)
      },
      focusForm(training: number) {
        this.trainingSelected = true
        this.form.enquiryFor = this.trainings[training].title
        const form = this.$refs?.form as HTMLElement
        form.focus()
      }
    }
  })
</script>
