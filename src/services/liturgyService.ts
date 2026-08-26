import {getDateKeyInTimeZone} from '@/lib/date';
import {getEmbeddedDailyLiturgy} from '@/data/embeddedDailyLiturgy';

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
    freshness: 'LIVE' | 'CACHED' | 'EMBEDDED';
  };
}

const CACHE_PREFIX = 'evangelizae-liturgy-v2-';

export async function getDailyLiturgy(_options: {force?: boolean} = {}): Promise<DailyLiturgyDto> {
  void _options;
  if (typeof window === 'undefined') throw new Error('LITURGY_CLIENT_ONLY');
  const date = getDateKeyInTimeZone();
  const embedded = getEmbeddedDailyLiturgy(date);
  if (!embedded) throw new Error(`LITURGY_NOT_EMBEDDED_FOR_DATE_${date}`);
  return embedded;
}

export function clearLiturgyCache() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${CACHE_PREFIX}${getDateKeyInTimeZone()}`);
  }
}
