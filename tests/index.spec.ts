import { describe, it, expect } from 'vitest';

describe('index', () => {
  it('exports VueRiseAndShine component', async () => {
    const { VueRiseAndShine } = await import('@src/index');
    expect(VueRiseAndShine).toBeDefined();
  });

  it('exports useDarkMode composable', async () => {
    const { useDarkMode } = await import('@src/index');
    expect(useDarkMode).toBeDefined();
  });
});
