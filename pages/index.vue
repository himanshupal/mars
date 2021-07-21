<template>
  <div class="bg-gray-900 text-white">
    <Hero />
    <Services />
    <Features />
    <Testimonials
      :title="'Customer Testimonials'"
      :slides="[
        {
          text:
            'Veniam reprehenderit soluta temporibus ad exercitationem iste totam cumque corporis molestiae ex, et cupiditate voluptate. Eum, quibusdam modi? Laudantium pariatur, nihil error magni nam enim quisquam magnam eveniet explicabo repellat nobis ad consequatur vel dolorem, nisi deserunt eius, beatae iusto consectetur debitis velit.',
          name: 'Customer One',
          about: 'Developer, XYZ Company',
          image: 'https://picsum.photos/200/200?grayscale&random=1'
        },
        {
          text:
            'Veniam reprehenderit soluta temporibus ad exercitationem iste totam cumque corporis molestiae ex, et cupiditate voluptate. Eum, quibusdam modi? Laudantium pariatur, nihil error magni nam enim quisquam magnam eveniet explicabo repellat nobis ad consequatur vel dolorem, nisi deserunt eius, beatae iusto consectetur debitis velit.',
          name: 'Customer Two',
          about: 'Instructor, ABC School',
          image: 'https://picsum.photos/200/200?grayscale&random=2'
        },
        {
          text:
            'Veniam reprehenderit soluta temporibus ad exercitationem iste totam cumque corporis molestiae ex, et cupiditate voluptate. Eum, quibusdam modi? Laudantium pariatur, nihil error magni nam enim quisquam magnam eveniet explicabo repellat nobis ad consequatur vel dolorem, nisi deserunt eius, beatae iusto consectetur debitis velit.',
          name: 'Customer Three',
          about: 'Customer, XYZ College',
          image: 'https://picsum.photos/200/200?grayscale&random=3'
        }
      ]"
    />
    <Portfolio />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Homepage'
  })
</script>
