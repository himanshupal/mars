<template>
  <div class="flex flex-col text-center gap-6 py-10">
    <div class="text-4xl font-bold">Our Portfolio</div>

    <div class="text-sm font-light px-4 max-w-sm mx-auto">
      {{ info }}
    </div>

    <div class="flex flex-wrap gap-10 px-10 pt-5 justify-evenly w-full">
      <div
        v-for="(product, index) in products"
        :key="`product-${index + 1}`"
        class="flex flex-col justify-between rounded-xl shadow-xl w-72 bg-white text-gray-900 pb-3"
      >
        <img
          loading="lazy"
          class="w-full h-52 rounded-t-xl object-cover"
          :src="product.image"
          alt="External Image"
        />
        <div class="text-xl py-3 px-3 font-semibold text-black">
          {{ product.title }}
        </div>
        <div class="text-sm font-light py-1 px-3">
          {{ product.text }}
        </div>
        <a
          :href="product.link"
          class="px-3 py-1 font-semibold text-xs text-right"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { PropsModel } from '@/models/PropsModel'

  export default Vue.extend({
    name: 'Portfolio',

    props: {
      info: String,
      products: {
        type: Array,
        required: true,
        validator(v: Array<PropsModel>) {
          return v.every(
            (x) =>
              typeof x === 'object' &&
              Object.keys(x).includes('text') &&
              Object.keys(x).includes('link') &&
              Object.keys(x).includes('title') &&
              Object.keys(x).includes('image')
          )
        }
      }
    }
  })
</script>
