/**
 * Pointer-following spotlight used by the glass cards across the site.
 *
 * The original inline version, repeated on nearly every page, called
 * getBoundingClientRect() and then wrote a custom property on every single
 * mousemove. Because the write invalidates layout and the next read demands a
 * fresh one, each pointer move forced a synchronous layout — mousemove fires
 * well above the display refresh rate, so most of that work was thrown away.
 *
 * Here the rect is measured once when the pointer enters the card, positions are
 * merely recorded while it travels, and the custom properties are written at most
 * once per animation frame. Devices without a hovering pointer skip it entirely.
 */
export function initSpotlight(selector: string): void {
  if (typeof window === 'undefined') return;

  // A touch screen never produces the hover this effect depends on
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll<HTMLElement>(selector);

  cards.forEach((card) => {
    let rect: DOMRect | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      if (!rect) return;
      card.style.setProperty('--mx', `${pointerX - rect.left}px`);
      card.style.setProperty('--my', `${pointerY - rect.top}px`);
    };

    card.addEventListener(
      'mouseenter',
      () => {
        rect = card.getBoundingClientRect();
      },
      { passive: true }
    );

    card.addEventListener(
      'mousemove',
      (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        // Covers the case where the pointer appears over the card without a
        // preceding mouseenter (e.g. the card scrolls under a still pointer)
        if (!rect) rect = card.getBoundingClientRect();
        if (!frame) frame = requestAnimationFrame(paint);
      },
      { passive: true }
    );

    card.addEventListener(
      'mouseleave',
      () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        rect = null;
      },
      { passive: true }
    );
  });
}
