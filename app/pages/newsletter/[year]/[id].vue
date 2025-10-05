<script setup lang="ts">
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
const lang = route.params.lang as string; // Get language from route
const year = route.params.year as string;
const id = route.params.id as string;

// Use the language from the route if available, otherwise use the current locale
const contentLocale = lang || currentLocale;

const { data: article, error } = await useAsyncData(
    `article-${contentLocale}-${year}-${id}`,
    () =>
        queryContent(`/newsletter/${contentLocale}/${year}/${id}`).findOne()
);

// Optional: handle missing content
if (error.value || !article.value) {
  console.warn(
      `Newsletter not found for ${contentLocale}/${year}/${id}`
  );
}

function formatDate(dateString: string) {
  const localeMap: Record<string, Locale> = {
    en: enUS,
    es: es
  };

  // Use the computed contentLocale
  const dfLocale = localeMap[contentLocale] || enUS; // fallback to English

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
          :src="`/newsletter/${article?.image}`"
          class="max-w-3xl rounded-2xl"
          :alt="`image for ${article?.title} article`"
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
    </div>
  </section>
</template>

<style scoped>
.container p {

}
</style>
