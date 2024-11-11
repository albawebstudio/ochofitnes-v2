<script setup lang="ts">
import { useServiceData } from "~/composables/useServiceData"

const { service } = useServiceData()
</script>

<template>
  <section id="services" class="bg-gradient-to-r from-secondary-600 to-tertiary-400 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl">
          {{  service.title }}
        </h2>
        <p v-for="content in service.content" class="mt-4 mx-auto w-2/3 text-xl text-gray-50" v-html="content"></p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <template v-for="item in service.items" :key="service.title">
          <div class="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 relative overflow-hidden">
            <LazyNuxtImg :src="item.img.src" :alt="item.img.alt" class="w-full rounded-xl mb-8" />
            <div class="mb-8">
              <h3 class="text-2xl font-semibold text-white">{{ item.title }}</h3>
              <p v-for="content in item.content" class="mt-4 text-purple-200" v-html="content"></p>
            </div>
            <div class="mb-8">
              <span class="text-5xl font-extrabold text-white">{{  item.price.formattedValue }}</span>
              <span class="text-xl font-medium text-purple-200 ml-2">per {{ item.price.unit.quantity }} {{ item.price.unit.measure }}</span>
            </div>
            <ul class="mb-8 space-y-4 text-purple-200">
              <template v-for="feature in item.list" :key="feature">
                <li class="flex items-center">
                  <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
