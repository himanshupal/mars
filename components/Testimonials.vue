<template>
  <div>
    <div class="text-4xl font-bold text-center px-10 lg:px-24 pb-6">
      {{ title }}
    </div>

    <Flicking
      class="md:h-80 bg-shapes bg-cover py-6"
      :options="options"
      :plugins="plugins"
    >
      <div
        v-for="(slide, index) in slides"
        :key="`slide-${index + 1}`"
        class="flex flex-col md:flex-row w-full items-center justify-center px-0 sm:px-16 lg:px-24"
      >
        <img
          :src="slide.image"
          :alt="`testimonial-${index + 1}`"
          class="w-48 h-48 object-cover rounded-full"
        />
        <div
          class="flex flex-col py-6 md:py-0 md:pl-8 w-4/5 md:w-3/5 text-center md:text-left"
        >
          <div class="text-xs sm:text-sm font-light pb-3">
            {{ slide.text }}
          </div>
          <div class="font-semibold text-2xl">{{ slide.name }}</div>
          <div class="font-thin text-sm">{{ slide.about }}</div>
        </div>
      </div>
      <span slot="viewport" class="flicking-pagination" />
      <span slot="viewport" class="flicking-arrow-prev" />
      <span slot="viewport" class="flicking-arrow-next" />
    </Flicking>
  </div>
</template>

<script lang="ts">
  import { FlickingOptions } from '@egjs/flicking'
  import { Arrow, AutoPlay, Pagination } from '@egjs/flicking-plugins'
  import '@egjs/flicking-plugins/css/arrow.css'

  import Vue from 'vue'

  interface Training {
    options: FlickingOptions
    plugins: Array<any>
  }

  export default Vue.extend({
    name: 'Testimonials',

    props: {
      slides: { type: Array, required: true },
      title: String
    },

    data(): Training {
      return {
        // @ts-ignore
        options: {
          renderOnlyVisible: true,
          deceleration: 0.1,
          interruptable: true,
          circular: true
        },
        plugins: [
          new AutoPlay({ duration: 5000, stopOnHover: true }),
          new Pagination({ type: 'scroll' }),
          new Arrow({ moveByViewportSize: true })
        ]
      }
    }
  })
</script>
