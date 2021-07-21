<template>
  <div class="flex flex-col bg-gray-900 text-white py-10">
    <div class="text-4xl sm:text-5xl pt-5 px-10 lg:px-24 font-bold pb-10">
      Website Development
    </div>
    <div class="flex flex-col-reverse md:flex-row px-10 lg:px-24">
      <div v-if="!carousel || wide" class="w-1/2 flex p-5">Section1</div>
      <div v-if="!carousel || wide" class="md:w-1/2 flex">
        <img
          v-if="!wide"
          class="h-56 sm:h-72 md:h-96 w-full object-cover"
          src="https://picsum.photos/500/500?grayscale&random=1"
          alt="Website-Cover-1"
        />
        <Flicking v-if="wide && carousel" :options="options" :plugins="plugins">
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
      <div v-if="carousel && !wide" class="w-full sm:w-2/3 p-5">
        section text
      </div>
      <div v-if="carousel && !wide" class="w-full md:w-72">
        <Flicking :options="options" :plugins="plugins">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex items-center justify-center"
          >
            <!-- :src="require(`@/assets/images/${image}`)" -->
            <img
              class="h-72 w-72 object-cover"
              :src="image"
              :alt="`ws-cover-${index + 1}`"
            />
          </div>
        </Flicking>
      </div>
    </div>
    <div
      v-if="!carousel || wide"
      class="flex flex-col md:flex-row px-10 lg:px-24"
    >
      <div class="md:w-1/2 flex bg-gray-800">
        <img
          class="h-56 sm:h-72 md:h-96 w-full object-cover"
          src="https://picsum.photos/500/500?grayscale&random=2"
          alt="Website-Cover-2"
        />
      </div>
      <div class="w-1/2 flex p-5">Section2</div>
    </div>
    <div class="text-4xl font-light text-center pt-10">Need a Quote?</div>
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
    },

    mounted() {
      this.carousel = this.$route.query.hasOwnProperty('carousel')
      this.wide = this.$route.query.hasOwnProperty('wide')
    }
  })
</script>
