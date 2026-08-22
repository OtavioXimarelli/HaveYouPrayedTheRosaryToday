import {getLocalDateKey, getResolvedTimeZone} from '@/lib/date';

export type LiturgicalColor = 'GREEN' | 'WHITE' | 'RED' | 'PURPLE' | 'ROSE';
export type ReadingKind = 'FIRST_READING' | 'PSALM' | 'SECOND_READING' | 'GOSPEL' | 'EXTRA';

export interface LiturgyReadingDto {
  title: string;
  reference?: string;
  text: string;
  refrain?: string;
}

export interface LiturgyGroupDto {
  kind: ReadingKind;
  items: LiturgyReadingDto[];
}

export interface DailyLiturgyDto {
  date: string;
  title: string;
  color: LiturgicalColor;
  prayers: {
    collect?: string;
    offerings?: string;
    communion?: string;
  };
  groups: LiturgyGroupDto[];
  source: {
    provider: string;
    fetchedAt: string;
    freshness: 'LIVE' | 'CACHED';
  };
}

const CACHE_PREFIX = 'evangelizae-liturgy-v2-';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1';

function isDailyLiturgy(value: unknown): value is DailyLiturgyDto {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<DailyLiturgyDto>;
  const colors: LiturgicalColor[] = ['GREEN', 'WHITE', 'RED', 'PURPLE', 'ROSE'];
  const kinds: ReadingKind[] = ['FIRST_READING', 'PSALM', 'SECOND_READING', 'GOSPEL', 'EXTRA'];
  const source = data.source;

  return typeof data.date === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(data.date)
    && typeof data.title === 'string'
    && data.title.trim().length > 0
    && colors.includes(data.color as LiturgicalColor)
    && Array.isArray(data.groups)
    && data.groups.length > 0
    && data.groups.every((group) => kinds.includes(group.kind)
      && Array.isArray(group.items)
      && group.items.length > 0
      && group.items.every((item) => typeof item.title === 'string'
        && typeof item.text === 'string'
        && item.text.trim().length > 0))
    && !!source
    && typeof source.provider === 'string'
    && typeof source.fetchedAt === 'string'
    && (source.freshness === 'LIVE' || source.freshness === 'CACHED');
}

function readCached(date: string): DailyLiturgyDto | null {
  try {
    const value = localStorage.getItem(`${CACHE_PREFIX}${date}`);
    if (!value) return null;
    const parsed: unknown = JSON.parse(value);
    if (!isDailyLiturgy(parsed) || parsed.date !== date) return null;
    return {...parsed, source: {...parsed.source, freshness: 'CACHED'}};
  } catch {
    return null;
  }
}

export async function getDailyLiturgy({force = false}: {force?: boolean} = {}): Promise<DailyLiturgyDto> {
  if (typeof window === 'undefined') throw new Error('LITURGY_CLIENT_ONLY');
  const date = getLocalDateKey();
  if (!force) {
    const cached = readCached(date);
    if (cached) return cached;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8_000);
  try {
    const query = new URLSearchParams({timezone: getResolvedTimeZone(), locale: 'pt-BR'});
    const response = await fetch(`${API_BASE_URL}/liturgy/today?${query}`, {headers: {Accept: 'application/json'}, signal: controller.signal});
    if (!response.ok) throw new Error(`LITURGY_HTTP_${response.status}`);
    const payload: unknown = await response.json();
    if (!isDailyLiturgy(payload) || payload.date !== date) throw new Error('LITURGY_INVALID_RESPONSE');
    localStorage.setItem(`${CACHE_PREFIX}${date}`, JSON.stringify(payload));
    return payload;
  } catch (error) {
    const cached = readCached(date);
    if (cached) return cached;
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function clearLiturgyCache() {
  if (typeof window !== 'undefined') localStorage.removeItem(`${CACHE_PREFIX}${getLocalDateKey()}`);
}
