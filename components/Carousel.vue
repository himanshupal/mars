<template>
  <Flicking class="w-full h-72 md:h-80" :options="options" :plugins="plugins">
    <div
      v-for="(slide, index) in slides"
      :key="`slide-${index + 1}`"
      class="flex w-full h-full relative items-center px-6 sm:px-10 lg:px-24"
    >
      <img
        class="h-full w-full object-cover absolute top-0 left-0"
        style="z-index: -1;"
        :src="slide.image"
      />
      <div class="text-4xl lg:text-5xl font-bold w-80">
        {{ slide.title }}
      </div>
    </div>
    <span slot="viewport" class="flicking-pagination" />
  </Flicking>
</template>

<script lang="ts">
  import { FlickingOptions } from '@egjs/flicking'
  import { AutoPlay, Pagination } from '@egjs/flicking-plugins'

  import Vue from 'vue'

  interface Training {
    options: FlickingOptions
    plugins: Array<any>
  }

  export default Vue.extend({
    name: 'Carousel',

    props: {
      slides: { type: Array, required: true }
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
          new Pagination({ type: 'scroll' })
        ]
      }
    }
  })
</script>
