<template>
  <div class="flex flex-col bg-gray-900 text-white py-10">
    <div class="text-5xl pt-5 px-10 lg:px-24 font-bold">About Us</div>
    <div class="py-5 px-10 lg:px-24 text-sm font-light sm:w-4/5">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad minus iusto
      quae pariatur excepturi, ratione debitis. Corrupti rem impedit praesentium
      ipsam odit itaque recusandae quibusdam beatae, blanditiis sapiente omnis
      perspiciatis officiis placeat quasi mollitia, ea numquam quam in, natus
      obcaecati. Veniam reprehenderit soluta temporibus ad exercitationem iste
      totam cumque corporis molestiae ex, et cupiditate voluptate. Eum,
      quibusdam modi? Laudantium pariatur, nihil error magni nam enim quisquam
      magnam eveniet explicabo repellat nobis ad consequatur vel dolorem, nisi
      deserunt eius, beatae iusto consectetur debitis velit. Tempora recusandae
      porro aliquam minus aliquid dolorem ullam ut voluptas odio error eligendi
      id hic blanditiis non ab itaque, perferendis officiis incidunt, quo
      accusamus? Molestiae doloremque vero, dignissimos beatae odio optio amet.
    </div>
    <Features :info="features.info" :features="features.list" />
    <!-- <Members /> -->
    <Founder />
    <Portfolio />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'AboutPage',

    computed: {
      features() {
        return this.$store.state.features
      },
      founder() {
        return this.$store.state.members.founder
      }
    }
  })
</script>
