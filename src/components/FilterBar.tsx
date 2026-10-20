import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Filter } from '../utils/matchStatus';

export type FilterOption = { key: Filter; label: string };

export const FILTER_OPTIONS: FilterOption[] = [
    { key: 'all', label: 'Все' },
    { key: 'upcoming', label: 'Предстоящие' },
    { key: 'finished', label: 'Завершённые' },
];

type Props = {
    value: Filter;
    onChange: (next: Filter) => void;
};

export function FilterBar({ value, onChange }: Props) {
    return (
        <View style={styles.filters}>
            {FILTER_OPTIONS.map(option => {
                const active = value === option.key;
                return (
                    <Pressable
                        key={option.key}
                        onPress={() => onChange(option.key)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: active }}
                        style={[styles.chip, active && styles.chipActive]}
                    >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    filters: {
        flexDirection: 'row',
        gap: 8,
        marginVertical: 12,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
    },
    chipActive: {
        backgroundColor: '#ef3124',
    },
    chipText: {
        color: '#111827',
    },
    chipTextActive: {
        color: '#fff',
    },
});