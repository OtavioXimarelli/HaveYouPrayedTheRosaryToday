export interface WeekDayMark {
  key: string;
  prayed: boolean;
  ariaLabel: string;
}

export function WeekDots({marks}: {marks: WeekDayMark[]}) {
  return (
    <ol className="week-dots" aria-hidden="false">
      {marks.map((mark) => (
        <li
          key={mark.key}
          className={`week-dot${mark.prayed ? ' is-prayed' : ''}`}
          role="img"
          aria-label={mark.ariaLabel}
        />
      ))}
    </ol>
  );
}
