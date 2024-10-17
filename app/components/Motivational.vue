<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sliderRef = ref(null)
let intervalId = null

const moveSlide = () => {
  const slider = sliderRef.value
  if (!slider) return

  const max = slider.scrollWidth - slider.clientWidth
  const left = slider.clientWidth

  if (max === slider.scrollLeft) {
    slider.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    slider.scrollBy({ left, behavior: 'smooth' })
  }
}

onMounted(() => {
  // Start the interval when the component is mounted
  intervalId = setInterval(moveSlide, 2000)
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
      <div class="bg-blue-600 text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
        <figure class="max-w-screen-md mx-auto text-center">
          <svg class="w-10 h-10 mx-auto mb-3 text-white dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
          <blockquote>
            <p class="text-2xl italic font-medium text-gray-900 dark:text-white">“At that point in life where your talent meets the needs of the world, that is where God wants you to be.”</p>
          </blockquote>
          <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-800 dark:divide-gray-300">
              <cite class="pe-3 font-medium text-gray-900 dark:text-white">Albert Schweitzer</cite>
              <cite class="ps-3 text-sm text-gray-700 dark:text-gray-400">Nobel Prize Theologian</cite>
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="bg-pink-400 text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
        <figure class="max-w-screen-md mx-auto text-center">
          <svg class="w-10 h-10 mx-auto mb-3 text-white dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
          <blockquote>
            <p class="text-2xl italic font-medium text-gray-900 dark:text-white">“Lack of activity destroys the good condition of every human being, while movement and methodical physical exercise save it and preserve it.”</p>
          </blockquote>
          <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-800 dark:divide-gray-300">
              <cite class="pe-3 font-medium text-gray-900 dark:text-white">Plato</cite>
              <cite class="ps-3 text-sm text-gray-700 dark:text-gray-400">Greek Philosopher</cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
