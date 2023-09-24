import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import VueDarkModeToggle from '../VueDarkModeToggle.vue';

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
});
