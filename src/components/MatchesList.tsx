import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MATCHES_URL } from '../config';
import { Match } from '../types/Match';
import { MatchItem } from './MatchItem';
import { UpdatedAgo } from './UpdatedAgo';
import { FilterBar } from './FilterBar';
import { useFavorites } from '../hooks/useFavorites';
import { Filter, matchesFilter } from '../utils/matchStatus';

type FetchState =
    | { kind: 'idle' }
    | { kind: 'loading' }
    | { kind: 'error'; message: string }
    | { kind: 'success'; matches: Match[]; updatedAt: Date };

export function MatchesList() {
    const [state, setState] = useState<FetchState>({ kind: 'idle' });
    const [filter, setFilter] = useState<Filter>('all');
    const [refreshing, setRefreshing] = useState(false);
    const { isFavorite, toggle } = useFavorites();

    const load = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setState({ kind: 'loading' });

        try {
            const res = await fetch(MATCHES_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const matches: Match[] = Array.isArray(data?.matches) ? data.matches : [];
            setState({ kind: 'success', matches, updatedAt: new Date() });
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Неизвестная ошибка';
            setState({ kind: 'error', message });
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { void load(); }, [load]);

    const visible = useMemo(() => {
        if (state.kind !== 'success') return [];
        return state.matches.filter(m => matchesFilter(m.status, filter));
    }, [state, filter]);

    if (state.kind === 'loading' || state.kind === 'idle') {
        return <View style={styles.center}><ActivityIndicator size="large" /></View>;
    }

    if (state.kind === 'error') {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Не удалось загрузить матчи: {state.message}</Text>
                <Pressable onPress={() => void load()} style={styles.button}>
                    <Text style={styles.buttonText}>Повторить</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Матчи тура</Text>
                <Pressable onPress={() => void load(true)} disabled={refreshing} style={styles.button}>
                    <Text style={styles.buttonText}>{refreshing ? 'Обновление…' : 'Обновить'}</Text>
                </Pressable>
            </View>
            <UpdatedAgo since={state.updatedAt} />

            <FilterBar value={filter} onChange={setFilter} />

            {visible.length === 0 ? (
                <View style={styles.center}><Text>Матчей нет</Text></View>
            ) : (
                <FlatList
                    data={visible}
                    keyExtractor={m => m.id}
                    renderItem={({ item }) => (
                        <MatchItem
                            match={item}
                            isFavorite={isFavorite(item.id)}
                            onToggleFavorite={() => toggle(item.id)}
                        />
                    )}
                    refreshing={refreshing}
                    onRefresh={() => void load(true)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    error: { color: '#b91c1c', textAlign: 'center' },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#ef3124',
        borderRadius: 8,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
});