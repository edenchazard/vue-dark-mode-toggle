import { computed, reactive, readonly, ref } from 'vue';

interface useDarkModeOptions {
  /**
   * Apply the class name to the given element. If explicitly set to null
   * no element will be targeted and you must handle the application yourself.
   *
   * @default 'html'
   */
  selector: string | HTMLElement | null;

  /**
   * The local storage key name to persist the dark mode setting.
   *
   * @default 'enable-dark-mode'
   */
  localStorageKey: string;

  /**
   * If the local storage value isn't set, then the preferred option set by the
   * user will be used. If this can't be found, the default value will be used.
   *
   * @default false
   */
  defaultValue: boolean;

  /**
   * @default 'dark'
   */
  className: string;
}

export const _options: useDarkModeOptions = reactive({
  selector: 'html',
  localStorageKey: 'enable-dark-mode',
  defaultValue: false,
  className: 'dark',
});

const prefersDark = ref<boolean | undefined>(undefined);
const setting = ref<boolean | undefined>(undefined);

const fromLocalStorage = () => {
  if (!localStorage) {
    return null;
  }

  const localStorageValue = localStorage.getItem(_options.localStorageKey);

  if (localStorageValue !== null) {
    return localStorageValue === 'true';
  }

  return null;
};

if (window.matchMedia) {
  const matcher = window.matchMedia('(prefers-color-scheme: dark)');

  matcher.addEventListener('change', ({ matches }) => {
    prefersDark.value = matches;
    setting.value =
      fromLocalStorage() ?? prefersDark.value ?? _options.defaultValue;
    syncClassName(matches);
  });

  prefersDark.value = matcher.matches;
}

setting.value ??=
  fromLocalStorage() ?? prefersDark.value ?? _options.defaultValue;

// The local storage value, referenced by `_options.localStorageKey`,
// should take precedence over the `prefersDark` value
// If the local storage value is not set, then we will use the `prefersDark` value,
// and if that is not set, we will use the `defaultValue`.
// Whenever the setting changes and a selector is set, we will apply the class name to the element.
const isDark = computed({
  get() {
    if (setting.value !== undefined) {
      return setting.value;
    }

    const localStorageValue = fromLocalStorage();

    if (localStorageValue !== null) {
      return localStorageValue;
    }

    if (prefersDark.value !== undefined) {
      return prefersDark.value;
    }

    return _options.defaultValue;
  },
  set(value: boolean) {
    setting.value = value;
    localStorage?.setItem?.(_options.localStorageKey, value.toString());
    syncClassName(value);
  },
});

function syncClassName(value: boolean) {
  if (!_options.selector) {
    return;
  }

  const element =
    typeof _options.selector === 'string'
      ? document.querySelector(_options.selector)
      : _options.selector;

  if (!element) {
    return;
  }

  const action = value ? element.classList.add : element.classList.remove;
  action.call(element.classList, _options.className);
}

function toggle() {
  isDark.value = !isDark.value;
}

function unsetToSystem() {
  setting.value = undefined;
  localStorage?.removeItem?.(_options.localStorageKey);
  syncClassName(prefersDark.value ?? _options.defaultValue);
}

export default function useDarkMode(
  options: Partial<useDarkModeOptions> = _options,
) {
  Object.assign(_options, options);

  syncClassName(isDark.value);

  return {
    isDark,
    /**
     * Whether the user's system preference is set to dark mode.
     */
    prefersDark: readonly(prefersDark),

    toggle,
    unsetToSystem,
  };
}
