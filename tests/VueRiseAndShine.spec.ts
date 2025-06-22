import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueRiseAndShine, useDarkMode } from '@src/index';

describe('VueRiseAndShine', () => {
  describe('Classes', () => {
    it('Has night class when set to dark mode.', () => {
      useDarkMode().isDark.value = true;

      const wrapper = mount(VueRiseAndShine);

      expect(wrapper.classes('night'));
    });

    it("Doesn't have night class when set to light mode.", () => {
      useDarkMode().isDark.value = false;

      const wrapper = mount(VueRiseAndShine);

      expect(wrapper.classes()).to.not.contain('night');
    });
  });

  describe('Slots', () => {
    it('Renders a custom icon when using the "sun" slot.', () => {
      const wrapper = mount(VueRiseAndShine, {
        slots: {
          sun: '<span class="custom-sun-icon">☀️</span>',
        },
      });

      expect(wrapper.find('.custom-sun-icon').exists()).to.equal(true);
    });

    it('Renders a custom icon when using the "moon" slot.', () => {
      const wrapper = mount(VueRiseAndShine, {
        slots: {
          moon: '<span class="custom-moon-icon">🌙</span>',
        },
      });

      expect(wrapper.find('.custom-moon-icon').exists()).to.equal(true);
    });
  });

  describe('Reflects state', () => {
    it('Shows that dark mode is enabled when set to dark.', async () => {
      useDarkMode().isDark.value = true;

      const wrapper = mount(VueRiseAndShine, {
        props: {
          srText: {
            enabled: 'dark mode is enabled',
            disabled: 'light mode is enabled',
          },
        },
      });
      expect(wrapper.text()).to.contain('dark mode is enabled');
    });

    it('Shows that light mode is enabled when set to light.', async () => {
      useDarkMode().isDark.value = false;

      const wrapper = mount(VueRiseAndShine, {
        props: {
          srText: {
            enabled: 'dark mode is enabled',
            disabled: 'light mode is enabled',
          },
        },
      });

      expect(wrapper.text()).to.contain('light mode is enabled');
    });
  });
});
