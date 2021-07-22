<template>
  <div class="bg-gray-900 text-white">
    <Hero />
    <Services
      :generalServices="services.generalServices"
      :tailoredServices="services.tailoredServices"
    />
    <Features :info="features.info" :features="features.list" />
    <Testimonials :title="testimonials.title" :slides="testimonials.list" />
    <Portfolio :info="portfolio.info" :products="portfolio.list" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Homepage',

    computed: {
      portfolio() {
        return this.$store.state.portfolio
      },
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
