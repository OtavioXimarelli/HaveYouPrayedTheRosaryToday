import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {getDailyLiturgy} from './liturgyService';

describe('embedded daily liturgy client', () => {
  beforeEach(() => { vi.useFakeTimers(); localStorage.clear(); });
  afterEach(() => { vi.useRealTimers(); vi.clearAllMocks(); });

  it('returns the embedded readings without making a network request', async () => {
    vi.setSystemTime(new Date('2026-08-26T15:00:00Z'));
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const result = await getDailyLiturgy({force: true});
    expect(result.date).toBe('2026-08-26');
    expect(result.groups.map((group) => group.kind)).toEqual(['FIRST_READING', 'PSALM', 'GOSPEL']);
    expect(result.source.freshness).toBe('EMBEDDED');
    expect(result.source.provider).toContain('Pe. António Pereira de Figueiredo');
    expect(result.source.provider).toContain('Vulgata');
    expect(result.source.provider).not.toContain('Bíblia Livre');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['2026-08-25', '2Ts 2,1-3a.14-17', 'Mt 23,23-26'],
    ['2026-08-26', '2Ts 3,6-10.16-18', 'Mt 23,27-32'],
    ['2026-08-27', '1Cor 1,1-9', 'Mt 24,42-51'],
    ['2026-08-28', '1Cor 1,17-25', 'Mt 25,1-13'],
    ['2026-08-29', 'Jr 1,17-19', 'Mc 6,17-29'],
    ['2026-08-30', 'Jr 20,7-9', 'Mt 16,21-27'],
    ['2026-08-31', '1Cor 2,1-5', 'Lc 4,16-30'],
    ['2026-09-01', '1Cor 2,10b-16', 'Lc 4,31-37'],
  ])('keeps the reviewed references for %s', async (date, firstReading, gospel) => {
    vi.setSystemTime(new Date(`${date}T15:00:00Z`));
    const result = await getDailyLiturgy();
    expect(result.date).toBe(date);
    expect(result.groups.at(0)?.items.at(0)?.reference).toBe(firstReading);
    expect(result.groups.at(-1)?.items.at(0)?.reference).toBe(gospel);
  });

  it('uses the America/Sao_Paulo calendar day at the UTC boundary', async () => {
    vi.setSystemTime(new Date('2026-08-26T02:30:00Z'));
    await expect(getDailyLiturgy()).resolves.toMatchObject({date: '2026-08-25'});
  });

  it('fails closed after the declared embedded range', async () => {
    vi.setSystemTime(new Date('2026-09-02T15:00:00Z'));
    await expect(getDailyLiturgy()).rejects.toThrow('LITURGY_NOT_EMBEDDED_FOR_DATE_2026-09-02');
  });
});
