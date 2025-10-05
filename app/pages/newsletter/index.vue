<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const { data: newsletters } = await useAsyncData("newsletters", () =>
    queryContent("/newsletter")
        .where({ _path: { $ne: "/newsletter" } }) // exclude index.md if present
        .sort({ published_date: -1 }) // sort newest → oldest
        .find()
);
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900 pb-24">
    <div class="w-full pb-40 pt-20 bg-white dark:bg-black px-4">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white">Newsletters</h1>
    </div>
    <div class="max-w-7xl bg-white rounded-3xl shadow-md -mt-20 mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="item in newsletters" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg aspect-square" :src="`/newsletter/${item.image}`" alt="" />
        </a>
        <div class="p-5">
          <NuxtLink :to="item._path">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title }}</h5>
          </NuxtLink>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.description }}</p>
          <NuxtLink :to="item._path" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
