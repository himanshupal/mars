<template>
  <div class="flex flex-col gap-6 text-center py-10">
    <div class="text-4xl">Why choose us?</div>
    <div class="text-sm font-light px-4 max-w-sm mx-auto">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      repudiandae dolorem perspiciatis assumenda perferendis deserunt.
    </div>
    <div class="flex gap-10 justify-evenly pt-5 flex-wrap px-10">
      <div
        v-for="(feature, index) in features"
        :key="`feature-${index + 1}`"
        class="text-white p-6 pb-4 w-64 flex flex-col items-center justify-between shadow-lg transform border-2 border-gray-800 hover:bg-gray-800 hover:scale-105 transition-all duration-500 rounded-md"
      >
        <div
          class="rounded-full flex items-center justify-center shadow-lg p-6 hover:bg-gray-700"
        >
          <img
            loading="lazy"
            width="40"
            :src="require(`@/assets/icons/${feature.icon}.svg`)"
            :alt="`icon-${feature.icon}`"
          />
        </div>
        <div class="text-2xl font-semibold text-center pt-4 pb-1">
          {{ feature.title }}
        </div>
        <div class="text-sm text-center font-light">
          {{ feature.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Features } from 'models/Features'

  export default Vue.extend({
    name: 'Features',

    data(): Features {
      return {
        features: [
          {
            title: 'Great Support',
            icon: 'shield',
            text:
              'Mars brings the power of artificial intelligence & data science to every business'
          },
          {
            title: 'Professional Service',
            icon: 'web',
            text:
              'Mars brings the power of artificial intelligence & data science to every business'
          },
          {
            title: 'Expert Technicians',
            icon: 'server',
            text:
              'Mars brings the power of artificial intelligence & data science to every business'
          },
          {
            title: 'Professional Service',
            icon: 'web',
            text:
              'Mars brings the power of artificial intelligence & data science to every business'
          }
        ]
      }
    }
  })
</script>
