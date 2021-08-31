<template>
  <div class="bg-gray-900 text-white">
    <div class="flex flex-col gap-6 w-full">
      <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">Open Positions</div>

      <div
        :class="[
          'flex flex-col p-10 pt-0 lg:px-24',
          { 'md:flex-row': jobs.length }
        ]"
      >
        <div
          v-if="jobs.length"
          class="flex flex-col gap-8 md:pr-6 pr-0 md:w-3/5"
        >
          <div
            v-for="(job, index) in jobs"
            :key="`job-${index + 1}`"
            class="bg-gray-800 text-white px-6 py-3 rounded-br-3xl"
          >
            <div class="text-3xl font-semibold pb-1 border-b-2">
              {{ job.title }}
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
                :disabled="outDated(index)"
                class="text-center border-2 text-gray-900 border-white bg-white rounded-full hover:text-white h-12 w-32"
                :class="
                  outDated(index) ? 'hover:bg-gray-400' : 'hover:bg-yellow-600'
                "
              >
                <div class="font-semibold">Apply</div>
                <span v-if="job.lastDate" class="text-xs font-light">
                  by
                  {{
                    Intl.DateTimeFormat('en-IN').format(new Date(job.lastDate))
                  }}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          We are sorry to inform you that currently there are no jobs available.
          <br />
          However you can still apply &amp; we will contact you if found a
          suitable job matching your description in future.
        </div>
        <div
          :class="[
            'flex flex-col gap-4 sm:w-3/5 md:w-2/5 pl-0 pt-10',
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
              class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
              type="text"
              name="name"
              required
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

            <label class="block py-2" for="position">Applying for</label>
            <input
              class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
              type="text"
              name="position"
              required
              @keypress="charsOnly"
              :disabled="jobs.length"
              :placeholder="applicationForPlaceholder"
              v-model.trim="position"
            />

            <label class="block py-2" for="experience">
              Experience <span class="text-xs">(in months)</span>
            </label>
            <input
              class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900"
              type="number"
              name="experience"
              required
              min="0"
              max="960"
              @keypress="numericOnly"
              v-model.trim="experience"
            />

            <label class="block py-2" for="message">
              Message
            </label>
            <textarea
              class="order-r-8 w-full px-3 py-2 rounded-sm text-gray-900"
              name="message"
              rows="3"
              placeholder="Any message for the recruiter..."
              v-model.trim="message"
            />

            <label class="block py-2" for="cv">
              Resume / CV
            </label>
            <input
              ref="cv"
              type="file"
              hidden
              accept="image/jpeg,image/png,application/pdf,application/msword"
              @change="imageSelect"
            />
            <input
              class="order-r-8 w-full h-9 py-2 px-3 rounded-sm text-gray-900 cursor-pointer"
              :class="{ 'text-center': !cvName }"
              readonly
              name="cv"
              @click="$refs.cv.click()"
              placeholder="Upload Resume"
              :value="cvName"
            />

            <button
              type="submit"
              class="mt-7 mb-5 py-1.5 px-6 border-2 rounded-sm w-full hover:bg-white hover:text-gray-800 transition-all text-lg focus-within:bg-white focus-within:text-gray-800 font-semibold"
            >
              Submit
            </button>

            <div v-if="submissionId" class="text-xs text-center">
              Your application has been submitted.
              <br />
              <code>{{ this.submissionId }}</code>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validation from '@/mixins/validation'
  import computed from '@/mixins/computed'
  import {
    addDoc,
    collection,
    Firestore,
    getDocs,
    getFirestore
  } from '@firebase/firestore'
  import { FirebaseApp, initializeApp } from '@firebase/app'
  import {
    ref,
    getStorage,
    FirebaseStorage,
    uploadBytes
  } from '@firebase/storage'

  interface CareerData {
    jobs: Array<Record<string, string>>
    app: FirebaseApp

    jobSelected: boolean
    mobileError: string

    name: string
    email: string
    mobile: string
    location: string
    position: string
    experience: number
    message: string

    cvName: string
    cv: Blob | ArrayBuffer | Uint8Array

    submissionId: string
  }

  export default Vue.extend({
    name: 'CareersPage',

    mixins: [validation, computed],

    data(): CareerData {
      return {
        mobileError: '',

        jobSelected: false,

        jobs: [],

        app: initializeApp({
          apiKey: this.$config.apiKey,
          authDomain: this.$config.authDomain,
          projectId: this.$config.projectId,
          storageBucket: this.$config.storageBucket,
          messagingSenderId: this.$config.messagingSenderId,
          appId: this.$config.appId,
          measurementId: this.$config.measurementId
        }),

        name: '',
        email: '',
        mobile: '',
        location: '',
        position: '',
        experience: 0,
        message: '',

        cvName: '',
        cv: new ArrayBuffer(0),

        submissionId: ''
      }
    },

    computed: {
      applicationForPlaceholder(): string {
        if (this.jobs.length) return 'Please select one from the jobs list'
        return 'E.g. Human Resources'
      },
      fireStore(): Firestore {
        return getFirestore(this.app)
      },
      storage(): FirebaseStorage {
        return getStorage(this.app)
      }
    },

    methods: {
      outDated(index: number) {
        const lastDate: string = this.jobs[index].lastDate
        if (lastDate) {
          if (new Date(lastDate) < new Date()) {
            return true
          }
        }
        return false
      },

      imageSelect(e: any) {
        if (e.target.files.length) {
          const [file] = e.target.files

          this.cvName = file.name
          this.cv = file
        }
      },

      async submitForm(): Promise<void> {
        this.$toast.info('Please wait...')

        const storagePath = `job_applications/${this.cvName}`

        try {
          const { metadata } = await uploadBytes(
            ref(this.storage, storagePath),
            this.cv
          )

          const { id } = await addDoc(
            collection(this.fireStore, 'job_applications'),
            {
              name: this.name,
              email: this.email,
              mobile: this.mobile,
              location: this.location,
              position: this.position,
              experience: this.experience,
              message: this.message,
              cv: metadata.fullPath,
              appliedAt: Date.now()
            }
          )

          this.$toast.success('Application Sent!')
          this.submissionId = id

          this.name = ''
          this.email = ''
          this.mobile = ''
          this.location = ''
          this.position = ''
          this.experience = 0
          this.message = ''
        } catch (e) {
          console.error(e)
        }
      },

      focusForm(job: number): void {
        this.jobSelected = true

        this.position = this.jobs[job].title

        const form = this.$refs?.form as HTMLElement
        form.focus()
      },

      validateContact(e: InputEvent): void {
        if (/([6-9][\d]{9})+/.test(this.mobile)) this.mobileError = ''
        else this.mobileError = 'First digit of mobile must be between 6 & 9'
      }
    },

    async mounted() {
      try {
        const docs = await getDocs(collection(this.fireStore, 'jobs'))
        docs.forEach((doc) => {
          this.jobs = [...this.jobs, { id: doc.id, ...doc.data() }]
        })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
