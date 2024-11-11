<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMotivationalData } from "~/composables/useMotivationalData"

const sliderRef = ref(null)
let intervalId: number | null = null;

const moveSlide = () => {
  const slider = sliderRef.value as HTMLElement | null
  if (!slider) return

  const max = slider.scrollWidth - slider.clientWidth
  const left = slider.clientWidth

  if (max === slider.scrollLeft) {
    slider.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    slider.scrollBy({ left, behavior: 'smooth' })
  }
}

const { quotes } = useMotivationalData()

onMounted(() => {
  // Start the interval when the component is mounted
  intervalId = setInterval(moveSlide, 2000) as unknown as number
})

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <section id="motivational" class="bg-gray-900 dark:bg-gray-100">
    <div ref="sliderRef" id="slider" class="h-96 w-full overflow-hidden flex flex-nowrap text-center">
      <template v-for="quote in quotes">
        <div class="text-white space-y-4 flex-none w-full flex flex-col items-center justify-center" :class="quote.className">
          <figure class="max-w-screen-md mx-auto text-center">
            <svg class="w-10 h-10 mx-auto mb-3 text-white dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <blockquote>
              <p class="text-2xl italic font-medium text-gray-900 dark:text-white">"{{ quote.quote }}"</p>
            </blockquote>
            <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-800 dark:divide-gray-300">
                <cite class="pe-3 font-medium text-gray-900 dark:text-white">{{ quote.author }}</cite>
                <cite class="ps-3 text-sm text-gray-700 dark:text-gray-400">{{ quote.nominal_title }}</cite>
              </div>
            </figcaption>
          </figure>
        </div>
      </template>
    </div>
  </section>

</template>

<style scoped>

</style>
