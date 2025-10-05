<script setup lang="ts">
definePageMeta({
  layout: "default",
});

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
const slug = route.params.slug as string;

console.log('Current locale from i18n:', locale.value);
console.log('Mapped locale:', currentLocale);
console.log('Looking for slug:', slug);

// Use a more explicit query that forces the correct path
const { data: content } = await useAsyncData(`legal-${slug}-${currentLocale}`, async () => {
  const searchPath = `/legal/${currentLocale}/${slug}`;
  console.log('Searching path:', searchPath);

  try {
    const result = await queryContent()
      .where({ _path: searchPath })
      .findOne();

    console.log('Found content for locale:', currentLocale);
    return result;
  } catch (error) {
    console.log('Failed to find content for locale:', currentLocale);

    if (currentLocale !== 'en') {
      try {
        const fallbackPath = `/legal/en/${slug}`;
        console.log('Trying fallback path:', fallbackPath);

        const fallbackResult = await queryContent()
          .where({ _path: fallbackPath })
          .findOne();

        console.log('Using English fallback');
        return fallbackResult;
      } catch (fallbackError) {
        console.log('Fallback failed too:', fallbackError);
      }
    }

    return null;
  }
});

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Content not found: ${slug}`
  });
}
</script>

<template>
  <section id="article-privacy" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-gray-100 dark:bg-black px-4">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">{{ content?.title }}</h1>
      <p class="text-center text-gray-500 dark:text-gray-300 italic">{{ content?.last_updated_at }}</p>
    </div>
    <div class="bg-white w-full sm:max-w-7xl dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10">
      <ContentRenderer :value="content" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none" />
    </div>
  </section>
</template>
