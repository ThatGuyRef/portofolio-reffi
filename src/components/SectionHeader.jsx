export default function SectionHeader({ number, title, intro }) {
  return (
    <>
      <div className="sec-head" data-reveal>
        {number && <span className="sec-num">{number}</span>}
        <h2 className="sec-title">{title}</h2>
        <span className="sec-rule" />
      </div>

      {intro && (
        <p className="sec-intro" data-reveal>
          {intro}
        </p>
      )}
    </>
  );
}
