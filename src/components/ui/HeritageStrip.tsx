/**
 * HeritageStrip — masthead-style single line above the navbar.
 *
 * Mobile keeps only the motto (a single, elegant line). The establishment
 * year and academic session join on lg+, where the screen can hold all three
 * without wrapping.
 */
export function HeritageStrip() {
  return (
    <div className="bg-deep py-2 px-4 sm:px-6">
      <div
        className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center font-roboto text-[10px] sm:text-[11px] uppercase text-lemon"
        style={{ letterSpacing: '0.28em' }}
      >
        <span className="hidden lg:inline">EST. 2000</span>
        <span aria-hidden="true" className="hidden lg:inline text-lemon/40">·</span>

        <span className="font-serif italic normal-case tracking-normal text-lemon/90 text-xs sm:text-[13px] lg:font-roboto lg:not-italic lg:tracking-[0.28em] lg:uppercase lg:text-lemon lg:text-[11px]">
          Duc in Altum
          <span className="hidden lg:inline"> — Launch into the Deep</span>
        </span>

        <span aria-hidden="true" className="hidden lg:inline text-lemon/40">·</span>
        <span className="hidden lg:inline">Academic Session 2025/2026</span>
      </div>
    </div>
  );
}
