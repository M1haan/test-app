import { StyleSheet, Text, View } from 'react-native';
import { Match } from '../types/Match';
import { statusLabel } from '../utils/matchStatus';
import { formatDateTime } from '../utils/formatDate';
import { FavoriteButton } from './FavoriteButton';

interface Props {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function MatchItem({ match, isFavorite, onToggleFavorite }: Props) {
  const score =
    match.score != null ? `${match.score.home} : ${match.score.away}` : '—';

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.teams}>
          {match.home.name} — {match.away.name}
        </Text>
        <FavoriteButton active={isFavorite} onPress={onToggleFavorite} />
      </View>
      <Text style={styles.meta}>{score} · {statusLabel(match.status)}</Text>
      <Text style={styles.meta}>{formatDateTime(match.startsAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e5e7eb' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teams: { fontSize: 16, fontWeight: '600', flex: 1, paddingRight: 8 },
  meta: { fontSize: 13, color: '#6b7280', marginTop: 2 },
});