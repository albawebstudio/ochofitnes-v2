<script setup lang="ts">
import { onMounted, computed } from 'vue'
import * as qr from '@bitjson/qr-code'

import { useQRCodeData } from "~/composables/useQRCodeData";

const { qrCodes } = useQRCodeData();

interface Props {
  width?: string
  height?: string
  margin?: string
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '200px',
  height: '200px',
  margin: 'auto',
  animate: false
})

const computedStyle = computed(() => ({
  width: props.width,
  height: props.height,
  margin: props.margin,
  animate: props.animate
}))

const handleCodeRendered = (event: Event) => {
  const qrCodeElement = event.currentTarget as HTMLElement & {
    animateQRCode?: (animation: unknown) => void
  }

  if (props.animate && qrCodeElement.animateQRCode) {
    qrCodeElement.animateQRCode((targets: any, _x: any, _y: any, _count: any, entity: string) => ({
      targets,
      from: entity === 'module' ? Math.random() * 200 : 200,
      duration: 500,
      /*easing: 'cubic-bezier(.5,0,1,1)',*/
      easing: 'cubic-bezier(1,1,0,.5)',
      web: { opacity: [0,1], scale: [0.5, 1.1, 1] }
    }))
  }
}

onMounted(() => {
  qr.defineCustomElements(window)
})
</script>

<template>
  <div class="flex flex-col items-stretch justify-center gap-8 sm:flex-row sm:items-start">
    <div
        v-for="(qrCode, idx) in qrCodes"
        :key="idx"
        class="flex flex-1 flex-col items-center text-center"
    >
      <div class="flex min-h-[4rem] items-start justify-center">
        <template v-for="(paragraph, pIdx) in qrCode.content" :key="pIdx">
          <p v-html="paragraph"></p>
        </template>
      </div>
      <qr-code
          v-bind="$attrs"
          :contents="qrCode.contents"
          :module-color="qrCode.moduleColor"
          :position-ring-color="qrCode.positionRingColor"
          :position-center-color="qrCode.positionCenterColor"
          :style="computedStyle"
          @codeRendered="handleCodeRendered"
      >
        <component :is="qrCode.logoSvg" :fontControlled="false" class="mx-auto h-16 w-auto" slot="icon"/>
      </qr-code>
      <div>
        <NuxtLink :to="qrCode.contents" class="text-blue-500 hover:underline">{{ qrCode.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
