"use client";

import { useEffect } from "react";
import Link from "next/link";

// Catch-all error boundary for the whole app. Replaces Next's default
// dev overlay in production with a brand-coherent surface + retry path.

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production wire this to your error tracker (Sentry, Datadog, etc.)
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <div className="page-error">
      <div className="page-error-inner">
        <div className="page-error-mark">Elite Zone J</div>
        <h1>Something went wrong.</h1>
        <p>An unexpected error occurred. Please try again, or return to the home page.</p>
        <div className="page-error-actions">
          <button className="btn btn-primary" onClick={reset}>Try again</button>
          <Link className="btn btn-secondary" href="/">Back to home</Link>
        </div>
        {error.digest && <div className="page-error-digest">Reference: {error.digest}</div>}
      </div>
    </div>
  );
}
