<script setup lang="ts">
import { onMounted, computed } from 'vue'
import * as qr from '@bitjson/qr-code'
import LogoSvg from "/public/whatsapp.svg";

interface Props {
  contents: string
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

const qrCodeRef = ref<HTMLElement | null>(null)

const handleCodeRendered = () => {
  if (props.animate && qrCodeRef.value) {
    (qrCodeRef.value as any).animateQRCode((targets, _x, _y, _count, entity) => ({
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
  <div>
    <p>Scan the code below to follow my fitness journey on WhatsApp. <strong>Stay savage!</strong></p>
    <qr-code
        ref="qrCodeRef"
        :contents="contents"
        :style="computedStyle"
        v-bind="$attrs"
        @codeRendered="handleCodeRendered"
    >
      <LogoSvg :fontControlled="false" class="mx-auto h-16 w-auto" slot="icon"/>
    </qr-code>
  </div>
</template>
