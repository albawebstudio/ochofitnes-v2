<script setup lang="ts">
// Add page meta to ensure this route is properly registered
import QRCode from "~/components/common/QRCode.vue";

definePageMeta({
  layout: "default",
});

import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";

const route = useRoute();
const { locale } = useI18n();
const qrCodeRef = ref<HTMLElement | null>(null)

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
      const contentPath = `/${currentLocale}/newsletter/${year}/${id}`;
      const fallbackPath = `/en/newsletter/${year}/${id}`;

      const found =
          (await queryCollection("newsletter")
              .where("path", "=", contentPath)
              .first()) ||
          (currentLocale !== "en"
              ? await queryCollection("newsletter").where("path", "=", fallbackPath).first()
              : null);

      if (!found) return null;
      return found;
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

onMounted(() => {
  if (qrCodeRef.value) {
    qrCodeRef.value.addEventListener('codeRendered', () => {
      if (qrCodeRef.value) {
        // Type assertion for the custom method
        (qrCodeRef.value as any).animateQRCode('MaterializeIn')
      }
    })
  }
})
</script>

<template>
  <section :id="'article-' + year + '-' + id" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-gray-100 dark:bg-black px-4">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white">{{ article?.title }}</h1>
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

      <QRCode
          contents="https://wa.me/qr/ZDQNX3FAJV3AC1"
          module-color="#25D366"
          position-ring-color="#075E54"
          position-center-color="#25D366"
          width="300px"
          height="300px"
          margin="0 auto"
          animate
      />

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
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}
:deep(th), :deep(td) {
  border: 1px solid #333;
  padding: 10px;
  text-align: left;
}
:deep(th) {
  background-color: #4fa3d1;
  color: #fff;
}
:deep(.section-title) {
  background-color: #e6f3fb;
  font-weight: bold;
}
:deep(caption) {
  caption-side: top;
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
  text-align: left;
}
</style>
