// Global route-loading fallback. Shown while a server component is
// streaming. Brand-coherent skeleton — keeps the dark wordmark visible
// so the page transition doesn't feel like a blank crash.

export default function Loading() {
  return (
    <div className="page-loading" aria-live="polite" aria-busy="true">
      <div className="page-loading-mark">Elite Zone J</div>
      <div className="page-loading-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
