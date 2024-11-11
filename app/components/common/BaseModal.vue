<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <!-- Render inside our `<div id="modals"></div>` in index.html -->
  <ClientOnly>
    <Teleport to="#modals">
      <!-- Show / hide the modal -->
      <div v-if="show" class="">
        <!-- The backdrop -->
        <div class="fixed inset-0 bg-gray-900 opacity-40"></div>

        <!-- Where the actual content goes -->
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="w-full md:w-1/2 h-4/5 overflow-scroll bg-white text-black">
            <slot></slot>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>

</style>
