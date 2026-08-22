export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calendarDayDifference(earlier: string, later: string): number {
  const [earlierYear, earlierMonth, earlierDay] = earlier.split('-').map(Number);
  const [laterYear, laterMonth, laterDay] = later.split('-').map(Number);
  const earlierUtc = Date.UTC(earlierYear, earlierMonth - 1, earlierDay);
  const laterUtc = Date.UTC(laterYear, laterMonth - 1, laterDay);
  return Math.round((laterUtc - earlierUtc) / 86_400_000);
}

export function getResolvedTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';
}
