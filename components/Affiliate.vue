<template>
  <div
    v-if="products.length"
    class="flex flex-col text-center text-white gap-6 py-10 px-4 md:px-10 bg-gray-800"
  >
    <div class="text-4xl font-bold">Affiliate Products</div>

    <div class="flex flex-wrap justify-center text-center gap-6 items-center">
      <a
        v-for="(product, index) in products"
        :key="`product-${index + 1}`"
        :href="product.url"
        target="_blank"
      >
        <img class="rounded-lg" :src="product.image" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  interface Product {
    url?: string
    image?: string
  }

  interface AffiliateData {
    products: Array<Product>
  }

  export default Vue.extend({
    name: 'Affiliate',

    data(): AffiliateData {
      return {
        products: []
      }
    },

    async mounted() {
      try {
        // Google Sheet Public URL
        const sheetId = `1fPppdeQ_-yPsc30qwKxrK37LdwIU83RGw6cHstZJ4UI`

        const { data } = await this.$axios.get(
          `https://spreadsheets.google.com/feeds/cells/${sheetId}/1/public/full?alt=json`
        )

        let product: Product = {}

        data.feed.entry
          .map(
            ({ content }: Record<string, Record<string, string>>) =>
              content['$t']
          )
          .forEach((item: string) => {
            if (product.hasOwnProperty('url')) {
              product = { ...product, image: item }
              this.products.push(product)
              product = {}
            } else {
              product = { url: item }
            }
          })
      } catch (e) {
        console.error(e)
      }
    }
  })
</script>
