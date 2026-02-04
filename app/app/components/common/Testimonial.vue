<script setup lang="ts">
interface Props {
  review: {
    id: number,
    title: string | any,
    content: string | any,
    author: string,
    image: object | null
  };
}
const props = defineProps<Props>();

// Helper function to ensure we display strings properly even if objects are passed
function ensureString(value: string | any): string {
  if (typeof value === 'string') return value;

  // If it's an object, try to extract the text
  if (value && typeof value === 'object') {
    // Common message formats
    if (value.b?.s) return value.b.s;
    if (value.body?.static) return value.body.static;
    if (value.static) return value.static;
    if (value.s) return value.s;

    // Try to stringify as a last resort
    try {
      const str = JSON.stringify(value);
      // Look for typical patterns in the stringified JSON
      const matches = str.match(/"s":"([^"]+)"/) || str.match(/"static":"([^"]+)"/);
      if (matches && matches[1]) return matches[1];
    } catch (e) {
      console.error("Failed to process review data:", e);
    }
  }

  // Fallback to a placeholder
  return "Review content unavailable";
}
</script>

<template>
  <div class="keen-slider__slide">
    <blockquote
        class="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
      <div>
        <div class="flex gap-0.5 text-green-500">
          <template v-for="n in 5">
            <svg
                class="size-5"
                fill="#FF6600"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </template>
        </div>

        <div class="mt-4">
          <p class="text-2xl font-bold text-primary-600 sm:text-3xl">{{ ensureString(review.title) }}</p>

          <p class="mt-4 leading-relaxed font-lato text-gray-700">
            {{ ensureString(review.content) }}
          </p>
        </div>
      </div>

      <footer class="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
        &mdash; {{ review.author }}
      </footer>
    </blockquote>
  </div>
</template>
