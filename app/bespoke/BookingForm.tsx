"use client";
import { useState } from "react";

type Field = {
  name: "first" | "last" | "phone";
  label: string;
  type: string;
  placeholder: string;
};

const TEXT_FIELDS: Field[] = [
  { name: "first", label: "First name", type: "text", placeholder: "Your first name" },
  { name: "last",  label: "Last name",  type: "text", placeholder: "Your last name" },
  { name: "phone", label: "Phone",      type: "tel",  placeholder: "+91 …" },
];

export default function BookingForm() {
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <div className="booking-confirm" role="status" aria-live="polite">
        <span className="booking-confirm__check" aria-hidden="true">✓</span>
        <span className="booking-confirm__eyebrow t-mono-xs">Appointment requested</span>
        <h4 className="booking-confirm__title"><em>Thank you.</em><br />We&apos;ll confirm within four hours.</h4>
        <p className="booking-confirm__sub">A note from the atelier is on its way to your phone. If you don&apos;t see it, WhatsApp us at <a href="https://wa.me/919800000000">+91 98XXX XXXXX</a>.</p>
        <span className="booking-confirm__signed">— By the bespoke desk · Delhi</span>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="booking-form__row two">
        {TEXT_FIELDS.slice(0, 2).map(f => (
          <BookingField
            key={f.name}
            field={f}
            value={values[f.name] || ""}
            onChange={v => setValues(prev => ({ ...prev, [f.name]: v }))}
          />
        ))}
      </div>
      <BookingField
        field={TEXT_FIELDS[2]}
        value={values.phone || ""}
        onChange={v => setValues(prev => ({ ...prev, phone: v }))}
      />
      <BookingSelect
        name="city"
        label="City"
        value={values.city || ""}
        onChange={v => setValues(prev => ({ ...prev, city: v }))}
        options={[
          "Delhi NCR — Visit atelier",
          "Delhi NCR — Home fitting",
          "Mumbai — Home fitting",
          "Bangalore — Home fitting",
          "Other (we'll arrange)",
        ]}
      />
      <BookingSelect
        name="service"
        label="Service"
        value={values.service || ""}
        onChange={v => setValues(prev => ({ ...prev, service: v }))}
        options={[
          "Bespoke Suit",
          "Custom Sherwani",
          "Tailored Shirts",
          "Alterations",
          "Just exploring",
        ]}
      />
      <button className="btn btn-primary btn-lg btn-block" type="submit">
        Request appointment
      </button>
    </form>
  );
}

function BookingField({
  field, value, onChange,
}: { field: Field; value: string; onChange: (v: string) => void }) {
  const filled = value.length > 0;
  return (
    <label className={`booking-field${filled ? " is-filled" : ""}`}>
      <span className="booking-field__label">{field.label}</span>
      <input
        type={field.type}
        placeholder={field.placeholder}
        required
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <span className="booking-field__rule" aria-hidden="true" />
    </label>
  );
}

function BookingSelect({
  name, label, value, onChange, options,
}: { name: string; label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const filled = value.length > 0;
  return (
    <label className={`booking-field booking-field--select${filled ? " is-filled" : ""}`}>
      <span className="booking-field__label">{label}</span>
      <select name={name} value={value} onChange={e => onChange(e.target.value)} required>
        <option value="" disabled hidden></option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="booking-field__rule" aria-hidden="true" />
      <span className="booking-field__chevron" aria-hidden="true">▾</span>
    </label>
  );
}
