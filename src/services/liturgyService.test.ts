import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {getDailyLiturgy} from './liturgyService';

const payload = {
  date: '2026-08-20', title: 'Quinta-feira da 20ª semana do Tempo Comum', color: 'GREEN', prayers: {},
  groups: [{kind: 'GOSPEL', items: [{title: 'Proclamação do Evangelho', reference: 'Mt 22, 1-14', text: 'Naquele tempo…'}]}],
  source: {provider: 'liturgia-diaria-v2', fetchedAt: '2026-08-20T10:00:00Z', freshness: 'LIVE'},
};

describe('daily liturgy client', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 7, 20, 9)); localStorage.clear(); });
  afterEach(() => { vi.useRealTimers(); vi.clearAllMocks(); });

  it('caches a validated same-day response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok: true, json: async () => payload}));
    const result = await getDailyLiturgy({force: true});
    expect(result.date).toBe('2026-08-20');
    expect(result.groups[0].items).toHaveLength(1);
    expect(localStorage.length).toBe(1);
  });

  it('rejects a response for the wrong date instead of presenting stale content', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok: true, json: async () => ({...payload, date: '2026-08-19'})}));
    await expect(getDailyLiturgy({force: true})).rejects.toThrow('LITURGY_INVALID_RESPONSE');
  });
});
