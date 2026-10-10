import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PortfolioEffects from '@/core/portfolio/ui/PortfolioEffects';

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];
  callback: IntersectionObserverCallback;
  observed = new Set<Element>();
  unobserved = new Set<Element>();
  disconnected = false;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverMock.instances.push(this);
  }

  observe(target: Element) {
    this.observed.add(target);
  }

  unobserve(target: Element) {
    this.unobserved.add(target);
  }

  disconnect() {
    this.disconnected = true;
  }

  notify(target: Element, isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

describe('PortfolioEffects', () => {
  let shell: HTMLElement;
  let frameCallback: FrameRequestCallback | undefined;
  let cancelAnimationFrame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    IntersectionObserverMock.instances = [];
    shell = document.createElement('main');
    shell.dataset.portfolioShell = '';
    shell.innerHTML =
      '<section data-reveal></section><article data-reveal></article>';
    document.body.append(shell);

    frameCallback = undefined;
    cancelAnimationFrame = vi.fn();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        frameCallback = callback;
        return 17;
      }),
    );
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame);
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
  });

  it('coalesces mouse movement to one animation frame and ignores touch input', () => {
    const { unmount } = render(<PortfolioEffects />);

    act(() => {
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 20,
          clientY: 30,
        }),
      );
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 70,
          clientY: 90,
        }),
      );
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'touch',
          clientX: 500,
          clientY: 500,
        }),
      );
    });

    expect(requestAnimationFrame).toHaveBeenCalledOnce();
    expect(shell.style.getPropertyValue('--cursor-x')).toBe('');
    act(() => frameCallback?.(0));
    expect(shell.style.getPropertyValue('--cursor-x')).toBe('70px');
    expect(shell.style.getPropertyValue('--cursor-y')).toBe('90px');

    unmount();
    expect(shell.hasAttribute('data-reveal-ready')).toBe(false);
  });

  it('reveals intersecting elements once and disconnects on unmount', () => {
    const { unmount } = render(<PortfolioEffects />);
    const observer = IntersectionObserverMock.instances[0];
    const [firstReveal, secondReveal] = shell.querySelectorAll('[data-reveal]');

    expect(shell.getAttribute('data-reveal-ready')).toBe('true');
    expect(observer.observed).toEqual(new Set([firstReveal, secondReveal]));

    act(() => {
      observer.notify(secondReveal, false);
      observer.notify(firstReveal, true);
    });

    expect(firstReveal.getAttribute('data-revealed')).toBe('true');
    expect(observer.unobserved.has(firstReveal)).toBe(true);
    expect(secondReveal.hasAttribute('data-revealed')).toBe(false);
    expect(observer.unobserved.has(secondReveal)).toBe(false);

    unmount();
    expect(observer.disconnected).toBe(true);
    expect(shell.hasAttribute('data-reveal-ready')).toBe(false);
  });

  it('cancels a queued pointer update and removes listeners during cleanup', () => {
    const { unmount } = render(<PortfolioEffects />);

    act(() => {
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 10,
          clientY: 15,
        }),
      );
    });
    unmount();

    expect(cancelAnimationFrame).toHaveBeenCalledWith(17);
    act(() => window.dispatchEvent(new PointerEvent('pointermove')));
    expect(requestAnimationFrame).toHaveBeenCalledOnce();
  });

  it('continues pointer tracking without IntersectionObserver support', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');
    const { unmount } = render(<PortfolioEffects />);

    expect(shell.hasAttribute('data-reveal-ready')).toBe(false);
    act(() => {
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 28,
          clientY: 42,
        }),
      );
      frameCallback?.(0);
    });
    expect(shell.style.getPropertyValue('--cursor-x')).toBe('28px');

    unmount();
  });

  it('does not subscribe to pointer events when the portfolio shell is absent', () => {
    shell.remove();
    const { unmount } = render(<PortfolioEffects />);

    act(() => window.dispatchEvent(new PointerEvent('pointermove')));
    expect(requestAnimationFrame).not.toHaveBeenCalled();

    unmount();
  });

  it('keeps pointer updates active when there are no reveal targets', () => {
    shell.replaceChildren();
    const { unmount } = render(<PortfolioEffects />);

    expect(shell.hasAttribute('data-reveal-ready')).toBe(false);
    act(() => {
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 8,
          clientY: 12,
        }),
      );
      frameCallback?.(0);
    });
    expect(shell.style.getPropertyValue('--cursor-y')).toBe('12px');

    unmount();
  });
});
