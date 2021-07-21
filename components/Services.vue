<template>
  <div id="services" class="flex flex-col gap-6 text-center py-10">
    <!-- General Services -->
    <div class="text-xl">Our Services</div>
    <div class="text-4xl font-bold">
      IT Solutions for startup &amp; enterprises
    </div>
    <div class="flex gap-10 justify-evenly pt-5 flex-wrap px-10">
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
            :src="require(`@/assets/icons/${service.icon}.svg`)"
            :alt="`icon-${service.icon}`"
          />
        </div>
        <NuxtLink :to="service.path">
          <div class="text-2xl font-bold text-gray-900 text-center pt-4 pb-1">
            {{ service.title }}
          </div>
        </NuxtLink>
        <div class="text-sm text-center">
          {{ service.text }}
        </div>
        <NuxtLink :to="service.path" class="text-xs pt-1">
          Know More
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center justify-center">
      <img
        loading="lazy"
        class="h-96"
        src="@/assets/images/web-design.svg"
        alt="Web Design Image"
      />
    </div>

    <!-- Tailored Services -->
    <div class="text-xl">We also provide</div>
    <div class="text-4xl font-bold">
      Tailored IT services that respects your needs
    </div>
    <div class="flex gap-10 justify-evenly pt-5 flex-wrap px-10">
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
            :src="require(`@/assets/icons/${service.icon}.svg`)"
            :alt="`icon-${service.icon}`"
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
  import { Services } from 'models/Services'

  export default Vue.extend({
    name: 'Services',

    data(): Services {
      return {
        generalServices: [
          {
            title: 'Website Development',
            text:
              'Need a cool website for your business ? \n Let us join you on your journey to success',
            icon: 'shield',
            path: '/services/website'
          },
          {
            title: 'Web App Development',
            text:
              'When your business requires a customised application accessible globally over internet',
            icon: 'web',
            path: '/services/webapp'
          },
          {
            title: 'Desktop App Development',
            text:
              'Secure desktop app development using cutting edge technogies for faster & safer access',
            icon: 'server',
            path: '/services/desktop'
          }
        ],

        tailoredServices: [
          {
            title: 'Education & Health',
            icon: 'shield'
          },
          {
            title: 'Retail & Commerce',
            icon: 'web'
          },
          {
            title: 'Training Services',
            icon: 'server'
          },
          {
            title: 'Travel & Hospitality',
            icon: 'server'
          }
        ]
      }
    }
  })
</script>
