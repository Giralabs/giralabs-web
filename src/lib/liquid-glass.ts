/**
 * Moves the specular highlight of `.lg` (Liquid Glass) surfaces with the pointer.
 *
 * One delegated listener for the whole document instead of one per pane, and at
 * most one style write per frame: the pointer position is sampled on every move
 * but only the pane currently under it gets its --lg-x / --lg-y updated, inside a
 * requestAnimationFrame. The rect is measured when the pointer enters a pane and
 * reused until it leaves, so moving never forces a layout.
 *
 * Touch and coarse pointers produce no hover, and a user who asked for less
 * motion gets the static glass, so in both cases nothing is attached at all.
 */

const SELECTOR = '.lg';

let attached = false;

export function liquidGlassLight(): void {
  if (attached || typeof window === 'undefined') return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  attached = true;

  let active: HTMLElement | null = null;
  let rect: DOMRect | null = null;
  let x = 0;
  let y = 0;
  let frame = 0;

  const paint = () => {
    frame = 0;
    if (!active) return;
    rect ??= active.getBoundingClientRect();
    active.style.setProperty('--lg-x', `${x - rect.left}px`);
    active.style.setProperty('--lg-y', `${y - rect.top}px`);
  };

  const release = () => {
    if (active) active.style.setProperty('--lg-light', '0');
    active = null;
    rect = null;
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>(SELECTOR) ?? null;
      if (target !== active) {
        release();
        if (!target) return;
        active = target;
        target.style.setProperty('--lg-light', '1');
      }
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', release, { passive: true });
  // A scroll moves the pane under a still pointer: drop the cached rect and let
  // the next paint measure it again
  window.addEventListener('scroll', () => { rect = null; }, { passive: true });
}
