<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      href: '/android-chrome-512x512.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5'
    }
  ],
  meta: [
    {
      name: 'msapplication-TileColor',
      content: '#da532c'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    }
  ],
})
</script>

<template>
  <div>
    <CommonNavigation />
    <slot></slot>
    <CommonFooter />
    <div id="modals" class="relative z-20"></div>
  </div>
</template>

<style scoped>

</style>
