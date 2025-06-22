<template>
  <VueRiseAndShine
    as="button"
    type="button"
    :style="{
      width: '4rem',
      height: '4rem',
    }"
    @click="toggle"
  />
</template>

<script setup lang="ts">
import { VueRiseAndShine, useDarkMode } from '@edenchazard/vue-rise-and-shine';

const { toggle } = useDarkMode();
</script>
