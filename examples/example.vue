<template>
  <VueDarkModeToggle
    as="button"
    type="button"
    :dark-mode-enabled="enabled"
    :style="{
      width: '4rem',
      height: '4rem',
    }"
    @click="toggle"
  />
</template>

<script setup lang="ts">
import VueDarkModeToggle, { useDarkMode } from './VueDarkModeToggle';

const { enabled, toggle } = useDarkMode();
</script>
