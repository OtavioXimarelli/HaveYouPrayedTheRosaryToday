export interface WeekDayMark {
  key: string;
  prayed: boolean;
  ariaLabel: string;
}

export function WeekDots({marks}: {marks: WeekDayMark[]}) {
  return (
    <ol className="week-dots">
      {marks.map((mark) => (
        <li
          key={mark.key}
          className={`week-dot${mark.prayed ? ' is-prayed' : ''}`}
        >
          <span className="sr-only">{mark.ariaLabel}</span>
        </li>
      ))}
    </ol>
  );
}
