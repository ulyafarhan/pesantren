<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type BadgeVariants, badgeVariants } from '.'
import { cn } from '~/lib/utils'

// Mendefinisikan interface secara eksplisit agar Vue dapat membacanya saat render
interface Props extends /* @vue-ignore */ PrimitiveProps {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cn(badgeVariants({ variant }), props.class, 'rounded-xl uppercase tracking-widest font-black text-[9px] px-2 py-0.5 border border-primary/20')"
  >
    <slot />
  </Primitive>
</template>