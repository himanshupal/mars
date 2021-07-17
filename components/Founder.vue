<template>
  <div class="flex flex-col gap-6 py-10">
    <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">Founder's Message</div>
    <div class="flex flex-wrap">
      <div
        class="text-white px-10 lg:px-24 font-semibold rounded-xl pb-4 flex flex-col md:flex-row items-center md:items-start lg:items-end"
      >
        <div
          class="rounded-br-3xl rounded-tr-xl flex items-center justify-center shadow-lg p-6 md:pl-0 mr-4 flex-grow w-4/5 sm:w-2/3 md:w-1/3"
        >
          <img
            loading="lazy"
            class="rounded-br-2xl rounded-tr-xl object-cover"
            :src="require(`@/assets/images/${members[0].avatar}`)"
            :alt="`${members[0].name}`"
          />
        </div>
        <div class="py-3 md:w-2/3 text-justify md:text-left lg:pr-24 xl:pr-48">
          <div class="pb-4 font-light">
            {{ members[0].message }}
          </div>

          <div class="text-lg">
            {{ members[0].name }}
          </div>

          <span class="text-xs font-light">
            {{ members[0].designation }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { FlickingOptions } from '@egjs/flicking'
  import Vue from 'vue'
  import { Members } from '~/models/Members'

  export default Vue.extend({
    name: 'Members',

    data(): Members {
      return {
        members: [
          {
            name: 'Ritik Verma',
            designation: 'Founder & CEO',
            avatar: 'ritik.jpeg',
            message:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi explicabo quo esse eius veritatis repellendus quisquam accusamus cupiditate, minus animi eveniet aut id voluptas nihil beatae distinctio rem? Fuga, reiciendis. cing elit. Excepturi explicabo quo esse eius veritatis repellendus quisquam accusamus cupiditate, minus animi eveniet aut id voluptas nihil beatae distinction.'
          }
        ]
      }
    }
  })
</script>
