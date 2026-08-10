/**
 * Pauses CSS animations inside sections that are not on screen.
 *
 * The site decorates almost every section with looping animations, and several of
 * them animate properties that cannot be composited — background-position,
 * border-color, color, stroke-dashoffset. Those re-run style, and sometimes
 * layout, on every frame for as long as they exist. Nothing ever stopped them:
 * the service pages add an `is-active` class on first intersection and never
 * remove it, so a visitor who scrolled past six service widgets was still paying
 * for all of them, forever, on a phone.
 *
 * Pausing is invisible by definition — the animation is off screen — and the
 * browser resumes it mid-cycle when the section comes back.
 *
 * Uses `animation-play-state`, which only affects animations. Transitions keep
 * working, so the scroll-reveal effect is untouched.
 */

const IDLE_CLASS = 'anim-idle';

// A screen of margin on each side: sections resume before they are reachable, so
// no one ever sees a frozen frame sliding into view.
const ROOT_MARGIN = '100% 0px';

export function idleOffscreenAnimations(selector = 'section, header, footer, .details-grid'): void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

  const sections = document.querySelectorAll<HTMLElement>(selector);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle(IDLE_CLASS, !entry.isIntersecting);
      }
    },
    { rootMargin: ROOT_MARGIN }
  );

  sections.forEach((section) => {
    // Nested matches would fight over the class on the same subtree
    if (section.parentElement?.closest(selector)) return;
    observer.observe(section);
  });
}
