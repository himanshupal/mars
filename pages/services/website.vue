<template>
  <div class="flex flex-col bg-gray-900 text-white py-10">
    <div class="text-4xl sm:text-5xl pt-5 px-10 lg:px-24 font-bold pb-10">
      Website Development
    </div>
    <div class="flex flex-col-reverse md:flex-row px-10 lg:px-24">
      <div
        class="w-full md:w-1/2 md:p-5 py-12 sm:py-16 md:py-0 md:pl-0 text-2xl md:text-3xl flex items-center justify-center text-center font-light"
      >
        Getting a mobile friendly website which defines your product well is
        more important than ever for our any business to grow
      </div>
      <div class="md:w-1/2 flex">
        <Flicking :options="options" :plugins="plugins">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex items-center justify-center"
          >
            <img
              class="h-56 sm:h-72 md:h-96 w-full object-cover"
              :src="image"
              :alt="`ws-cover-${index + 1}`"
            />
          </div>
        </Flicking>
      </div>
    </div>
    <div class="flex flex-col md:flex-row px-10 lg:px-24">
      <div class="md:w-1/2 flex">
        <img
          class="h-56 sm:h-72 md:h-96 w-full object-cover"
          src="https://picsum.photos/500/500?grayscale&random=2"
          alt="Website-Cover-2"
        />
      </div>
      <div
        class="w-full md:w-1/2 flex flex-col justify-center md:p-5 pt-12 sm:pt-16"
      >
        <div class="text-4xl font-bold pb-2 mb-2 border-b">We offer</div>
        <div class="grid grid-col-1 md:grid-cols-1">
          <div class="text-sm py-1">
            Mobile first fully responsive website scalable to any number of
            pages
          </div>
          <div class="text-sm py-1">
            SPA under same cost as traditional website
          </div>
          <div class="text-sm py-1">
            E-Mail notifications on form submissions
          </div>
          <div class="text-sm py-1">
            CMS access for anytime content update
          </div>
          <div class="text-sm py-1">Free hosting in testing phase</div>
          <div class="text-sm py-1">RTC &amp; Chat-bots integration</div>
          <div class="text-sm py-1">
            Google analytics services
          </div>
          <div class="text-sm py-1">Free newsletter service</div>
          <div class="text-sm py-1">3 Months of free SEO</div>
          <div class="text-sm py-1">Best in class support</div>
          <div class="text-sm py-1">No vendor lock-in</div>
        </div>
      </div>
    </div>
    <div class="text-4xl font-light text-center pt-10">Need more details?</div>
    <NuxtLink class="text-md text-center font-light" to="/contact">
      Contact Us Now
    </NuxtLink>
  </div>
</template>

<script lang="ts">
  import { AutoPlay } from '@egjs/flicking-plugins'
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Website',

    data() {
      return {
        carousel: false,
        wide: false,
        images: [
          'https://picsum.photos/288/288?grayscale&random=1',
          'https://picsum.photos/288/288?grayscale&random=2',
          'https://picsum.photos/288/288?grayscale&random=3',
          'https://picsum.photos/288/288?grayscale&random=4',
          'https://picsum.photos/288/288?grayscale&random=5'
        ],
        options: {
          // renderOnlyVisible: true,
          deceleration: 0.1,
          interruptable: true,
          circular: true
        },
        plugins: [new AutoPlay({ duration: 5000, stopOnHover: true })]
      }
    }
  })
</script>
