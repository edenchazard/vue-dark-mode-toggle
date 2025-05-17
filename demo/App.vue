<template>
  <div id="container">
    <header>
      <h1>Vue Dark Mode Toggle</h1>
    </header>
    <main>
      <div id="content">
        <div id="demo">
          <div class="interact">
            <Transition
              name="click-me"
              appear
              :duration="1000"
            >
              <span
                v-if="clickAgain"
                class="message again"
                >Click again!</span
              >
              <span
                v-else
                class="message click"
                >Click me!</span
              >
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

          <button
            id="toggle"
            type="button"
            @click="toggle"
          >
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
            Specify the height and width and the toggle will maintain its look
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
          <h3>Accessibility</h3>
          <p>
            The element renders a label only visible to screen readers, so they
            know which mode they've currently got active.
          </p>
        </section>

        <section id="links">
          <h2>Links</h2>
          <ul>
            <li>
              <a href="https://github.com/edenchazard/vue-dark-mode-toggle"
                >Github</a
              >
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@edenchazard/vue-dark-mode-toggle"
                >NPM</a
              >
            </li>
          </ul>
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
              :code="Example"
              theme="paraiso-dark"
            />
          </div>

          <div class="table">
            <h3>Component props</h3>

            <span>Prop Name</span>
            <span>Type</span>
            <span>Default</span>
            <span>Description</span>

            darkModeEnabled
            <span>boolean</span>
            <span class="type">false</span>
            <p>
              Determine whether to display the dark mode or light mode state.
            </p>

            as
            <span class="type">string, object</span>
            <span class="type">'span'</span>
            <p>Render it as the provided node. Defaults to span.</p>

            srText
            <span class="type">{ disabled: string; enabled: string }</span>
            <span class="type"
              >{ disabled: 'Light mode is on', enabled: 'Dark mode is on'
              }</span
            >
            <p>The text to show for screen readers.</p>

            <h3>useDarkMode options</h3>

            <span>Option Name</span>
            <span>Type</span>
            <span>Default</span>
            <span>Description</span>

            applyTo
            <span>boolean</span>
            <span class="type">'html'</span>
            <p>
              Determine whether to display the dark mode or light mode state.
            </p>

            localStorageKey
            <span class="type">string</span>
            <span class="type">'enable-dark-mode'</span>
            <p>The local storage key name to persist the dark mode setting.</p>

            defaultValue
            <span class="type">boolean</span>
            <span class="type">false</span>
            <p>
              If the local storage value isn't set, then the preferred option
              set by the user will be used. If this can't be found, the default
              value will be used.
            </p>

            className
            <span class="type">string</span>
            <span class="type">'dark'</span>
            <p>
              Apply the class name to the given element. If explicitly set to
              null no element will be targeted and you must handle the
              application yourself.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeBlock from 'vue3-code-block';
import Example from '@demo/code/Example.vue?raw';
import { VueDarkModeToggle, useDarkMode } from '@/index';

const { enabled, toggle } = useDarkMode();
const clickAgain = ref(false);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@500&display=swap');

body {
  background-color: #24220f;
  color: hsl(43, 60%, 40%);
  transition:
    color 2s,
    background-color 2s;
}

header {
  line-height: 2;
}

section {
  margin: 2rem 0 0 0;
}

h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3.5rem;
}
h3 {
  font-size: 3rem;
}
h4 {
  font-size: 2.5rem;
}
h5 {
  font-size: 2rem;
}
h6 {
  font-size: 1.5rem;
}
a {
  color: rgb(255, 165, 0);
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
  & a,
  & a:visited {
    color: rgb(127, 127, 194);
    font-weight: 700;
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

.table {
  display: grid;
  grid-template-columns: auto auto minmax(5rem, 8rem) 1fr;
  gap: 2rem;

  > h3 {
    grid-column: 1/5;
    font-weight: bold;
  }
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
