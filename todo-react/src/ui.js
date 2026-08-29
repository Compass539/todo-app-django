// Shared class strings for the .btn / .input / .tag component classes
// defined in docs/design/organic-styles.css, translated to Tailwind utilities
// driven by the tokens in src/index.css (see @theme).

export const inputClass =
  'min-h-[36px] w-full rounded-full border border-divider bg-surface px-[14px] py-1.5 ' +
  'text-[14px] text-text outline-none transition-colors placeholder:text-neutral-600 ' +
  'hover:border-neutral-500 focus-visible:border-accent';

export const btnPrimaryClass =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-[15.84px] py-2 ' +
  'font-heading text-[14px] text-bg transition-colors hover:bg-accent-600 active:bg-accent-700 ' +
  'disabled:opacity-45 disabled:pointer-events-none';

export const btnSecondaryClass =
  'inline-flex items-center justify-center gap-1.5 rounded-full border border-divider px-[15.84px] py-2 ' +
  'font-heading text-[14px] text-text transition-colors hover:bg-neutral-200 active:bg-neutral-300 ' +
  'disabled:opacity-45 disabled:pointer-events-none';

export const tagAccentClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-accent-100 px-[10px] py-[3px] text-[11px] tracking-wide text-accent-800';

export const tagNeutralClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-neutral-100 px-[10px] py-[3px] text-[11px] tracking-wide text-neutral-800';

export const tagOutlineClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-accent px-[10px] py-[3px] text-[11px] tracking-wide text-accent';
