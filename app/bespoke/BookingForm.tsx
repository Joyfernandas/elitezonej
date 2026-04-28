"use client";
import { useState } from "react";

export default function BookingForm() {
  const [done, setDone] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div className="grid2">
        <div><label>First name</label><input placeholder="Your first name" required /></div>
        <div><label>Last name</label><input placeholder="Your last name" required /></div>
      </div>
      <div><label>Phone</label><input type="tel" placeholder="+91 …" required /></div>
      <div><label>City</label>
        <select>
          <option>Delhi NCR — Visit atelier</option>
          <option>Delhi NCR — Home fitting</option>
          <option>Mumbai — Home fitting</option>
          <option>Bangalore — Home fitting</option>
          <option>Other (we&apos;ll arrange)</option>
        </select>
      </div>
      <div><label>Service</label>
        <select>
          <option>Bespoke Suit</option>
          <option>Custom Sherwani</option>
          <option>Tailored Shirts</option>
          <option>Alterations</option>
          <option>Just exploring</option>
        </select>
      </div>
      <button className="btn btn-lg" type="submit">{done ? "✓ Booked — we'll confirm within 4 hours" : "Request appointment"}</button>
    </form>
  );
}
