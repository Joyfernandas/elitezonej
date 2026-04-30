// Re-rendered on every route change — the .route-transition class drives
// the fade-up keyframe in page-chrome.css.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>;
}
