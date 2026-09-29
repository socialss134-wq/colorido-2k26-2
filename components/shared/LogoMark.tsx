export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <span className={`grid h-9 w-9 shrink-0 grid-cols-2 gap-[3px] rounded-xl bg-ink p-[7px] ${className}`} aria-hidden>
      <i className="rounded-[3px] bg-[hsl(var(--colorido-pink))]" />
      <i className="rounded-[3px] bg-[hsl(var(--colorido-yellow))]" />
      <i className="rounded-[3px] bg-[hsl(var(--colorido-blue))]" />
      <i className="rounded-[3px] bg-[hsl(var(--colorido-green))]" />
    </span>
  );
}
