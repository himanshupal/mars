<template>
  <div class="bg-gray-900 text-white">
    <Hero />
    <Services
      :generalServices="services.generalServices"
      :tailoredServices="services.tailoredServices"
    />
    <Features :info="features.info" :features="features.list" />
    <Testimonials :title="testimonials.title" :slides="testimonials.list" />
    <Portfolio />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Homepage',

    computed: {
      testimonials() {
        return this.$store.state.testimonials.customers
      },
      features() {
        return this.$store.state.features
      },
      services() {
        return this.$store.state.services
      }
    }
  })
</script>
