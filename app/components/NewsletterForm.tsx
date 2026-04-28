"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="news"
      onSubmit={(e) => { e.preventDefault(); setDone(true); }}
    >
      <input type="email" placeholder="Email address" aria-label="Email address" required />
      <button type="submit">{done ? "Subscribed" : "Subscribe"}</button>
    </form>
  );
}
