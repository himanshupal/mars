<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">Open Positions</div>

    <div
      :class="[
        'flex flex-col p-10 pt-0 lg:px-24',
        { 'md:flex-row': jobs.length }
      ]"
    >
      <div v-if="jobs.length" class="flex flex-col gap-8 md:pr-6 pr-0 md:w-3/5">
        <div
          v-for="(job, index) in jobs"
          :key="`job-${index + 1}`"
          class="bg-gray-800 text-white px-6 py-3 rounded-br-3xl"
        >
          <div class="text-3xl font-semibold pb-1 border-b-2">
            {{ job.designation }}
          </div>
          <div class="text-sm py-3 leading-snug text-justify">
            {{ job.description }}
          </div>
          <div class="flex justify-between text-sm items-center">
            <div class="text-lg">
              <span v-if="job.location">{{ job.location }}</span>
              <span v-if="job.location && job.vacancies">/</span>
              <span v-if="job.vacancies">
                {{ job.vacancies }} Open position(s)
              </span>
            </div>
            <button
              @click="focusForm(index)"
              class="text-center border-2 text-gray-900 border-white bg-white hover:bg-yellow-600 rounded-full hover:text-white h-12 w-32"
            >
              <div class="font-semibold">Apply</div>
              <span v-if="job.applyBy" class="text-xs font-light">
                by {{ job.applyBy }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        We are sorry to inform you but currently there are no jobs available.
        <br />
        You may however still apply &amp; we contact you in future if found a
        suitable job matching your description.
      </div>
      <div
        :class="[
          'flex flex-col gap-4 md:w-2/5 pl-0 pt-10',
          { 'md:pt-0 md:pl-6': jobs.length }
        ]"
      >
        <div class="text-4xl font-semibold">
          Apply Now
        </div>
        <form
          @submit.prevent="submitForm"
          class="text-white flex flex-col justify-center"
        >
          <label class="block py-2" for="name">
            Your Name
          </label>
          <input
            ref="form"
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="text"
            name="name"
            required
            placeholder="John Doe"
            v-model="form.name"
          />

          <label class="block py-2" for="email">
            E-Mail Address
          </label>
          <input
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="email"
            name="email"
            required
            placeholder="johndoe@email.com"
            v-model="form.email"
          />

          <label class="block py-2" for="mobile">
            Mobile Number
          </label>
          <input
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="text"
            name="mobile"
            required
            placeholder="+XX-XXX-XXX-XXXX"
            v-model="form.mobile"
          />

          <label class="block py-2" for="city">Location</label>
          <input
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="text"
            name="city"
            required
            placeholder="Where are you from ?"
            v-model="form.location"
          />

          <label class="block py-2" for="position">Applying for</label>
          <input
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="text"
            name="position"
            required
            :disabled="jobSelected"
            placeholder="Human Resources"
            v-model="form.position"
          />

          <label class="block py-2" for="experience"
            >Experience <span class="text-xs">(in months)</span></label
          >
          <input
            class="order-r-8 w-full h-9 px-3 rounded-sm text-gray-900"
            type="number"
            name="experience"
            required
            min="0"
            max="960"
            v-model="form.experience"
          />

          <label class="block py-2" for="message">
            Message
          </label>
          <textarea
            class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
            name="message"
            rows="3"
            placeholder="Any message for the recruiter..."
            v-model="form.message"
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
  import { Careers } from 'models/Careers'

  export default Vue.extend({
    name: 'Careers',

    data(): Careers {
      return {
        jobSelected: false,

        form: {
          name: '',
          email: '',
          contact: '',
          location: '',
          position: '',
          experience: 0,
          message: ''
        },

        jobs: [
          {
            designation: 'Human Resources',
            location: 'Remote',
            vacancies: 5,
            description:
              'We are the pioneer and leader in the online match-making business with over 4 million active members availing of our services. The service offering of the brand is in matchmaking and marriage services through websites, mobile sites, and mobile apps. The matchmaking business vertical has a network of 15 regional portals.',
            applyBy: 'July 17, 2021'
          },
          {
            designation: 'Business Development (Sales)',
            vacancies: 7,
            description:
              'The retailer stocks a wide range of sporting goods, from tennis rackets to advanced scuba diving equipment, usually in large superstores which are sized at an average of 4,000 meters. The Decathlon group also owns over 20 brands, with research and development facilities all over France to develop the latest innovative designs, registering up to 40 patients per year.'
          },
          {
            designation: 'Operations',
            location: 'Lucknow',
            description:
              'Over the last 5+ years, since starting the company, we have emerged as a clear market leader in India and are backed by the best investors with ~100M in raised capital. We are now investing deeply in our capabilities across technology, training, supply, etc., to literally introduce India to a branded service experience, and in the process creating hundreds of thousands of jobs for the service sector.',
            applyBy: 'March 1, 2021'
          }
        ]
      }
    },

    methods: {
      submitForm() {
        console.log(this.form)
      },
      focusForm(job: number) {
        this.jobSelected = true
        this.form.position = this.jobs[job].designation
        const form = this.$refs?.form as HTMLElement
        form.focus()
      }
    }
  })
</script>
