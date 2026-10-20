export interface Match {
    id: string;
    startsAt: string;
    status: string;
    home: { id: string; name: string; city: string };
    away: { id: string; name: string; city: string };
    score: { home: number; away: number };
}

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled' | string;

export interface Team {
    id: string;
    name: string;
    city: string;
}