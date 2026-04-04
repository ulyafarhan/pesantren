<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive, type PrimitiveProps } from "reka-ui"
import { cn } from "~/lib/utils"
import { buttonVariants } from "."

interface Props extends /* @vue-ignore */ PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  as?: any           // Perbaikan: Definisikan eksplisit untuk template
  asChild?: boolean  // Perbaikan: Definisikan eksplisit untuk template
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class, 'rounded-xl')" 
  >
    <slot />
  </Primitive>
</template>