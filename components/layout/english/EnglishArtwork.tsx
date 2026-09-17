// Decorative, dependency-free artwork shared only by the English presentation.
export function BrandMark() {
  return (
    <span className="en-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l1 7a5 5 0 0 1-10 0l1-7ZM7 8h10M12 14v8M8 22h8" />
      </svg>
    </span>
  );
}

export function CardArtwork() {
  return (
    <div className="en-card-art" aria-hidden="true">
      <div className="en-art-orbit" />
      <div className="en-art-card en-art-card-back"><span>♧</span></div>
      <div className="en-art-card en-art-card-front">
        <span className="en-art-corner">K<span>♠</span></span>
        <svg className="en-art-crown" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 15 8 8 8-13 8 13 8-8-4 22H12L8 15ZM15 42h18" />
          <circle cx="8" cy="12" r="2" /><circle cx="24" cy="7" r="2" /><circle cx="40" cy="12" r="2" />
        </svg>
        <span className="en-art-corner en-art-corner-bottom">K<span>♠</span></span>
      </div>
    </div>
  );
}
