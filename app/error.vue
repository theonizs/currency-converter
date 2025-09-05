<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen gap-4">
    <h1 class="text-4xl font-bold">Error: {{ error?.statusCode }}</h1>
    <h2>{{ error?.statusMessage }}</h2>
    <UButton
      class="w-fit"
      label="Go back home"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-home"
      block
      to="/"
    />
  </div>
</template>
