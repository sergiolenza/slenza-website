import { describe, expect, it, vi } from 'vitest';

const redirect = vi.hoisted(() =>
  vi.fn((destination: string) => {
    throw new Error(`NEXT_REDIRECT:${destination}`);
  }),
);

vi.mock('next/navigation', () => ({ redirect }));

import DefaultPage from './page';

describe('default route', () => {
  it('redirects to the Spanish homepage', () => {
    expect(() => DefaultPage()).toThrow('NEXT_REDIRECT:/es');
    expect(redirect).toHaveBeenCalledWith('/es');
  });
});
