<template>
  <div class="flex flex-col gap-6 py-10">
    <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">CEO Speaks</div>

    <div class="flex flex-wrap">
      <div
        class="text-white px-10 lg:px-24 font-semibold rounded-xl pb-4 flex flex-col md:flex-row items-center md:items-start lg:items-end"
      >
        <div
          class="rounded-br-3xl rounded-tr-xl rounded-bl-xl rounded-tl-3xl md:rounded-bl-none md:rounded-tl-none flex items-center justify-center shadow-lg p-6 md:pl-0 mr-4 flex-grow w-4/5 sm:w-2/3 md:w-1/3"
        >
          <img
            loading="lazy"
            class="rounded-br-2xl rounded-tr-xl rounded-bl-xl rounded-tl-2xl md:rounded-bl-none md:rounded-tl-none object-cover"
            :src="require(`@/assets/images/${founder.avatar}`)"
            :alt="`${founder.name}`"
          />
        </div>
        <div class="py-3 md:w-2/3 lg:pr-24 xl:pr-48">
          <div class="text-sm sm:text-base pb-4 font-light">
            {{ founder.message }}
          </div>
          <div class="text-xl">
            {{ founder.name }}
          </div>
          <span class="text-xs font-light">
            {{ founder.designation }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Member } from '@/models/Member'

  export default Vue.extend({
    name: 'Founder',

    computed: {
      founder(): Member {
        return this.$store.state.members.founder
      }
    }
  })
</script>
