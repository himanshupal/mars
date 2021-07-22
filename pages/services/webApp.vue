<template>
  <div class="flex flex-col bg-gray-900 text-white py-10">
    <div class="text-4xl sm:text-5xl pt-5 px-10 lg:px-24 font-bold pb-10">
      Web Application Development
    </div>
    <div class="flex flex-col md:flex-row px-10 lg:px-24">
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
      <div
        class="w-full md:w-1/2 md:p-5 py-12 sm:py-16 md:py-0 text-2xl md:text-3xl flex items-center justify-center font-light"
      >
        We understand that it's difficult to keep business tasks limited to
        desktop only. Growing business like yours need applications that are
        accessible on multi-devices &amp; scalable for future growth.
      </div>
    </div>
    <div class="flex flex-col-reverse md:flex-row px-10 lg:px-24">
      <div
        class="w-full md:w-1/2 flex flex-col justify-center md:p-5 pt-12 sm:pt-16 text-left md:text-right"
      >
        <div class="text-4xl font-bold pb-2 mb-2 border-b">We offer</div>
        <div class="grid grid-col-1 md:grid-cols-1">
          <div class="text-sm py-1">
            Mobile friendly applications served as PWAs accessible from any
            device
          </div>
          <div class="text-sm py-1">
            Free preview domains for testing features before adding them to
            final app
          </div>
          <div class="text-sm py-1">Custom REST / GRAPHQL / GRPC API</div>
          <div class="text-sm py-1">
            Integration with your current website
          </div>
          <div class="text-sm py-1">
            Confidential or Social login services
          </div>
          <div class="text-sm py-1">
            Server or Client side caching
          </div>
          <div class="text-sm py-1">
            Google analytics services
          </div>
          <div class="text-sm py-1">Notifications services</div>
          <div class="text-sm py-1">Best in class support</div>
          <div class="text-sm py-1">No vendor lock-in</div>
          <div class="text-sm py-1">Custom Events</div>
        </div>
      </div>
      <div class="md:w-1/2 flex">
        <img
          class="h-56 sm:h-72 md:h-96 w-full object-cover"
          src="https://picsum.photos/500/500?grayscale&random=2"
          alt="Website-Cover-2"
        />
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
    name: 'WebApp',

    data() {
      return {
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
