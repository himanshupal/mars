<template>
  <div id="services" class="flex flex-col gap-6 text-center py-10">
    <!-- General Services -->
    <div class="text-xl">Our Services</div>

    <div v-if="generalServices" class="text-4xl font-bold">
      IT Solutions for startup &amp; enterprises
    </div>

    <div
      v-if="generalServices"
      class="flex gap-10 justify-evenly pt-5 flex-wrap px-10"
    >
      <div
        v-for="(service, index) in generalServices"
        :key="`general-service-${index + 1}`"
        class="bg-white text-gray-900 font-semibold p-6 pb-4 w-72 flex flex-col items-center justify-between shadow-2xl transform hover:scale-105 transition-all duration-500 border-2 border-gray-800 hover:border-transparent rounded-md"
      >
        <div
          class="rounded-full flex items-center justify-center shadow-lg p-6"
        >
          <img
            loading="lazy"
            width="56"
            :src="require(`@/assets/icons/${service.image}.svg`)"
            :alt="`icon-${service.image}`"
          />
        </div>

        <NuxtLink :to="service.link">
          <div class="text-2xl font-bold text-gray-900 text-center pt-4 pb-1">
            {{ service.title }}
          </div>
        </NuxtLink>

        <div class="text-sm text-center">
          {{ service.text }}
        </div>

        <NuxtLink :to="service.link" class="text-xs pt-1">
          Know More
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="generalServices && tailoredServices"
      class="flex items-center justify-center"
    >
      <img
        loading="lazy"
        class="h-96"
        src="@/assets/images/web-design.svg"
        alt="Web Design Image"
      />
    </div>

    <!-- Tailored Services -->
    <div v-if="generalServices && tailoredServices" class="text-xl">
      We also provide
    </div>
    <div v-if="tailoredServices" class="text-4xl font-bold">
      Tailored IT services that respects your needs
    </div>

    <div
      v-if="tailoredServices"
      class="flex gap-10 justify-evenly pt-5 flex-wrap px-10"
    >
      <div
        v-for="(service, index) in tailoredServices"
        :key="`tailored-service-${index + 1}`"
        class="text-white p-6 pb-4 w-64 h-64 flex flex-col items-center justify-between shadow-lg transform border-2 border-gray-800 hover:bg-gray-800 hover:scale-105 transition-all duration-500 rounded-md"
      >
        <div
          class="rounded-full flex items-center justify-center shadow-lg p-6 hover:bg-gray-700"
        >
          <img
            loading="lazy"
            width="40"
            :src="require(`@/assets/icons/${service.image}.svg`)"
            :alt="`icon-${service.image}`"
          />
        </div>

        <div
          class="text-2xl font-semibold text-center pt-4 pb-1 flex flex-grow items-center"
        >
          {{ service.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { PropsModel } from '@/models/PropsModel'

  export default Vue.extend({
    name: 'Services',

    props: {
      generalServices: {
        type: Array,
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
      },
      tailoredServices: {
        type: Array,
        validator(v: Array<PropsModel>) {
          return v.every(
            (x) =>
              typeof x === 'object' &&
              Object.keys(x).includes('title') &&
              Object.keys(x).includes('image')
          )
        }
      }
    }
  })
</script>
