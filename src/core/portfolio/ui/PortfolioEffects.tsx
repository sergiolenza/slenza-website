'use client';

import { useEffect } from 'react';

export default function PortfolioEffects() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('[data-portfolio-shell]');

    if (!shell) {
      return;
    }

    let pointerFrame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (pointerFrame === null) {
        pointerFrame = window.requestAnimationFrame(() => {
          shell.style.setProperty('--cursor-x', `${pointerX}px`);
          shell.style.setProperty('--cursor-y', `${pointerY}px`);
          pointerFrame = null;
        });
      }
    };

    const cleanupPointerTracking = () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (pointerFrame !== null) {
        window.cancelAnimationFrame(pointerFrame);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    if (!('IntersectionObserver' in window)) {
      return cleanupPointerTracking;
    }

    const revealItems = shell.querySelectorAll<HTMLElement>('[data-reveal]');

    if (revealItems.length === 0) {
      return cleanupPointerTracking;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    shell.setAttribute('data-reveal-ready', 'true');
    revealItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      cleanupPointerTracking();
      observer.disconnect();
      shell.removeAttribute('data-reveal-ready');
    };
  }, []);

  return null;
}
