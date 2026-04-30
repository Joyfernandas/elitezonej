import Reveal from "./Reveal";

const NUMERALS = ["I.", "II.", "III.", "IV.", "V.", "VI.", "VII.", "VIII.", "IX.", "X."];

type Props = {
  numeral?: number | string;
  eyebrow?: string;
  title: string;
  meta?: string;
  align?: "left" | "between";
};

export default function SectionHead({
  numeral,
  eyebrow,
  title,
  meta,
  align = "between",
}: Props) {
  const mark = typeof numeral === "number" ? NUMERALS[numeral - 1] || `${numeral}.` : numeral;

  return (
    <Reveal as="div" className={`section-head section-head--${align}`}>
      <div className="section-head__lead">
        {(mark || eyebrow) && (
          <div className="section-head__eyebrow">
            {mark && <span className="section-head__numeral">{mark}</span>}
            {eyebrow && <span className="section-head__label">{eyebrow}</span>}
          </div>
        )}
        <h2 className="section-head__title">{title}</h2>
        <span className="section-head__rule" aria-hidden="true" />
      </div>
      {meta && <span className="section-head__meta t-mono-xs">{meta}</span>}
    </Reveal>
  );
}
