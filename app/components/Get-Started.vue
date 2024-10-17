<script setup lang="ts">
import { onMounted } from "vue"
import { useGetStartedData } from "~/composables/useGetStartedData"

const target = ref([])
const isVisible = shallowRef(false)
const hiddenElements = ref([])
const { getStarted } = useGetStartedData()

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const childNodes = entry.target.childNodes
      isVisible.value = true
      entry.target.childNodes.forEach(child => {
        setTimeout(() => {
          child.classList.remove('opacity-0')
        }, 1000)
      })
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, options)
  observer.observe(target.value)
})
</script>

<template>
  <section id="get-started" class="bg-black text-primary-100 py-16 sm:py-24 lg:py-32">
    <div ref="target" class="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div v-show="isVisible" class="max-w-xl tracking-tight text-white lg:col-span-7 opacity-0 animate-fadeinup" data-observe>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ getStarted.title }}</h2>
        <template v-for="content in getStarted.content">
          <p class="text-slate-300 tracking-wide py-6">{{ content }}</p>
        </template>
        <button type="submit" class="flex-none w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{{ getStarted.cta }}</button>
      </div>
      <div v-show="isVisible" class="w-full max-w-md pl-2 lg:col-span-5 lg:pt-2 opacity-0 animate-fadeinup" data-observe>
        <p class="mb-6 font-bold leading-6 text-gray-300">{{ getStarted.subtitle }}</p>
        <ul class="list-none text-slate-300">
          <template v-for="list_item in getStarted.list">
            <li class="my-4">{{  list_item }}</li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
