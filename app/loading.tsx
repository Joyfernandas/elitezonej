export default function Loading() {
  return (
    <div className="page-loading" aria-live="polite" aria-busy="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/wordmark-trimmed.png"
        alt="Elite Zone J"
        className="page-loading-mark"
      />
      <div className="page-loading-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
