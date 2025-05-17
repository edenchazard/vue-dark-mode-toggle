import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VueDarkModeToggle from '@/components/VueDarkModeToggle.vue';

describe('VueDarkModeToggle', () => {
  it('has night class when prop dark mode enabled', () => {
    const wrapper = mount(VueDarkModeToggle, {
      props: { darkModeEnabled: true },
    });

    expect(wrapper.classes('night'));
  });

  it("doesn't have night class when prop dark mode not enabled", () => {
    const wrapper = mount(VueDarkModeToggle, {
      props: { darkModeEnabled: false },
    });

    expect(wrapper.classes()).to.not.contain('night');
  });

  it('shows enabled text when enabled', async () => {
    const wrapper = mount(VueDarkModeToggle, {
      props: {
        darkModeEnabled: true,
        srText: {
          enabled: 'dark mode is enabled',
          disabled: 'light mode is enabled',
        },
      },
    });
    expect(wrapper.text()).to.contain('dark mode is enabled');
  });

  it('shows disabled text when enabled', async () => {
    const wrapper = mount(VueDarkModeToggle, {
      props: {
        darkModeEnabled: false,
        srText: {
          enabled: 'dark mode is enabled',
          disabled: 'light mode is enabled',
        },
      },
    });
    expect(wrapper.text()).to.contain('light mode is enabled');
  });
});
