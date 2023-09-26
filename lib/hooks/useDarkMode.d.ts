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
export default function useDarkMode(options?: useDarkModeOptions): {
    enabled: import("vue").WritableComputedRef<boolean>;
    toggle: () => void;
    clearPreference: () => void;
};
export {};
