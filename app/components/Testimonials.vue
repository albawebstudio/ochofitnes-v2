<script setup lang="ts">
import { useTestimonialsData } from "~/composables/useTestimonials"
import Testimonial from "~/components/common/Testimonial.vue";

const { testimonial } = useTestimonialsData()
const [container, slider] = useKeenSlider({
  loop: true,
  slides: {
    origin: 'center',
    perView: 1.25,
    spacing: 16,
  },
  breakpoints: {
    '(min-width: 1024px)': {
      slides: {
        origin: 'auto',
        perView: 1.5,
        spacing: 32,
      },
    },
  },
});
</script>

<template>
  <section id="testimonials" class="bg-center bg-no-repeat bg-[url('/hero/hero-bg-lifting.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
        <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 class="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            {{ testimonial.title }}
          </h2>

          <template v-for="content in testimonial.content">
            <p class="mt-4 text-slate-300">
              {{ content }}
            </p>
          </template>

          <div class="hidden lg:mt-8 lg:flex lg:gap-4">
            <div class="flex-grow"></div>
            <div class="flex-0">
              <button
                  aria-label="Previous slide"
                  id="keen-slider-previous-desktop"
                  class="rounded-full border border-tertiary-600 p-3 text-tertiary-600 transition hover:bg-tertiary-600 hover:text-white"
                  @click="slider.prev()"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 rtl:rotate-180"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-0">
              <button
                  aria-label="Next slide"
                  id="keen-slider-next-desktop"
                  class="rounded-full border border-tertiary-600 p-3 text-tertiary-600 transition hover:bg-tertiary-600 hover:text-white"
                  @click="slider.next()"
              >
                <svg
                    class="size-5 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M9 5l7 7-7 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-grow"></div>

          </div>
        </div>

        <div class="mx-0 sm:-mx-6 lg:col-span-2 lg:mx-0">
          <div ref="container" class="keen-slider">
            <template v-for="review in testimonial.reviews">
              <Testimonial :review="review" />
            </template>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-4 lg:hidden">
        <button
            aria-label="Previous slide"
            id="keen-slider-previous"
            class="rounded-full border border-tertiary-600 p-4 text-tertiary-600 transition hover:bg-tertiary-600 hover:text-white"
            @click="slider.prev()"
        >
          <svg
              class="size-5 -rotate-180 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </button>

        <button
            aria-label="Next slide"
            id="keen-slider-next"
            class="rounded-full border border-tertiary-600 p-4 text-tertiary-600 transition hover:bg-tertiary-600 hover:text-white"
            @click="slider.next()"
        >
          <svg
              class="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
