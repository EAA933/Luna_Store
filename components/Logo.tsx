export default function Logo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`font-display tracking-tight ${className}`} style={{ lineHeight: 1 }}>
      <span className="text-[rgb(var(--fg))]">LUNA</span>
    </div>
  );
}
