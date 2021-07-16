<template>
  <div class="flex flex-col gap-6 py-10 items-center">
    <div class="text-4xl">Our Portfolio</div>
    <div class="text-sm font-light px-4 max-w-sm text-center">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      repudiandae dolorem perspiciatis assumenda perferendis deserunt.
    </div>
    <div class="flex flex-wrap gap-10 px-10 pt-5 justify-evenly w-full">
      <div
        class="flex flex-col justify-between rounded-xl shadow-xl w-72 bg-white text-gray-900 pb-3"
      >
        <img
          loading="lazy"
          class="w-full h-52 rounded-t-xl object-cover"
          src="https://picsum.photos/500/500?random=1"
          alt="Product One"
        />
        <div class="text-xl py-3 px-3 font-semibold text-black">
          Product One
        </div>
        <div class="text-sm font-light py-1 px-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          corrupti in quibusdam ratione ad vel.
        </div>
        <NuxtLink
          to="/about"
          class="px-3 py-1 font-semibold text-xs text-right"
        >
          Read More
        </NuxtLink>
      </div>
      <div
        class="flex flex-col justify-between rounded-xl shadow-xl w-72 bg-white text-gray-900 pb-3"
      >
        <img
          loading="lazy"
          class="w-full h-52 rounded-t-xl object-cover"
          src="https://picsum.photos/500/500?random=2"
          alt="Product One"
        />
        <div class="text-xl py-3 px-3 font-semibold text-black">
          Product One
        </div>
        <div class="text-sm font-light py-1 px-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          corrupti in quibusdam ratione ad vel.
        </div>
        <NuxtLink
          to="/about"
          class="px-3 py-1 font-semibold text-xs text-right"
        >
          Read More
        </NuxtLink>
      </div>
      <div
        class="flex flex-col justify-between rounded-xl shadow-xl w-72 bg-white text-gray-900 pb-3"
      >
        <img
          loading="lazy"
          class="w-full h-52 rounded-t-xl object-cover"
          src="https://picsum.photos/500/500?random=3"
          alt="Product One"
        />
        <div class="text-xl py-3 px-3 font-semibold text-black">
          Product One
        </div>
        <div class="text-sm font-light py-1 px-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          corrupti in quibusdam ratione ad vel.
        </div>
        <NuxtLink
          to="/about"
          class="px-3 py-1 font-semibold text-xs text-right"
        >
          Read More
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
