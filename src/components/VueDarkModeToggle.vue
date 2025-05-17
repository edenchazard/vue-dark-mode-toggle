<template>
  <component
    :is="as"
    class="dark-mode-toggle"
    :class="{ night: darkModeEnabled }"
  >
    <span class="sr-only"
      >{{ darkModeEnabled ? srText.enabled : srText.disabled }}
    </span>
    <span class="dark-mode-bg" aria-hidden="true" role="presentation"> </span>
    <span class="dark-mode-rotate" aria-hidden="true" role="presentation">
      <FaMoon class="moon" />
      <FaSun class="sun" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch, type Component } from 'vue';
import FaMoon from '@/components/icons/FaMoon.vue';
import FaSun from '@/components/icons/FaSun.vue';

const degrees = ref(0);

export type Props = {
  darkModeEnabled?: boolean;
  as?: string | Component;
  srText?: {
    disabled: string;
    enabled: string;
  };
};

const props = withDefaults(defineProps<Props>(), {
  darkModeEnabled: false,
  as: 'span',
  /**
   * The text to show for screen readers.
   */
  srText: () => ({
    disabled: 'Light mode is on',
    enabled: 'Dark mode is on',
  }),
});

onBeforeMount(() => {
  if (props.darkModeEnabled) {
    degrees.value = 180;
  }
});

watch(
  () => props.darkModeEnabled,
  () => {
    degrees.value += 180;
  },
);
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.dark-mode-toggle {
  border-radius: 50%;
  border: 1px solid #fff;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: inherit;

  &.night .dark-mode-bg {
    background: rgb(49, 49, 126);
  }
}

.dark-mode-bg {
  border-radius: 50%;
  background: rgb(175, 115, 4);
  height: 100%;
  /* makes it more elliptical */
  width: 150%;
  position: absolute;
  top: 50%;
  transition: background-color 1s ease-in;
}

.dark-mode-rotate {
  transform: rotate(calc(v-bind(degrees) * 1deg));
  transition: transform 1s ease-out;
  transform-origin: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 10%;
  height: 200%;

  > .sun,
  > .moon {
    position: absolute;
    fill: #fff;
    width: 40%;
    height: 40%;
    transform: scale(-1);
  }
  > .sun {
    top: 0;
  }
  > .moon {
    bottom: 0;
  }
}
</style>
