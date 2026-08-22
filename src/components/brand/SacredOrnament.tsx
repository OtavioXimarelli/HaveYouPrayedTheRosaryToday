export function SacredOrnament({className = ''}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 420 520" aria-hidden="true">
      <path className="ornament-arch" d="M42 478V218C42 104 117 28 210 28s168 76 168 190v260" />
      <path className="ornament-arch ornament-arch-inner" d="M74 478V222c0-92 61-162 136-162s136 70 136 162v256" />
      <circle className="ornament-halo" cx="210" cy="208" r="94" />
      <path className="ornament-cross" d="M210 112v198M159 174h102" />
      <path className="ornament-book" d="M118 342c42-32 75-34 92-4 17-30 50-28 92 4v76c-42-26-75-27-92 2-17-29-50-28-92-2z" />
      <path className="ornament-book" d="M210 338v82" />
      <g className="ornament-stars">
        <path d="M88 120h18M97 111v18" />
        <path d="M314 120h18M323 111v18" />
        <path d="M100 278h12M106 272v12" />
        <path d="M308 278h12M314 272v12" />
      </g>
      <g className="ornament-beads">
        {Array.from({length: 9}, (_, index) => (
          <circle key={index} cx={106 + index * 26} cy="462" r={index === 4 ? 7 : 4.5} />
        ))}
      </g>
    </svg>
  );
}
