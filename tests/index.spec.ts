import { describe, it, expect } from 'vitest';

describe('index', () => {
  it('exports VueDarkModeToggle component', async () => {
    const { VueDarkModeToggle } = await import('@/index');
    expect(VueDarkModeToggle).toBeDefined();
  });

  it('exports useDarkMode composable', async () => {
    const { useDarkMode } = await import('@/index');
    expect(useDarkMode).toBeDefined();
  });
});
