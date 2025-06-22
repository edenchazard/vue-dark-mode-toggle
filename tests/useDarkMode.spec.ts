import { describe, it, expect, vi, beforeEach } from 'vitest';

function createMatchMediaSpy(matches: boolean) {
  return vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('useDarkMode composable', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe("matchMedia('prefers-color-scheme') when localStorage isn't set:", () => {
    it('When light, it should be disabled.', async () => {
      const spy = createMatchMediaSpy(false);

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { prefersDark, isDark } = useDarkMode();

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(spy).toHaveBeenLastCalledWith('(prefers-color-scheme: dark)');
      expect(prefersDark.value).to.be.eql(false);
      expect(isDark.value).to.be.eql(false);
    });

    it('when dark, it should be enabled.', async () => {
      const spy = createMatchMediaSpy(true);

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { prefersDark, isDark } = useDarkMode();

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(spy).toHaveBeenLastCalledWith('(prefers-color-scheme: dark)');
      expect(prefersDark.value).to.be.eql(true);
      expect(isDark.value).to.be.eql(true);
    });
  });

  describe('localStorage', () => {
    it('Is light when value is set to false.', async () => {
      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode();

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(isDark.value).to.be.eql(false);

      isDark.value = true;

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql('true');
    });

    it('Is dark when value is set to true.', async () => {
      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode();

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(isDark.value).to.be.eql(false);
      isDark.value = false;
      expect(localStorage.getItem('enable-dark-mode')).to.be.eql('false');
    });

    it('Prefers localStorage value over match media.', async () => {
      const spy = createMatchMediaSpy(false);
      localStorage.setItem('enable-dark-mode', 'true');

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode();

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql('true');
      expect(spy).toHaveBeenLastCalledWith('(prefers-color-scheme: dark)');
      expect(isDark.value).to.be.eql(true);
    });
  });

  it('toggle() inverts value.', async () => {
    const { default: useDarkMode } = await import('@src/useDarkMode');
    const { toggle, isDark } = useDarkMode();

    expect(isDark.value).to.be.eql(false);
    toggle();
    expect(isDark.value).to.be.eql(true);
  });

  it('unsetToSystem() resets value to system preference.', async () => {
    const spy = createMatchMediaSpy(false);
    localStorage.setItem('enable-dark-mode', 'true');

    const { default: useDarkMode } = await import('@src/useDarkMode');
    const { unsetToSystem, isDark, prefersDark } = useDarkMode();

    expect(localStorage.getItem('enable-dark-mode')).to.be.eql('true');
    expect(spy).toHaveBeenLastCalledWith('(prefers-color-scheme: dark)');
    expect(prefersDark.value).to.be.eql(false);
    expect(isDark.value).to.be.eql(true);

    unsetToSystem();

    expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
    expect(prefersDark.value).to.be.eql(false);
    expect(isDark.value).to.be.eql(false);
  });

  describe('Options', () => {
    it('Should apply class to target.', async () => {
      global.document = document.implementation.createHTMLDocument();

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode({ selector: 'body' });

      isDark.value = true;

      expect([...document.body.classList]).to.contain('dark');
    });

    describe('Selector', () => {
      it('Should not apply class to default html target when selector is null.', async () => {
        global.document = document.implementation.createHTMLDocument();

        const { default: useDarkMode } = await import('@src/useDarkMode');
        const { isDark } = useDarkMode({ selector: null });

        isDark.value = true;

        expect([...document.documentElement.classList]).to.not.contain('dark');
      });

      it('Should apply class to custom selector.', async () => {
        global.document = document.implementation.createHTMLDocument();
        const customSelector = document.createElement('div');
        customSelector.id = 'custom-selector';
        document.body.appendChild(customSelector);

        const { default: useDarkMode } = await import('@src/useDarkMode');
        const { isDark } = useDarkMode({ selector: '#custom-selector' });

        isDark.value = true;

        expect([...customSelector.classList]).to.contain('dark');
      });

      it('Should apply the class to an instance of a HTML element when selector is an instance.', async () => {
        global.document = document.implementation.createHTMLDocument();
        const customSelector = document.createElement('div');
        customSelector.id = 'custom-selector';
        document.body.appendChild(customSelector);

        const { default: useDarkMode } = await import('@src/useDarkMode');
        const { isDark } = useDarkMode({ selector: customSelector });

        isDark.value = true;

        expect([...customSelector.classList]).to.contain('dark');
      });
    });

    it('Should use given class name.', async () => {
      global.document = document.implementation.createHTMLDocument();
      const className = 'test-class-name';

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode({ className });

      isDark.value = true;

      expect([...document.documentElement.classList]).to.contain(className);
      expect([...document.documentElement.classList]).to.not.contain('dark');
    });

    it('Should use given local storage key.', async () => {
      const localStorageKey = 'test-key-name';

      const { default: useDarkMode } = await import('@src/useDarkMode');
      const { isDark } = useDarkMode({ localStorageKey });

      isDark.value = true;

      expect(localStorage.getItem('enable-dark-mode')).to.be.eql(null);
      expect(localStorage.getItem(localStorageKey)).to.be.eql('true');
    });
  });
});
