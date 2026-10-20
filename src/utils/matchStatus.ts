import { MatchStatus } from '../types/Match';

export const STATUS_LABEL: Record<string, string> = {
    scheduled: 'Предстоящий',
    live: 'Идёт',
    finished: 'Завершён',
    postponed: 'Отложен',
    cancelled: 'Отменён',
};

export const statusLabel = (s: MatchStatus) => STATUS_LABEL[s] ?? s;

export type Filter = 'all' | 'upcoming' | 'finished';

export function matchesFilter(status: MatchStatus, filter: Filter): boolean {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return status === 'scheduled' || status === 'live' || status === 'postponed';
    if (filter === 'finished') return status === 'finished' || status === 'cancelled';
    return true;
}