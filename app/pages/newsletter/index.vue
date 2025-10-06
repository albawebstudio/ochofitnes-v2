<script setup lang="ts">
definePageMeta({
  layout: "default",
});
import { useNewsletterData } from "~/composables/useNewsletterData";

const { newsletter } = useNewsletterData();
const { locale } = useI18n();

// Updated locale mapping to handle both formats
const localeMap: Record<string, string> = {
  'en': 'en',
  'en-US': 'en',
  'es': 'es',
  'es-MX': 'es'  // Add this mapping
};

const currentLocale = localeMap[locale.value as string] || 'en';

// Use localePath for generating links
const localePath = useLocalePath();

// Update the content query to handle both path formats
const { data: newsletters } = await useAsyncData(
    `newsletters-${currentLocale}`,
    async () => {
      try {
        // Try the content path first with the new folder structure
        const results = await queryContent(`/${currentLocale}/newsletter`)
            .where({ _path: { $ne: `/${currentLocale}/newsletter` } }) // exclude index.md if present
            .sort({ published_date: -1 }) // newest → oldest
            .find();

        if (results && results.length > 0) {
          return results;
        }

        // Fallback to the old path structure
        return await queryContent(`/newsletter/${currentLocale}`)
            .where({ _path: { $ne: `/newsletter/${currentLocale}` } }) // exclude index.md if present
            .sort({ published_date: -1 }) // newest → oldest
            .find();
      } catch (err) {
        console.warn(`Failed to fetch newsletter content: ${err}`);
        return [];
      }
    }
);

// Function to convert content paths to route paths
function getRoutePath(contentPath: string) {
  // Extract year and id from the content path
  const parts = contentPath.split('/');
  const yearAndId = parts.slice(-2);

  if (yearAndId.length === 2) {
    // Create the route path for newsletter articles
    return `/newsletter/${yearAndId[0]}/${yearAndId[1]}`;
  }

  // Fallback to the original path if we can't extract the pattern
  return contentPath;
}
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900 pb-24">
    <div class="w-full pb-40 pt-20 bg-white dark:bg-black px-4">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white">{{ newsletter.title }}</h1>
    </div>
    <div class="max-w-7xl bg-white rounded-3xl shadow-md -mt-20 mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="item in newsletters" :key="item._path" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg aspect-square" :src="`/newsletter/${item.image}`" alt="" />
        </a>
        <div class="p-5">
          <!-- Use localePath with the converted route path -->
          <NuxtLink :to="localePath(getRoutePath(item._path))">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title }}</h5>
          </NuxtLink>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.description }}</p>
          <!-- Use localePath with the converted route path -->
          <NuxtLink :to="localePath(getRoutePath(item._path))" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ newsletter.cta }}
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
