<template>
  <component
    :is="as"
    class="dark-mode-toggle"
    :class="{ night: darkModeEnabled }"
    aria-label="Toggle Dark Mode"
  >
    <span class="dark-mode-bg"> </span>
    <span class="dark-mode-rotate">
      <FaMoon class="moon" />
      <FaSun class="sun" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import FaMoon from './icons/FaMoon.vue';
import FaSun from './icons/FaSun.vue';

const degrees = ref(0);

const props = defineProps({
  darkModeEnabled: {
    type: Boolean,
    default: false,
  },
  as: {
    type: [String, Object],
    default: 'span',
  },
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
