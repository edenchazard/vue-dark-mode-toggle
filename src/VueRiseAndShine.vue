<template>
  <component
    :is="as"
    class="vue-rise-and-shine"
    :class="{
      night: isDark,
    }"
    @click="toggle()"
  >
    <span class="sr-only">
      {{ isDark ? srText.enabled : srText.disabled }}
    </span>
    <span
      class="dark-mode-bg"
      aria-hidden="true"
      role="presentation"
    >
    </span>
    <span
      class="dark-mode-rotate"
      aria-hidden="true"
      :style="{
        transform: `rotate(${degrees}deg)`,
      }"
      role="presentation"
    >
      <slot name="moon">
        <svg
          class="moon"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
          />
        </svg>
      </slot>
      <slot name="sun">
        <svg
          class="sun"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
          />
        </svg>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { useDarkMode } from '@src/index';
import { onBeforeMount, ref, watch, type Component } from 'vue';

const degrees = ref(0);

withDefaults(
  defineProps<{
    as?: string | Component;
    srText?: {
      disabled: string;
      enabled: string;
    };
  }>(),
  {
    as: 'span',
    /**
     * The text to show for screen readers.
     */
    srText: () => ({
      disabled: 'Light mode is on',
      enabled: 'Dark mode is on',
    }),
  },
);

const { isDark, toggle } = useDarkMode();

onBeforeMount(() => {
  // Initialize the degrees based on the current dark mode state
  degrees.value = isDark.value ? 180 : 0;
});

watch(isDark, () => {
  degrees.value += 180;
});
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
.vue-rise-and-shine {
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
