import { computed, reactive, ref } from 'vue';

interface useDarkModeOptions {
  /**
   * Apply the class name to the given element. If explicitely set to null
   * no element will be targeted and you must handle the application yourself.
   *
   * @default 'html'
   */
  applyTo?: string | HTMLElement | null;

  /**
   * The local storage key name to persist the dark mode setting.
   *
   * @default 'enable-dark-mode'
   */
  localStorageKey?: string;

  /**
   * If the local storage value isn't set, then the preferred option set by the
   * user will be used. If this can't be found, the default value will be used.
   *
   * @default false
   */
  defaultValue?: boolean;

  className?: string;
}

const defaultValues: useDarkModeOptions = {
  applyTo: 'html',
  localStorageKey: 'enable-dark-mode',
  defaultValue: false,
  className: 'dark',
};

export default function useDarkMode(
  options: useDarkModeOptions = defaultValues,
) {
  const mergedOptions = reactive({
    ...defaultValues,
    ...options,
  }) as Required<useDarkModeOptions>;

  const _enabled = ref<boolean | undefined>(undefined);

  const enabled = computed<boolean>({
    get() {
      if (_enabled.value === undefined) {
        const ls = localStorage.getItem(mergedOptions.localStorageKey);

        // hasn't been set, use preferred
        if (ls === null) {
          _enabled.value =
            window?.matchMedia('(prefers-color-scheme: dark)').matches ??
            mergedOptions.defaultValue;
        } else {
          _enabled.value = ls === 'true';
        }
      }
      setClassOnTarget();
      return _enabled.value;
    },

    set(value) {
      localStorage.setItem(mergedOptions.localStorageKey, String(value));
      _enabled.value = value;
      setClassOnTarget();
    },
  });

  function setClassOnTarget() {
    if (!mergedOptions.applyTo) {
      return;
    }

    let el = null;

    if (mergedOptions.applyTo instanceof HTMLElement) {
      el = mergedOptions.applyTo;
    } else if (typeof mergedOptions.applyTo === 'string') {
      el = document.querySelector(mergedOptions.applyTo);
    }

    el?.classList[_enabled.value ? 'add' : 'remove'](mergedOptions.className);
  }

  function toggle() {
    enabled.value = !enabled.value;
  }

  function clearPreference() {
    localStorage.removeItem(mergedOptions.localStorageKey);
  }

  return { enabled, toggle, clearPreference };
}
