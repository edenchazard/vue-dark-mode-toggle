import { describe, it, expect, vi, afterEach } from 'vitest';
import useDarkMode from '@/hooks/useDarkMode';
import { JSDOM } from 'jsdom';

describe('useDarkMode composable', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("uses browser's prefers-color-scheme", () => {
    it('when light', () => {
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({
          matches: false,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });

      const { enabled } = useDarkMode();

      expect(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      ).to.be.eql(false);

      expect(enabled.value).to.be.eql(false);
    });

    it('when dark', () => {
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => ({
          matches: true,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });

      const { enabled } = useDarkMode();

      expect(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      ).to.be.eql(true);

      expect(enabled.value).to.be.eql(true);
    });
  });

  it("doesn't set local storage key when using match media", () => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => ({
        matches: true,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });

    const { enabled } = useDarkMode();
    expect(enabled.value).to.be.eql(true);
    expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
  });

  it('prefers to use local storage key over match media', () => {
    localStorage.setItem('enable-dark-mode', 'false');

    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => ({
        matches: true,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });

    const { enabled } = useDarkMode();

    expect(enabled.value).toBe(false);
  });

  describe('updates local storage value', () => {
    it('when false', () => {
      const { enabled } = useDarkMode();
      enabled.value = false;
      expect(localStorage.getItem('enable-dark-mode')).to.be.eql('false');
    });

    it('when true', () => {
      const { enabled } = useDarkMode();
      enabled.value = true;
      expect(localStorage.getItem('enable-dark-mode')).to.be.eql('true');
    });
  });

  it('toggle() inverts value', () => {
    const { toggle, enabled } = useDarkMode();
    enabled.value = false;
    toggle();
    expect(enabled.value).to.be.eql(true);
  });

  it('clearPreference() removes value from local storage', () => {
    const { clearPreference } = useDarkMode();
    clearPreference();

    expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
  });

  describe('the options should', () => {
    it('apply class to target', () => {
      const dom = new JSDOM();
      global.document = dom.window.document;

      const { enabled } = useDarkMode({ applyTo: 'body' });

      enabled.value = true;
      expect(document.body.classList.contains('dark')).to.be.eql(true);
    });

    it('not apply class to default html target when applyTo is null', () => {
      const dom = new JSDOM();
      global.document = dom.window.document;

      const { enabled } = useDarkMode({ applyTo: null });

      enabled.value = true;
      expect(document.documentElement.classList.contains('dark')).to.be.eql(
        false,
      );
    });

    it('use given class name', () => {
      const dom = new JSDOM();
      global.document = dom.window.document;
      const className = 'test-class-name';

      const { enabled } = useDarkMode({ className });

      enabled.value = true;
      expect(document.documentElement.classList.contains(className)).to.be.eql(
        true,
      );
      expect(document.documentElement.classList.contains('dark')).to.be.eql(
        false,
      );
    });

    it('use given local storage key', () => {
      const localStorageKey = 'test-key-name';

      const { enabled } = useDarkMode({ localStorageKey });

      enabled.value = true;
      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(localStorage.getItem(localStorageKey)).to.be.eql('true');
    });
  });
});
