<script setup lang="ts">
import { useSiteData } from "~/composables/useSiteData"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FooterLogo from "/public/logo-monochrome.svg"

const { site } = useSiteData()
const date = new Date();
const currentYear = date.getFullYear();

const localePath = useLocalePath();
</script>

<template>
  <footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <NuxtLink :to="site.url"
                    :isExternal="false"
                    class="flex items-center">
            <FooterLogo :alt="site.title" :fontControlled="false" class="h-8 mr-3 text-primary dark:text-primary-200"/>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{  site.title }}</span>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{ site.resources_title }}</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <template v-for="(link, idx) in site.resources" :key="idx">
                <li class="mb-4">
                  <!-- Use localePath for internal links only -->
                  <NuxtLink :to="link.external ? link.to : localePath(link.to)"
                            :isExternal="link.external"
                            :target="link.external ? '_blank' : ''"
                            :title="link.title"
                            class="hover:underline">{{ link.displayText }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{ site.social_title }}</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <template v-for="social in site.social_links" :key="social.label">
                <li class="mb-4">
                  <NuxtLink :to="social.href"
                            :isExternal="true"
                            target="_blank"
                            class="hover:underline">{{ social.name }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <template v-for="(link, idx) in site.legal" :key="idx">
                <li class="mb-4">
                  <!-- Use localePath for internal links only -->
                  <NuxtLink :to="link.external ? link.to : localePath(link.to)"
                    :isExternal="link.external"
                    :target="link.external ? '_blank' : undefined"
                    :title="link.title"
                    class="hover:underline">{{ link.displayText }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021 - {{ currentYear }} <NuxtLink :to="site.url" :isExternal=false class="hover:underline">{{ site.title }}</NuxtLink>. All Rights Reserved.
          </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <template v-for="social in site.social_links" :key="social.label">
            <NuxtLink :to="social.href"
                      :isExternal="true"
                      :title="social.name"
                      target="_blank"
                      class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FontAwesomeIcon :icon="social.icon" :title="social.display_title" />
              <span class="sr-only">{{ social.display_title}}</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
