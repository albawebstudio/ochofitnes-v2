<script setup lang="ts">
import { useAboutData } from "~/composables/useAboutData";

const { about, profile } = useAboutData();
</script>

<template>
  <section id="about-us" class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="w-full items-center mx-auto max-w-screen-lg">
      <div class="group grid w-full grid-cols-1 sm:grid-cols-2">
        <div>
          <div class="pr-12">
            <h2 class="text-2xl font-extrabold px-4 py-8">{{ about.title }}</h2>
            <p v-for="content in about.content" class="text-justify sm:text-left peer p-4 mb-6 text-gray-600" v-html="content"></p>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div class="bg-white rounded-2xl shadow px-6 py-4 flex flex-col items-center max-w-md">
            <NuxtImg :src="profile.img.src"
                     :alt="profile.img.alt"
                     class="rounded-full h-80 w-80 object-cover" />
            <h4 class="mt-8 border-b-2 capitalize">{{ profile.name }}</h4>
            <div class="my-10 text-center">{{ profile.certifications }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
