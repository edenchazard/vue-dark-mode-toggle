[![Test](https://github.com/edenchazard/vue-dark-mode-toggle/actions/workflows/test.yml/badge.svg)](https://github.com/edenchazard/vue-dark-mode-toggle/actions/workflows/test.yml)
[![Build](https://github.com/edenchazard/vue-dark-mode-toggle/actions/workflows/build.yml/badge.svg)](https://github.com/edenchazard/vue-dark-mode-toggle/actions/workflows/build.yml)

# Vue Dark Mode Toggle

Add a sleek, animated dark mode toggle to your Vue 3 project. It handles everything you need with a composable and a component.

Check out the [demo here](https://edenchazard.github.io/vue-dark-mode-toggle/)!

## VueDarkModeToggle

A component that can be used with the composable. The component doesn't decide if dark mode is enabled itself, but it accepts a `dark-mode-enabled` prop and will display the appropriate sun/moon graphic.

## useDarkMode

A composable to handle all dark mode related things. Combine it with the component for maximum dark mode-ness. 😎

# How to use

Add to your project using the command

```sh
npm i @edenchazard/vue-dark-mode-toggle
```

Documentation can be found on the [demo page](https://edenchazard.github.io/vue-dark-mode-toggle/).

## Development

### Dev mode

```sh
npm run dev
```

### Build demo app

Will build to the `/docs` demo folder.

```sh
npm run build
```

### Vitest

```sh
npm run test:unit
```

### Eslint

```sh
npm run lint
```

## Icon credits

SVG icons from [FontAwesome](https://fontawesome.com/).
