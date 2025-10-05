<script setup lang="ts">
// Add page meta to ensure this route is properly registered
definePageMeta({
  layout: "default",
});

import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";

const route = useRoute();
const { locale } = useI18n();

// Updated locale mapping to handle both formats
const localeMap: Record<string, string> = {
  'en': 'en',
  'en-US': 'en',
  'es': 'es',
  'es-MX': 'es'  // Add this mapping
};

const currentLocale = localeMap[locale.value as string] || 'en';

const year = route.params.year; // "2025"
const id = route.params.id;     // "10"

// Use localePath for generating links
const localePath = useLocalePath();

// Query content using the specified structure
const { data: article, error } = await useAsyncData(
    `article-${currentLocale}-${year}-${id}`,
    async () => {
      try {
        // Use the primary content path structure: /[lang]/newsletter/[year]/[id]
        const contentPath = `/${currentLocale}/newsletter/${year}/${id}`;
        const result = await queryContent(contentPath).findOne();
        return result;
      } catch (e) {
        // If not found and not in English, try the English version as fallback
        if (currentLocale !== 'en') {
          try {
            const fallbackPath = `/en/newsletter/${year}/${id}`;
            const fallbackResult = await queryContent(fallbackPath).findOne();
            return fallbackResult;
          } catch (fallbackError) {
            console.warn(`English fallback content not found at: /en/newsletter/${year}/${id}`);
          }
        }
        console.warn(`Newsletter not found for ${currentLocale}/newsletter/${year}/${id}`);
        return null;
      }
    }
);

// Handle missing content
if (error.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Newsletter not found: ${year}/${id}`
  });
}

function formatDate(dateString: string) {
  const localeMap: Record<string, Locale> = {
    en: enUS,
    es: es
  };

  // Use the computed currentLocale from outer scope
  const dfLocale = localeMap[currentLocale] || enUS; // fallback to English

  return format(new Date(`${dateString}T00:00:00`), "MMMM yyyy", { locale: dfLocale });
}
</script>

<template>
  <section :id="'article-' + year + '-' + id" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-gray-100 dark:bg-black px-4">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white">{{ article.title }}</h1>
    </div>
    <div class="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 max-w-7xl rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10">
      <img
          :src="`/newsletter/${article.image}`"
          class="max-w-3xl rounded-2xl"
          :alt="`image for ${article.title} article`"
      />
      <div class="flex items-center justify-center gap-4 mt-7.5">
        <div class="flex w-16 h-16 rounded-full overflow-hidden">
          <NuxtImg
              :src="`/team/team-image.jpg`"
              alt="author"
          />
        </div>
        <div class="text-left">
          <h4 class="font-medium text-custom-lg text-dark mb-1">
            <em>Jovani</em>
          </h4>
          <div class="flex items-center gap-1.5">
            <p>{{ formatDate(article?.published_date) }}</p>
          </div>
        </div>
      </div>
      <ContentRenderer :value="article" class="prose lg:prose-lg dark:prose-invert max-w-5xl"/>

      <!-- Add a link back to the newsletter index using localePath -->
      <NuxtLink :to="localePath('/newsletter')" class="mt-10 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Back to Newsletter
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.container p {

}
</style>
