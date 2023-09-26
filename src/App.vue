<template>
  <div id="container">
    <header>
      <h1>Vue Dark Mode Toggle</h1>
    </header>
    <main>
      <div id="content">
        <div id="demo">
          <div class="interact">
            <Transition name="click-me" appear :duration="1000">
              <span v-if="clickAgain" class="message again">Click again!</span>
              <span v-else class="message click">Click me!</span>
            </Transition>
            <VueDarkModeToggle
              as="button"
              type="button"
              :dark-mode-enabled="enabled"
              :style="{
                width: '8rem',
                height: '8rem',
              }"
              @click="
                () => {
                  toggle();
                  clickAgain = !clickAgain;
                }
              "
            />
          </div>
        </div>

        <div id="narration">
          <p>Dark mode is currently {{ enabled ? 'on' : 'off' }}.</p>
          <p v-show="enabled">Be careful out there!</p>
          <p v-show="!enabled">The sun is up, have a good day.</p>

          <button id="toggle" type="button" @click="toggle">
            {{
              enabled
                ? 'Turn the lights on!'
                : "I'm sleeping in until the evening!"
            }}
          </button>
        </div>

        <section id="features">
          <h2>Features</h2>
          <p>
            How useless would it be if it didn't have some features? Thankfully,
            it does, so here they are.
          </p>
          <h3>Responsive Sizing</h3>
          <p>
            Specify the height and with and the toggle will maintain its look
            without pissing you off.
          </p>
          <div id="sizes">
            <VueDarkModeToggle
              :dark-mode-enabled="enabled"
              :style="{
                width: '4rem',
                height: '4rem',
              }"
            />
            4rem

            <VueDarkModeToggle
              :dark-mode-enabled="enabled"
              :style="{
                width: '2rem',
                height: '2rem',
              }"
            />
            2rem

            <VueDarkModeToggle
              :dark-mode-enabled="enabled"
              :style="{
                width: '1rem',
                height: '1rem',
              }"
            />
            1rem
          </div>
        </section>

        <section id="usage">
          <h2>Usage</h2>
          <p>
            The package includes a component and a composable. Use the package
            if you'd like a cool and ready-made icon for your users to toggle.
            Use the composable if you want to control the dark mode setting.
          </p>
          <p>Better yet, combine both for maximum effect!</p>

          <h3>Example</h3>
          <div class="code-wrapper">
            <span class="label">vue</span>
            <CodeBlock
              highlightjs
              class="code"
              :code="example"
              theme="paraiso-dark"
            />
          </div>

          <h3>Component props</h3>
          <h4>darkModeEnabled</h4>
          <span class="type">boolean</span>
          <p>Determine whether to display the dark mode or light mode state.</p>
          <h4>as</h4>
          <span class="type">string, object</span>
          <p>Render it as the provided node. Defaults to span.</p>

          <h3>useDarkMode options</h3>
          <h4>applyTo</h4>
          <span class="type">string, null, HTML Element</span>
          <p>
            Apply the class name to the given element. If explicitely set to
            null no element will be targeted and you must handle the application
            yourself.
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import example from '../examples/example.vue?raw';
import { VueDarkModeToggle, useDarkMode } from '.';
import CodeBlock from 'vue3-code-block';

const { enabled, toggle } = useDarkMode({ applyTo: 'body' });
const clickAgain = ref(false);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@500&display=swap');

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

body {
  background-color: #24220f;
  color: hsl(43, 74%, 50%);
  transition:
    color 2s,
    background-color 2s;
}

#container {
  width: 100%;
  max-width: 50rem;
  margin: auto;
  transition: background-color 2s;
}

#content {
  display: grid;
  flex-wrap: wrap;
  grid-template-areas: 'demo narration';
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
}

#features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#sizes {
  grid-area: sizes;
  display: flex;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 2rem;
}

#narration {
  grid-area: narration;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

#usage,
#features {
  grid-column: 1/3;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
}

#toggle {
  padding: 1rem;
  max-width: 20rem;
  width: 100%;
  animation: day-glow 1s linear infinite alternate;
}

.dark {
  & body {
    background-color: rgb(36, 34, 40);
    color: hsl(0, 0%, 80%);
  }

  & #toggle {
    animation-name: night-glow;
  }
}

.interact {
  position: relative;
  display: inline-block;
  margin: 3rem 0 0 0;

  & .message {
    position: absolute;
    font-family: 'Gloria Hallelujah', cursive;
    font-size: 1.5rem;
    transform-origin: right;
  }
}

.click {
  top: 0%;
  transform: rotate(30deg) translate(70%, -100%);
}

.again {
  bottom: 0%;
  transform: rotate(-30deg) translate(60%, 70%);
}

.click-me-enter-active,
.click-me-leave-active {
  transition: all 0.5s ease-in-out;
  opacity: 1;
}

.click-me-enter-from,
.click-me-leave-to {
  opacity: 0;
  transform: translateY(-10%) translateX(-10%);
}

.code-wrapper {
  position: relative;
  margin: 1.5rem 0 0 0.5rem;

  > .label {
    position: absolute;
    background: black;
    color: #fff;
    border-radius: 0.25rem;
    top: -1rem;
    padding: 0.25rem 1rem;
    left: -0.5rem;
    z-index: 10;
  }

  > .code {
    color: black;
    text-align: left;
    border-radius: 0.25rem;
    text-wrap: wrap;
    width: 100%;
  }
}

@keyframes day-glow {
  0% {
    background-color: hsl(40, 100%, 40%);
    color: hsl(41, 100%, 10%);
  }
  100% {
    background-color: hsl(40, 100%, 50%);
    color: hsl(41, 100%, 20%);
    box-shadow: hsl(40, 100%, 50%, 0.5) 0 0 10px 2px;
  }
}

@keyframes night-glow {
  0% {
    background-color: hsl(240, 28%, 40%);
    color: hsl(240, 25%, 0%);
  }
  100% {
    background-color: hsl(240, 28%, 50%);
    color: hsl(240, 25%, 10%);
    box-shadow: hsl(240, 28%, 60%, 0.5) 0 0 10px 2px;
  }
}
</style>
.
