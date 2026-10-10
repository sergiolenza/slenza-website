import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getI18nInstance, setI18n } = vi.hoisted(() => ({
  getI18nInstance: vi.fn(),
  setI18n: vi.fn(),
}));

vi.mock('@lingui/react/server', () => ({ setI18n }));
vi.mock('@/core/portfolio/infrastructure/i18n/app-router-i18n', () => ({
  getI18nInstance,
}));

describe('initLingui', () => {
  beforeEach(() => {
    getI18nInstance.mockReset();
    setI18n.mockReset();
  });

  it('sets the request locale instance and returns that same instance', async () => {
    const i18n = { locale: 'es' };
    getI18nInstance.mockResolvedValue(i18n);
    const { initLingui } = await import(
      '@/core/portfolio/infrastructure/i18n/init-lingui'
    );

    await expect(initLingui('es')).resolves.toBe(i18n);
    expect(getI18nInstance).toHaveBeenCalledWith('es');
    expect(setI18n).toHaveBeenCalledWith(i18n);
  });
});
