<template>
  <div class="flex flex-col gap-6 text-center py-10 items-center">
    <div class="text-4xl font-bold">Our Team Members</div>
    <div class="text-sm font-light px-4 max-w-sm">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      repudiandae dolorem perspiciatis assumenda perferendis deserunt.
    </div>
    <div class="flex flex-wrap justify-evenly">
      <div
        v-for="(member, index) in members"
        :key="index"
        class="text-white font-semibold rounded-xl pb-4 w-72 flex flex-col items-center justify-between"
      >
        <div
          class="rounded-br-3xl rounded-tl-xl flex items-center justify-center shadow-lg p-6"
        >
          <img
            loading="lazy"
            class="rounded-br-2xl rounded-tl-xl object-cover"
            :src="require(`@/assets/images/${member.avatar}`)"
            :alt="`${member.name}`"
          />
        </div>
        <div class="text-xl pt-4">
          {{ member.name }}
        </div>
        <span class="text-sm font-light">
          {{ member.designation }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Members } from '~/models/Members'

  export default Vue.extend({
    name: 'Members',

    data(): Members {
      return {
        members: [
          {
            name: 'Ritik Verma',
            designation: 'Founder, & CEO',
            avatar: 'ritik.jpeg'
          }
        ]
      }
    }
  })
</script>
